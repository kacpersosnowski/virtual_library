package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.entities.Review;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Authority;
import com.skr.virtuallibrary.exceptions.ReviewNotFoundException;
import com.skr.virtuallibrary.exceptions.UserNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.ReviewRepository;
import com.skr.virtuallibrary.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final ModelMapper modelMapper;

    private final UserRepository userRepository;

    private final BookRatingService bookRatingService;

    private static final String ERROR_NOT_FOUND_MSG = "Not found review with id: ";

    public ReviewDto addReview(ReviewDto reviewDto) {
        Review review = modelMapper.toReviewEntity(reviewDto);

        review.setAuthor(getUser());

        reviewDto = modelMapper.toReviewDto(reviewRepository.save(review));
        bookRatingService.updateBookRating(review.getBookId());
        return reviewDto;
    }

    public void deleteReview(String id) {
        Optional<Review> review = reviewRepository.findById(id);
        if (review.isEmpty()) {
            throw new ReviewNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }

        User user = getUser();
        boolean isAdminOrAuthor = user.getAuthority().equals(Authority.ADMIN) || user.getId().equals(review.get().getAuthor().getId());
        if (!isAdminOrAuthor) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot delete this review.");
        }

        reviewRepository.deleteById(id);
        bookRatingService.updateBookRating(review.get().getBookId());
    }

    public ReviewDto updateReview(String id, ReviewDto reviewDto) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException(ERROR_NOT_FOUND_MSG + id));

        if (reviewDto.getAuthor() != null && !reviewDto.getAuthor().getId().equals(review.getAuthor().getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot change review's author");
        }

        if (!reviewDto.getBookId().equals(review.getBookId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot change review's book");
        }

        if (!review.getAuthor().getId().equals(getUser().getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot edit this review.");
        }

        review.setTitle(reviewDto.getTitle());
        review.setContent(reviewDto.getContent());
        review.setRating(reviewDto.getRating());

        reviewDto = modelMapper.toReviewDto(reviewRepository.save(review));
        bookRatingService.updateBookRating(review.getBookId());
        return reviewDto;
    }

    private User getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UserNotFoundException("User could not be found with email: " + authentication.getName()));
    }
}
