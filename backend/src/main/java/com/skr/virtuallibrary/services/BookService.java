package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.exceptions.InternalException;
import com.skr.virtuallibrary.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;

    private final AuthorService authorService;

    private final ModelMapper modelMapper;

    private static final String ERROR_NOT_FOUND_MSG = "Not found book with id: ";

    private static final String ERROR_SAVE_MSG = "Error while trying to save book in database.";

    public BookDto findBookById(String id) {
        return bookRepository.findById(id).map(this::convertToDto)
                .orElseThrow(() -> new BookNotFoundException(ERROR_NOT_FOUND_MSG + id));
    }

    public List<BookDto> findAllBooks() {
        return bookRepository.findAll().stream().map(this::convertToDto).toList();
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
        if (bookRepository.findById(id).isPresent()) {
            bookDto.setId(id);
            return saveBook(bookDto, cover);
        } else {
            throw new BookNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }
    }

    private BookDto saveBook(BookDto bookDto, MultipartFile cover) {
        try {
            Book book = convertToEntity(bookDto);
            book.setCover(new Binary(BsonBinarySubType.BINARY, cover.getBytes()));
            return convertToDto(bookRepository.save(book));
        } catch (IOException ex) {
            throw new InternalException(ERROR_SAVE_MSG, ex);
        }
    }

    private BookDto convertToDto(Book book) {
        String cover = Base64.getEncoder().encodeToString(book.getCover().getData());
        List<String> authorIdList = book.getAuthorIdList();
        List<AuthorDto> authorList = authorIdList.stream().map(authorService::findAuthorById).toList();

        BookDto bookDto = modelMapper.map(book, BookDto.class);

        bookDto.setCover(cover);
        return bookDto;
    }

    private Book convertToEntity(BookDto bookDto) {
        return modelMapper.map(bookDto, Book.class);
    }
}
