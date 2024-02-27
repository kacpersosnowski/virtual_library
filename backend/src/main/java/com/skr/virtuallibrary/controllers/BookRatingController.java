package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.dto.BookRatingDto;
import com.skr.virtuallibrary.services.BookRatingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Book Ratings", description = "Book ratings management APIs")
@RequestMapping("/book-ratings")
@RequiredArgsConstructor
@RestController
public class BookRatingController {

    private final BookRatingService bookRatingService;

    @GetMapping("/{bookId}")
    @Operation(summary = "Get book rating by book id")
    public BookRatingDto getBookRating(@PathVariable String bookId) {
        return bookRatingService.getBookRating(bookId);
    }

}
