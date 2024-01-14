package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.entities.Review;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Authority;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.exceptions.ReviewNotFoundException;
import com.skr.virtuallibrary.exceptions.UserNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.BookRepository;
import com.skr.virtuallibrary.repositories.ReviewRepository;
import com.skr.virtuallibrary.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final ModelMapper modelMapper;

    private final UserRepository userRepository;

    private final BookRepository bookRepository;

    private static final String ERROR_NOT_FOUND_MSG = "Not found review with id: ";

    public ReviewDto findReviewById(String id) {
        return reviewRepository.findById(id).map(modelMapper::toReviewDto)
                .orElseThrow(() -> new ReviewNotFoundException(ERROR_NOT_FOUND_MSG + id));
    }

    public List<ReviewDto> findAllReviews() {
        return reviewRepository.findAll()
                .stream()
                .map(modelMapper::toReviewDto)
                .toList();
    }

    public ReviewDto addReview(ReviewDto reviewDto) {
        Review review = modelMapper.toReviewEntity(reviewDto);
        Book book = bookRepository.findById(reviewDto.getBook().getId())
                        .orElseThrow(() -> new BookNotFoundException("Not found book with id: " + reviewDto.getBook().getId()));
        review.setBook(book);
        review.setAuthor(getUser());
        review.setDate(LocalDate.now());

        return modelMapper.toReviewDto(reviewRepository.save(review));
    }

    public void deleteAuthor(String id) {
        Optional<Review> review = reviewRepository.findById(id);
        if (review.isEmpty()) {
            return;
        }

        User user = getUser();
        boolean isAdminOrAuthor = user.getAuthority().equals(Authority.ADMIN) || user.equals(review.get().getAuthor());
        if (!isAdminOrAuthor) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot delete this review.");
        }

        reviewRepository.deleteById(id);
    }

    public ReviewDto updateReview(String id, ReviewDto reviewDto) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException(ERROR_NOT_FOUND_MSG + id));
        Book book = bookRepository.findById(reviewDto.getBook().getId())
                .orElseThrow(() -> new BookNotFoundException("Not found book with id: " + reviewDto.getBook().getId()));
        review.setBook(book);

        if (!review.getAuthor().equals(getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot edit this review.");
        }

        return modelMapper.toReviewDto(
                reviewRepository.save(modelMapper.toReviewEntity(reviewDto))
        );
    }

    private User getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UserNotFoundException("User could not be found with email: " + authentication.getName()));
    }
}
