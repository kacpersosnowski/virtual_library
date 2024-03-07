package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.entities.Review;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Authority;
import com.skr.virtuallibrary.exceptions.ReviewAlreadyExistsException;
import com.skr.virtuallibrary.exceptions.ReviewNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final ModelMapper modelMapper;

    private final UserService userService;

    private final BookRatingService bookRatingService;

    private final BookService bookService;

    private static final String ERROR_NOT_FOUND_MSG = "Not found review with id: ";

    public ReviewDto addReview(ReviewDto reviewDto) {
        bookService.findBookById(reviewDto.getBookId());

        Review review = modelMapper.toReviewEntity(reviewDto);
        User currentUser = userService.getCurrentUser();

        boolean notHaveReviewOrAdmin = reviewRepository
                .findAllByBookIdAndAuthorId(reviewDto.getBookId(), currentUser.getId()).isEmpty()
                || currentUser.getAuthority().equals(Authority.ADMIN);
        if (!notHaveReviewOrAdmin) {
            throw new ReviewAlreadyExistsException("You have already reviewed this book.");
        }

        review.setAuthorId(currentUser.getId());

        reviewDto = modelMapper.toReviewDto(reviewRepository.save(review), currentUser);
        bookRatingService.updateBookRating(review.getBookId());
        return reviewDto;
    }

    public void deleteReview(String id) {
        Optional<Review> review = reviewRepository.findById(id);
        if (review.isEmpty()) {
            throw new ReviewNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }

        User user = userService.getCurrentUser();
        boolean isAdminOrAuthor = user.getAuthority().equals(Authority.ADMIN) || user.getId().equals(review.get().getAuthorId());
        if (!isAdminOrAuthor) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot delete this review.");
        }

        reviewRepository.deleteById(id);
        bookRatingService.updateBookRating(review.get().getBookId());
    }

    public ReviewDto updateReview(String id, ReviewDto reviewDto) {
        bookService.findBookById(reviewDto.getBookId());

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException(ERROR_NOT_FOUND_MSG + id));

        if (reviewDto.getAuthor() != null && !reviewDto.getAuthor().getId().equals(review.getAuthorId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot change review's author");
        }

        if (!reviewDto.getBookId().equals(review.getBookId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot change review's book");
        }

        if (!review.getAuthorId().equals(userService.getCurrentUser().getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot edit this review.");
        }

        review.setTitle(reviewDto.getTitle());
        review.setContent(reviewDto.getContent());
        review.setRating(reviewDto.getRating());

        reviewDto = modelMapper.toReviewDto(reviewRepository.save(review), userService.getCurrentUser());
        bookRatingService.updateBookRating(review.getBookId());
        return reviewDto;
    }

}
