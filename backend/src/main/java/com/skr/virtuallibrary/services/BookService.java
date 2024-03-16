package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.dto.GenreDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.entities.Genre;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.exceptions.GenreNotFoundException;
import com.skr.virtuallibrary.exceptions.IllegalPageNumberException;
import com.skr.virtuallibrary.exceptions.InternalException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.AuthorRepository;
import com.skr.virtuallibrary.repositories.BookRepository;
import com.skr.virtuallibrary.repositories.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;

    private final AuthorRepository authorRepository;

    private final GenreRepository genreRepository;

    private final ModelMapper modelMapper;

    private final MongoTemplate mongoTemplate;

    private static final String ERROR_NOT_FOUND_MSG = "Not found book with id: ";

    public BookDto findBookById(String id) {
        return bookRepository.findById(id).map(this::toBookDto)
                .orElseThrow(() -> new BookNotFoundException(ERROR_NOT_FOUND_MSG + id));
    }

    public PagedResponse<BookDto> findAllBooks() {
        return new PagedResponse<>(
                bookRepository.findAll().stream().map(this::toBookDto).toList()
        );
    }

    public PagedResponse<BookDto> findAllBooks(int page) {
        if (page < 0) {
            throw new IllegalPageNumberException();
        }

        Pageable pageable = PageRequest.of(page, 10);
        Page<Book> bookPage = bookRepository.findAll(pageable);

        return new PagedResponse<>(
                bookPage.getTotalElements(),
                bookPage.stream().map(this::toBookDto).toList()
        );
    }

    public BookDto addBook(BookDto bookDto) {
        return saveBook(bookDto);
    }

    public void deleteBook(String id) {
        if (bookRepository.findById(id).isPresent()) {
            bookRepository.deleteById(id);
        } else {
            throw new BookNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }
    }

    public BookDto updateBook(String id, BookDto bookDto) {
        if (bookRepository.findById(id).isEmpty()) {
            throw new BookNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }
        bookDto.setId(id);
        return saveBook(bookDto);
    }

    public PagedResponse<BookDto> findBooksByTitleOrAuthor(String searchPhrase) {
        String[] searchPhrases = searchPhrase.trim().split(" ");
        List<Book> books = new ArrayList<>();

        for (String phrase : searchPhrases) {
            Query query = new Query().addCriteria(new Criteria().orOperator(
                    Criteria.where("title").regex(phrase, "i"),
                    Criteria.where("authorList.firstName").regex(phrase, "i"),
                    Criteria.where("authorList.lastName").regex(phrase, "i")
            ));
            books.addAll(mongoTemplate.find(query, Book.class));
        }
        return new PagedResponse<>(
                books.stream().map(this::toBookDto).distinct().toList()
        );
    }

    public PagedResponse<BookDto> findBooksByTitleOrAuthor(String searchPhrase, Integer page) {
        if (page < 0) {
            throw new IllegalPageNumberException();
        }

        Pageable pageable = PageRequest.of(page, 10);
        String[] searchPhrases = searchPhrase.trim().split(" ");
        Criteria[] criteria = new Criteria[searchPhrases.length];

        for (int i = 0; i < searchPhrases.length; i++) {
            criteria[i] = new Criteria().orOperator(
                    Criteria.where("title").regex(searchPhrases[i], "i"),
                    Criteria.where("authorList.firstName").regex(searchPhrases[i], "i"),
                    Criteria.where("authorList.lastName").regex(searchPhrases[i], "i")
            );
        }
        Query query = new Query().addCriteria(new Criteria().orOperator(criteria));

        long totalElements = mongoTemplate.count(query, Book.class);
        List<Book> bookPage = mongoTemplate.find(query.with(pageable), Book.class);

        return new PagedResponse<>(
                totalElements,
                bookPage.stream().map(this::toBookDto).distinct().toList()
        );
    }

    public PagedResponse<BookDto> findBooksByGenre(String genreName) {
        Genre genre = genreRepository.findByNameIgnoreCase(genreName)
                .orElseThrow(() -> new GenreNotFoundException("Not found genre with name: " + genreName));

        return new PagedResponse<>(
                bookRepository.findAllByGenreIdListContains(genre.getId()).stream().map(this::toBookDto).toList()
        );
    }

    public PagedResponse<BookDto> findBooksByGenre(String genreName, int page) {
        if (page < 0) {
            throw new IllegalPageNumberException();
        }

        Pageable pageable = PageRequest.of(page, 10);
        Genre genre = genreRepository.findByNameIgnoreCase(genreName)
                .orElseThrow(() -> new GenreNotFoundException("Not found genre with name: " + genreName));

        Page<Book> books = bookRepository.findAllByGenreIdListContains(genre.getId(), pageable);

        return new PagedResponse<>(
                books.getTotalElements(),
                books.stream().map(this::toBookDto).toList()
        );
    }

    public List<BookDto> findMostPopularBooks() {
        return bookRepository.findTop10ByOrderByRateCountDesc().stream().map(this::toBookDto).toList();
    }

    public List<BookDto> findBestRatedBooks() {
        return bookRepository.findTop10ByOrderByRateAverageDesc().stream().map(this::toBookDto).toList();
    }

    private BookDto saveBook(BookDto bookDto) {
        List<String> authorList = bookDto.getAuthorList().stream().map(this::findOrCreateAuthor).toList();
        Book book = modelMapper.toBookEntity(bookDto);
        book.setAuthorIdList(authorList);

        List<String> genreList = bookDto.getGenreList().stream().map(this::findOrCreateGenre).toList();
        book.setGenreIdList(genreList);

        return modelMapper.toBookDto(bookRepository.save(book), bookDto.getAuthorList(), bookDto.getGenreList());
    }

    private String findOrCreateAuthor(AuthorDto authorDto) {
        Optional<Author> existingAuthor = authorRepository.findByFirstNameAndLastName(authorDto.getFirstName(), authorDto.getLastName());

        if (existingAuthor.isPresent()) {
            return existingAuthor.get().getId();
        }
        return authorRepository.save(modelMapper.toAuthorEntity(authorDto)).getId();
    }

    private String findOrCreateGenre(GenreDto genreDto) {
        Optional<Genre> existingGenre = genreRepository.findByName(genreDto.getName());

        if (existingGenre.isPresent()) {
            return existingGenre.get().getId();
        }
        return genreRepository.save(modelMapper.toGenreEntity(genreDto)).getId();
    }

    private BookDto toBookDto(Book book) {
        List<AuthorDto> authorDtoList = book.getAuthorIdList().stream()
                .map(authorId -> authorRepository.findById(authorId)
                        .map(modelMapper::toAuthorDto)
                        .orElseThrow(() -> new InternalException("Server wanted to provide you with an author that doesn't exist")))
                .toList();
        List<GenreDto> genreDtoList = book.getGenreIdList().stream()
                .map(genreId -> genreRepository.findById(genreId)
                        .map(modelMapper::toGenreDto)
                        .orElseThrow(() -> new InternalException("Server wanted to provide you with a genre that doesn't exist")))
                .toList();
        return modelMapper.toBookDto(book, authorDtoList, genreDtoList);
    }
}
