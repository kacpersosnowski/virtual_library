package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.dto.BookRating;
import com.skr.virtuallibrary.services.BookRatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/book-ratings")
@RequiredArgsConstructor
@RestController
public class BookRatingController {

    private final BookRatingService bookRatingService;

    @GetMapping("/{bookId}")
    public BookRating getBookRating(@PathVariable String bookId) {
        return bookRatingService.getBookRating(bookId);
    }

}
