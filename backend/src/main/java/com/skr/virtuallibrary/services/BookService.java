package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.exceptions.InternalException;
import com.skr.virtuallibrary.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;

    private static final String ERROR_NOT_FOUND_MSG = "Not found book with id: ";

    private static final String ERROR_SAVE_MSG = "Error while trying to save book in database.";

    public Book findBookById(String id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(ERROR_NOT_FOUND_MSG + id));
    }

    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    public Book addBook(Book book, MultipartFile cover) {
        return saveBook(book, cover);
    }

    public void deleteBook(String id) {
        if (bookRepository.findById(id).isPresent()) {
            bookRepository.deleteById(id);
        } else {
            throw new BookNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }
    }

    public Book updateBook(String id, Book book, MultipartFile cover) {
        if (bookRepository.findById(id).isPresent()) {
            book.setId(id);
            return saveBook(book, cover);
        } else {
            throw new BookNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }
    }

    private Book saveBook(Book book, MultipartFile cover) {
        try {
            book.setCover(new Binary(BsonBinarySubType.BINARY, cover.getBytes()));
            return bookRepository.save(book);
        } catch (IOException ex) {
            throw new InternalException(ERROR_SAVE_MSG, ex);
        }
    }
}
