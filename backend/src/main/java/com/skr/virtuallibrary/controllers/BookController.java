package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.services.BookService;
import com.skr.virtuallibrary.services.FileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

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

    @Operation(summary = "Find all Books or search by title or author")
    @GetMapping
    public PagedResponse<BookDto> findAllBooks(@PathParam("search") String search, @PathParam("page") Integer page) {
        if (search != null && !search.isEmpty()) {
            String decodedSearch = URLDecoder.decode(search, StandardCharsets.UTF_8);
            if (page != null) {
                return new PagedResponse<>(bookService.findBooksByTitleOrAuthor(decodedSearch, page));
            }
            return new PagedResponse<>(bookService.findBooksByTitleOrAuthor(decodedSearch));
        }

        if (page != null) {
            return new PagedResponse<>(bookService.findAllBooks(page));
        }
        return new PagedResponse<>(bookService.findAllBooks());
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
            @RequestPart("cover") MultipartFile bookCover,
            @RequestPart("content") MultipartFile bookContent
    ) {
        String bookCoverId = fileService.addFile(bookCover, "image/png");
        String bookContentId = fileService.addFile(bookContent, "application/pdf");
        bookDto.setBookCoverId(bookCoverId);
        bookDto.setBookContentId(bookContentId);
        return bookService.updateBook(id, bookDto);
    }
}
