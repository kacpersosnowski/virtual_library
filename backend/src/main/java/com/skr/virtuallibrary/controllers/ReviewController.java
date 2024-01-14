package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.services.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
@Tag(name = "Reviews", description = "Reviews management APIs")
public class ReviewController {

    private final ReviewService reviewService;

    @Operation(summary = "Find Review by id.")
    @GetMapping("/{id}")
    public ReviewDto findAuthorById(@PathVariable String id) {
        return reviewService.findReviewById(id);
    }

    @Operation(summary = "Find all Reviews.")
    @GetMapping
    public List<ReviewDto> findAllAuthors() {
        return reviewService.findAllReviews();
    }

    @Operation(summary = "Post Review.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ReviewDto addAuthor(@Valid @RequestBody ReviewDto reviewDto) {
        return reviewService.addReview(reviewDto);
    }

    @Operation(summary = "Delete Review by id")
    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable String id) {
        reviewService.deleteAuthor(id);
    }

    @Operation(summary = "Update Review by id")
    @PutMapping("/{id}")
    public ReviewDto updateAuthor(@PathVariable String id, @Valid @RequestBody ReviewDto reviewDto) {
        return reviewService.updateReview(id, reviewDto);
    }
}
