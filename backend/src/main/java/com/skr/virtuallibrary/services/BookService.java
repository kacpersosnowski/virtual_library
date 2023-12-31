package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.exceptions.InternalException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.AuthorRepository;
import com.skr.virtuallibrary.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;

    private final AuthorRepository authorRepository;

    private final ModelMapper modelMapper;

    private final MongoTemplate mongoTemplate;

    private static final String ERROR_NOT_FOUND_MSG = "Not found book with id: ";

    private static final String ERROR_SAVE_MSG = "Error while trying to save book in database.";

    public BookDto findBookById(String id) {
        return bookRepository.findById(id).map(modelMapper::toBookDto)
                .orElseThrow(() -> new BookNotFoundException(ERROR_NOT_FOUND_MSG + id));
    }

    public List<BookDto> findAllBooks() {
        return bookRepository.findAll().stream().map(modelMapper::toBookDto).toList();
    }

    public BookDto addBook(BookDto bookDto, MultipartFile cover) {
        return saveBook(bookDto, cover);
    }

    public void deleteBook(String id) {
        if (bookRepository.findById(id).isPresent()) {
            bookRepository.deleteById(id);
        } else {
            throw new BookNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }
    }

    public BookDto updateBook(String id, BookDto bookDto, MultipartFile cover) {
        if (bookRepository.findById(id).isEmpty()) {
            throw new BookNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }
        bookDto.setId(id);
        return saveBook(bookDto, cover);
    }

    public List<BookDto> findBooksByTitleOrAuthor(String searchPhrase) {
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
        return books.stream()
                .map(modelMapper::toBookDto)
                .distinct()
                .toList();
    }

    private BookDto saveBook(BookDto bookDto, MultipartFile cover) {
        try {
            List<Author> authorList = bookDto.getAuthorList().stream().map(this::findOrCreateAuthor).toList();
            Book book = modelMapper.toBookEntity(bookDto);
            book.setAuthorList(authorList);
            book.setCover(new Binary(BsonBinarySubType.BINARY, cover.getBytes()));
            return modelMapper.toBookDto(bookRepository.save(book));
        } catch (IOException ex) {
            throw new InternalException(ERROR_SAVE_MSG, ex);
        }
    }

    private Author findOrCreateAuthor(AuthorDto authorDto) {
        Optional<Author> existingAuthor = authorRepository.findByFirstNameAndLastName(authorDto.getFirstName(), authorDto.getLastName());
        return existingAuthor.orElseGet(() -> authorRepository.save(modelMapper.toAuthorEntity(authorDto)));
    }

}
