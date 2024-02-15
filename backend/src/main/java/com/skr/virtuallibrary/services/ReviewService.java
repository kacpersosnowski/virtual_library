package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
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
import org.springframework.data.domain.Page;
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

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final ModelMapper modelMapper;

    private final UserRepository userRepository;

    private final BookRepository bookRepository;

    private static final String ERROR_NOT_FOUND_MSG = "Not found review with id: ";

    public static final String BOOK_NOT_FOUND_MSG = "Not found book with id: ";

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

    public PagedResponse<ReviewDto> findReviewsByBookId(String id, Integer pageNr) {
        if (pageNr < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Page number cannot be negative.");
        }

        if (bookRepository.findById(id).isEmpty()) {
            throw new BookNotFoundException(BOOK_NOT_FOUND_MSG + id);
        }

        Pageable pageable = PageRequest.of(pageNr, 10, Sort.by("auditData.lastModifiedDate").descending());
        Page<Review> reviews = reviewRepository.findAllByBookId(id, pageable);

        return new PagedResponse<>(
                reviews.getTotalElements(),
                reviews.stream().map(modelMapper::toReviewDto).toList()
        );
    }

    public PagedResponse<ReviewDto> findReviewsByBookId(String id) {
        if (bookRepository.findById(id).isEmpty()) {
            throw new BookNotFoundException(BOOK_NOT_FOUND_MSG + id);
        }
        List<ReviewDto> reviews = reviewRepository.findAllByBookId(id).stream().map(modelMapper::toReviewDto).toList();
        return new PagedResponse<>(reviews);
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

        if (!review.getAuthor().getId().equals(getUser().getId())) {
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
