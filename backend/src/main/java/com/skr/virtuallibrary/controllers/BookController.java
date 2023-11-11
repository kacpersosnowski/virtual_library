package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.dto.BookDto;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.services.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
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
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> findAllBooks() {
        List<BookDto> bookDtoList = bookService.findAllBooks().stream().map(this::convertToDto).toList();
        return ResponseEntity.ok(bookDtoList);
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<BookDto> addBook(
            @Valid @RequestPart("book") BookDto bookDto,
            @RequestPart("cover") MultipartFile cover
    ) {
        try {
            Book book = convertToEntity(bookDto);
            BookDto bookCreated = convertToDto(bookService.addBook(book, cover));
            return ResponseEntity.ok(bookCreated);
        } catch (IOException ex) {
            log.error("Failed to add book: " + ex);
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        try {
            bookService.deleteBook(id);
            return ResponseEntity.ok().build();
        } catch (BookNotFoundException ex) {
            log.error("Failed to delete book: ", ex);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<BookDto> updateBook(
            @PathVariable String id,
            @Valid @RequestPart("book") BookDto bookDto,
            @RequestPart("cover") MultipartFile cover
    ) {
        try {
            Book book = convertToEntity(bookDto);
            BookDto bookUpdated = convertToDto(bookService.updateBook(id, book, cover));
            return ResponseEntity.ok(bookUpdated);
        } catch (BookNotFoundException ex) {
            log.error("Failed to update book: ", ex);
            return ResponseEntity.badRequest().build();
        } catch (IOException ex) {
            log.error("Failed to update book: ", ex);
            return ResponseEntity.internalServerError().build();
        }
    }

    private BookDto convertToDto(Book book) {
        String cover = Base64.getEncoder().encodeToString(book.getCover().getData());
        BookDto bookDto = modelMapper.map(book, BookDto.class);
        bookDto.setCover(cover);
        return bookDto;
    }

    private Book convertToEntity(BookDto bookDto) {
        return modelMapper.map(bookDto, Book.class);
    }

}
