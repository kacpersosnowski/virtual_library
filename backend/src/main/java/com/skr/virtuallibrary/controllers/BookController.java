package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.dto.BookDto;
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
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/books")
@Tag(name = "Books", description = "Books management APIs")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

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
    public BookDto findBookById(
            @Parameter(description = "Book id.", example = "1")
            @PathVariable String id
    ) {
        return bookService.findBookById(id);
    }

    @Operation(
            summary = "Find all Books",
            description = "Get all Book instances."
    )
    @GetMapping
    public List<BookDto> findAllBooks() {
        return bookService.findAllBooks();
    }

    @Operation(
            summary = "Post Book",
            description = "Post a Book to database."
    )
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public BookDto addBook(
            @Valid @RequestPart("book") BookDto bookDto,
            @RequestPart("cover") MultipartFile cover
    ) {
        return bookService.addBook(bookDto, cover);
    }

    @Operation(
            summary = "Delete Book by id",
            description = "Delete a Book by specifying its id."
    )
    @DeleteMapping("/{id}")
    public void deleteBook(
            @Parameter(description = "Book id.", example = "1")
            @PathVariable String id
    ) {
        bookService.deleteBook(id);
    }

    @Operation(
            summary = "Update Book by id",
            description = "Put a Book by specifying its id and providing new Book."
    )
    @PutMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public BookDto updateBook(
            @PathVariable String id,
            @Valid @RequestPart("book") BookDto bookDto,
            @RequestPart("cover") MultipartFile cover
    ) {
        return bookService.updateBook(id, bookDto, cover);
    }

    @Operation(
            summary = "Find Books by title or Author",
            description = "Get all Book by title or authors' firstName or lastName."
    )
    @GetMapping("/search/{searchPhrase}")
    public List<BookDto> findAllBooks(
            @Parameter(description = "Search phrase", example = "teoria")
            @PathVariable String searchPhrase
    ) {
        return bookService.findBooksByTitleOrAuthor(searchPhrase);
    }
}
