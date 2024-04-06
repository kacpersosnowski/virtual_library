package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.dto.BookListDto;
import com.skr.virtuallibrary.services.BookListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book-list")
@Tag(name = "Book Lists", description = "API for list of books.")
public class BookListController {

    private final BookListService bookListService;

    @GetMapping
    @Operation(summary = "Get user's all book lists.")
    public List<BookListDto> getUsersBookList() {
        return bookListService.getBookLists();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user's book list by id.")
    public BookListDto getBookList(@PathVariable String id) {
        return bookListService.getBookList(id);
    }

    @PostMapping
    @Operation(summary = "Create new book list.")
    public BookListDto createBookList(@Valid @RequestBody BookListDto bookListDto) {
        return bookListService.createBookList(bookListDto);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Add book to list.")
    public BookListDto addBookToList(@PathVariable String id, @RequestBody String bookId) {
        return bookListService.addBookToList(id, bookId);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Remove book from list.")
    public BookListDto removeBookFromList(@PathVariable String id, @RequestBody String bookId) {
        return bookListService.removeBookFromList(id, bookId);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Change book list name.")
    public BookListDto changeBookListName(@PathVariable String id, @RequestBody String name) {
        return bookListService.changeName(id, name);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete book list.")
    public void deleteBookList(@PathVariable String id) {
        bookListService.deleteBookList(id);
    }
}
