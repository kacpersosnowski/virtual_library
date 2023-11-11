package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;

    private static final String ERROR_MSG = "Not found book with id: ";

    public Book findBookById(String id) throws BookNotFoundException {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(ERROR_MSG + id));
    }

    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    public Book addBook(Book book, MultipartFile cover) throws IOException {
        book.setCover(new Binary(BsonBinarySubType.BINARY, cover.getBytes()));
        return bookRepository.save(book);
    }

    public void deleteBook(String id) throws BookNotFoundException {
        if (bookRepository.findById(id).isPresent()) {
            bookRepository.deleteById(id);
        } else {
            throw new BookNotFoundException(ERROR_MSG + id);
        }
    }

    public Book updateBook(String id, Book book, MultipartFile cover) throws BookNotFoundException, IOException {
        if (bookRepository.findById(id).isPresent()) {
            book.setId(id);
            return addBook(book, cover);
        } else {
            throw new BookNotFoundException(ERROR_MSG + id);
        }
    }
}
