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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public static final String BOOK_NOT_FOUND_MSG = "Not found book with id: ";

    private static final int MIN_REVIEW_RATE = 1;

    private static final int MAX_REVIEW_RATE = 5;


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

    public List<ReviewDto> findReviewsByBookId(String id, int pageNr) {
        if (pageNr < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Page number cannot be negative.");
        }

        if (bookRepository.findById(id).isEmpty()) {
            throw new BookNotFoundException(BOOK_NOT_FOUND_MSG + id);
        }

        Pageable pageable = PageRequest.of(pageNr, 5, Sort.by("date").descending());

        return reviewRepository.findAllByBookId(id, pageable)
                .stream()
                .map(modelMapper::toReviewDto)
                .toList();
    }

    public ReviewDto addReview(ReviewDto reviewDto) {
        Review review = modelMapper.toReviewEntity(reviewDto);
        Book book = bookRepository.findById(reviewDto.getBookId())
                .orElseThrow(() -> new BookNotFoundException(BOOK_NOT_FOUND_MSG + reviewDto.getBookId()));

        review.setBook(book);
        review.setAuthor(getUser());

        return modelMapper.toReviewDto(reviewRepository.save(review));
    }

    public void deleteReview(String id) {
        Optional<Review> review = reviewRepository.findById(id);
        if (review.isEmpty()) {
            throw new ReviewNotFoundException(ERROR_NOT_FOUND_MSG + id);
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
        Book book = bookRepository.findById(reviewDto.getBookId())
                .orElseThrow(() -> new BookNotFoundException(BOOK_NOT_FOUND_MSG + reviewDto.getBookId()));
        review.setBook(book);

        if (reviewDto.getAuthor() != null && !reviewDto.getAuthor().getId().equals(review.getAuthor().getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot change review's author");
        }

        if (!reviewDto.getBookId().equals(review.getBook().getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot change review's book");
        }

        if (!review.getAuthor().equals(getUser())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot edit this review.");
        }

        review.setTitle(reviewDto.getTitle());
        review.setContent(reviewDto.getContent());
        review.setRating(reviewDto.getRating());

        return modelMapper.toReviewDto(reviewRepository.save(review));
    }

    private User getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UserNotFoundException("User could not be found with email: " + authentication.getName()));
    }
}
