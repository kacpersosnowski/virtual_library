package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.entities.BookList;
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
    public List<BookList> getUsersBookList() {
        return bookListService.getBookLists();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user's book list by id.")
    public BookList getBookList(@PathVariable String id) {
        return bookListService.getBookList(id);
    }

    @PostMapping
    @Operation(summary = "Create new book list.")
    public BookList createBookList(@Valid @RequestBody BookList bookList) {
        return bookListService.createBookList(bookList);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Add book to list.")
    public BookList addBookToList(@PathVariable String id, @RequestBody String bookId) {
        return bookListService.addBookToList(id, bookId);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Remove book from list.")
    public BookList removeBookFromList(@PathVariable String id, @RequestBody String bookId) {
        return bookListService.removeBookFromList(id, bookId);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Change book list name.")
    public BookList changeBookListName(@PathVariable String id, @RequestBody String name) {
        return bookListService.changeName(id, name);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete book list.")
    public void deleteBookList(@PathVariable String id) {
        bookListService.deleteBookList(id);
    }
}
