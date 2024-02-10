package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.services.BookService;
import com.skr.virtuallibrary.services.FileService;
import io.swagger.v3.oas.annotations.Operation;
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

    private final FileService fileService;

    @Operation(summary = "Find Book by id")
    @ApiResponse(responseCode = "200")
    @ApiResponse(responseCode = "404")
    @ApiResponse(responseCode = "500")
    @GetMapping("/{id}")
    public BookDto findBookById(@PathVariable String id) {
        return bookService.findBookById(id);
    }

    @Operation(summary = "Find all Books")
    @GetMapping
    public List<BookDto> findAllBooks() {
        return bookService.findAllBooks();
    }

    @Operation(summary = "Post Book")
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public BookDto addBook(
            @Valid @RequestPart("book") BookDto bookDto,
            @RequestPart("cover") MultipartFile bookCover,
            @RequestPart("content") MultipartFile bookContent
    ) {
        String bookCoverId = fileService.addFile(bookCover, "image/png");
        String bookContentId = fileService.addFile(bookContent, "application/pdf");
        bookDto.setBookCoverId(bookCoverId);
        bookDto.setBookContentId(bookContentId);
        return bookService.addBook(bookDto);
    }

    @Operation(summary = "Delete Book by id")
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable String id) {
        bookService.deleteBook(id);
    }

    @Operation(summary = "Update Book by id")
    @PutMapping(value = "/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public BookDto updateBook(
            @PathVariable String id,
            @Valid @RequestPart("book") BookDto bookDto,
            @RequestPart("cover")  MultipartFile bookCover,
            @RequestPart("content") MultipartFile bookContent
    ) {
        String bookCoverId = fileService.addFile(bookCover, "image/png");
        String bookContentId = fileService.addFile(bookContent, "application/pdf");
        bookDto.setBookCoverId(bookCoverId);
        bookDto.setBookContentId(bookContentId);
        return bookService.updateBook(id, bookDto);
    }

    @Operation(summary = "Find Books by title or Author")
    @GetMapping("/search/{searchPhrase}")
    public List<BookDto> findAllBooks(@PathVariable String searchPhrase) {
        return bookService.findBooksByTitleOrAuthor(searchPhrase);
    }
}
