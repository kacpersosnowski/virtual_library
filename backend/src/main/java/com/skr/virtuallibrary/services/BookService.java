package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public void deleteBook(String id) throws BookNotFoundException {
        if (bookRepository.findById(id).isPresent()) {
            bookRepository.deleteById(id);
        } else {
            throw new BookNotFoundException(ERROR_MSG + id);
        }
    }

    public Book updateBook(String id, Book book) throws BookNotFoundException {
        if (bookRepository.findById(id).isPresent()) {
            book.setId(id);
            return bookRepository.save(book);
        } else {
            throw new BookNotFoundException(ERROR_MSG + id);
        }
    }
}
