package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.services.FindReviewService;
import com.skr.virtuallibrary.services.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
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

    private final FindReviewService findReviewService;

    @Operation(summary = "Find Review by id.")
    @GetMapping("/{id}")
    public ReviewDto findReviewById(@PathVariable String id) {
        return findReviewService.findReviewById(id);
    }

    @Operation(summary = "Find all Reviews.")
    @GetMapping
    public List<ReviewDto> findAllReviews() {
        return findReviewService.findAllReviews();
    }

    @Operation(summary = "Find Reviews by book id and page number.")
    @GetMapping("/book/{id}")
    public PagedResponse<ReviewDto> findReviewsByBookId(@PathVariable String id, @PathParam("page") Integer page) {
        if (page == null) {
            return findReviewService.findReviewsByBookId(id);
        }
        return findReviewService.findReviewsByBookId(id, page);
    }

    @Operation(summary = "Post Review.")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ReviewDto addReview(@Valid @RequestBody ReviewDto reviewDto) {
        return reviewService.addReview(reviewDto);
    }

    @Operation(summary = "Delete Review by id")
    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable String id) {
        reviewService.deleteReview(id);
    }

    @Operation(summary = "Update Review by id")
    @PutMapping("/{id}")
    public ReviewDto updateReview(@PathVariable String id, @Valid @RequestBody ReviewDto reviewDto) {
        return reviewService.updateReview(id, reviewDto);
    }
}
