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

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get user's all book lists.")
    public List<BookListDto> getUsersBookList(@PathVariable String userId) {
        return bookListService.getBookLists(userId);
    }

    @PatchMapping("/add/{listId}/{bookId}")
    @Operation(summary = "Add book to list.")
    public BookListDto addBookToList(@PathVariable String listId, @PathVariable String bookId) {
        return bookListService.addBookToList(listId, bookId);
    }

    @PatchMapping("/remove/{listId}/{bookId}")
    @Operation(summary = "Remove book from list.")
    public BookListDto removeBookFromList(@PathVariable String listId, @PathVariable String bookId) {
        return bookListService.removeBookFromList(listId, bookId);
    }

    @PatchMapping("/{listId}")
    @Operation(summary = "Change name of a book list.")
    public BookListDto changeBookListName(@PathVariable String listId, @RequestBody String newName) {
        return bookListService.changeName(listId, newName);
    }

    @DeleteMapping("/{listId}")
    @Operation(summary = "Delete book list.")
    public void deleteBookList(@PathVariable String listId) {
        bookListService.deleteBookList(listId);
    }
}
