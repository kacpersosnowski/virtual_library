package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.dto.BookDto;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.services.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/books")
@Tag(name = "Books", description = "Books management APIs")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    private final ModelMapper modelMapper;

    @Operation(
            summary = "Find Book by id",
            description = "Get a Book by specifying its id."
    )
    @ApiResponse(
            responseCode = "200",
            content = {
                    @Content(schema = @Schema(implementation = BookDto.class), mediaType = "application/json")})
    @ApiResponse(
            responseCode = "404",
            content = {@Content(schema = @Schema(implementation = BookNotFoundException.class))})
    @ApiResponse(
            responseCode = "500",
            content = {@Content(schema = @Schema())})
    @GetMapping("/{id}")
    public ResponseEntity<BookDto> findBookById(
            @Parameter(description = "Book id.", example = "1")
            @PathVariable String id
    ) {
        try {
            BookDto bookDto = convertToDto(bookService.findBookById(id));
            return ResponseEntity.ok(bookDto);
        } catch (BookNotFoundException ex) {
            log.error("Failed to find book: ", ex);
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(
            summary = "Find all Books",
            description = "Get all Book instances."
    )
    @GetMapping
    public ResponseEntity<List<BookDto>> findAllBooks() {
        List<BookDto> bookDtoList = bookService.findAllBooks().stream().map(this::convertToDto).toList();
        return ResponseEntity.ok(bookDtoList);
    }

    @Operation(
            summary = "Post Book",
            description = "Post a Book to database."
    )
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity<BookDto> addBook(@Valid @RequestBody BookDto bookDto) {
        Book book = convertToEntity(bookDto);
        BookDto bookCreated = convertToDto(bookService.addBook(book));
        return ResponseEntity.ok(bookCreated);
    }

    @Operation(
            summary = "Delete Book by id",
            description = "Delete a Book by specifying its id."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(
            @Parameter(description = "Book id.", example = "1")
            @PathVariable String id
    ) {
        try {
            bookService.deleteBook(id);
            return ResponseEntity.ok().build();
        } catch (BookNotFoundException ex) {
            log.error("Failed to delete book: ", ex);
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(
            summary = "Update Book by id",
            description = "Put a Book by specifying its id and providing new Book."
    )
    @PutMapping("/{id}")
    public ResponseEntity<BookDto> updateBook(
            @Parameter(description = "Book id.", example = "1")
            @PathVariable String id,
            @Valid @RequestBody BookDto bookDto
    ) {
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
