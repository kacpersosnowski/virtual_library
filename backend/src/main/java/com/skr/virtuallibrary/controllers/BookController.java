package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.dto.BookDto;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.services.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    private final ModelMapper modelMapper;

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> findBookById(@PathVariable String id) {
        try {
            BookDto bookDto = convertToDto(bookService.findBookById(id));
            return ResponseEntity.ok(bookDto);
        } catch (BookNotFoundException ex) {
            log.error("Failed to find book: ", ex);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> findAllBooks() {
        List<BookDto> bookDtoList = bookService.findAllBooks().stream().map(this::convertToDto).toList();
        return ResponseEntity.ok(bookDtoList);
    }

    @PostMapping
    public ResponseEntity<BookDto> addBook(@Valid @RequestBody BookDto bookDto) {
        Book book = convertToEntity(bookDto);
        BookDto bookCreated = convertToDto(bookService.addBook(book));
        return ResponseEntity.ok(bookCreated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        try {
            bookService.deleteBook(id);
            return ResponseEntity.ok().build();
        } catch (BookNotFoundException ex) {
            log.error("Failed to delete book: ", ex);
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDto> updateBook(@PathVariable String id, @Valid @RequestBody BookDto bookDto) {
        try {
            Book book = convertToEntity(bookDto);
            BookDto bookUpdated = convertToDto(bookService.updateBook(id, book));
            return ResponseEntity.ok(bookUpdated);
        } catch (BookNotFoundException ex) {
            log.error("Failed to update book: ", ex);
            return ResponseEntity.notFound().build();
        }
    }

    private BookDto convertToDto(Book book) {
        return modelMapper.map(book, BookDto.class);
    }

    private Book convertToEntity(BookDto bookDto) {
        return modelMapper.map(bookDto, Book.class);
    }

}
