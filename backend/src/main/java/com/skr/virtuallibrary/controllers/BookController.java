package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.dto.BookDto;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.services.BookService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    private final ModelMapper modelMapper;

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> findBookById(@PathVariable String id) {
        BookDto bookDto = modelMapper.map(bookService.findBookById(id), BookDto.class);
        return ResponseEntity.status(HttpStatus.OK).body(bookDto);
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> findAllBooks() {
        List<BookDto> bookDtoList = bookService.findAllBooks().stream().map(this::convertToDto).toList();
        return ResponseEntity.status(HttpStatus.OK).body(bookDtoList);
    }

    @PostMapping
    public ResponseEntity<BookDto> addBook(@RequestBody BookDto bookDto) {
        Book book = convertToEntity(bookDto);
        BookDto bookCreated = convertToDto(bookService.addBook(book));
        return ResponseEntity.status(HttpStatus.OK).body(bookCreated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        bookService.deleteBook(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    private BookDto convertToDto(Book book) {
        return modelMapper.map(book, BookDto.class);
    }

    private Book convertToEntity(BookDto bookDto) {
        return modelMapper.map(bookDto, Book.class);
    }

}
