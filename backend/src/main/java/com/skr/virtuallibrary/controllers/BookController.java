package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.services.BookService;
import com.skr.virtuallibrary.services.FileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RequestMapping(value = "/books")
@Tag(name = "Books", description = "Books management APIs")
@RequiredArgsConstructor
@RestController
public class BookController {

    private final BookService bookService;

    private final FileService fileService;

    @Operation(summary = "Find Book by id")
    @GetMapping("/{id}")
    public BookDto findBookById(@PathVariable String id) {
        return bookService.findBookById(id);
    }

    @Operation(summary = "Find all Books or search by title, genre or author")
    @GetMapping
    public PagedResponse<BookDto> findAllBooks(
            @PathParam("search") String search,
            @PathParam("page") Integer page,
            @PathParam("genre") String genre) {
        if (search != null && !search.isEmpty()) {
            String decodedSearch = URLDecoder.decode(search, StandardCharsets.UTF_8);
            if (page != null) {
                return bookService.findBooksByTitleOrAuthor(decodedSearch, page);
            }
            return bookService.findBooksByTitleOrAuthor(decodedSearch);
        }

        if (genre != null && !genre.isEmpty()) {
            if (page != null) {
                return bookService.findBooksByGenre(genre, page);
            }
            return bookService.findBooksByGenre(genre);
        }

        if (page != null) {
            return bookService.findAllBooks(page);
        }
        return bookService.findAllBooks();
    }

    @Operation(summary = "Post Book")
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public BookDto addBook(
            @Valid @RequestPart("book") BookDto bookDto,
            @RequestPart("cover") MultipartFile bookCover,
            @RequestPart("content") MultipartFile bookContent
    ) {
        String bookCoverId = fileService.addFile(bookCover, "image/", false);
        String bookContentId = fileService.addFile(bookContent, "application/pdf", bookDto.isReadAuthenticatedOnly());
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
        String bookCoverId = fileService.addFile(bookCover, "image/", false);
        String bookContentId = fileService.addFile(bookContent, "application/pdf", bookDto.isReadAuthenticatedOnly());
        bookDto.setBookCoverId(bookCoverId);
        bookDto.setBookContentId(bookContentId);
        return bookService.updateBook(id, bookDto);
    }

    @Operation(summary = "Find 10 most popular books")
    @GetMapping("/most-popular")
    public List<BookDto> findMostPopularBooks() {
        return bookService.findMostPopularBooks();
    }

    @Operation(summary = "Find 10 best rated books")
    @GetMapping("/best-rated")
    public List<BookDto> findMostRatedBooks() {
        return bookService.findBestRatedBooks();
    }
}
