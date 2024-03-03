package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.entities.Review;
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
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FindReviewService {

    private final ReviewRepository reviewRepository;

    private final ModelMapper modelMapper;

    private final BookRepository bookRepository;

    private final UserRepository userRepository;

    private static final String ERROR_NOT_FOUND_MSG = "Not found review with id: ";

    public static final String BOOK_NOT_FOUND_MSG = "Not found book with id: ";

    public ReviewDto findReviewById(String id) {
        return reviewRepository.findById(id).map(review ->
                        modelMapper.toReviewDto(review, userRepository.findById(review.getAuthorId())
                                .orElseThrow(() -> new UserNotFoundException("Not found user with id: " + review.getAuthorId()))))
                .orElseThrow(() -> new ReviewNotFoundException(ERROR_NOT_FOUND_MSG + id));
    }

    public List<ReviewDto> findAllReviews() {
        return reviewRepository.findAll()
                .stream()
                .map(review -> modelMapper.toReviewDto(review, userRepository.findById(review.getAuthorId())
                        .orElseThrow(() -> new UserNotFoundException("Not found user with id: " + review.getAuthorId())))
                ).toList();
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
                reviews.stream()
                        .map(review -> modelMapper.toReviewDto(review, userRepository.findById(review.getAuthorId())
                                .orElseThrow(() -> new UserNotFoundException("Not found user with id: " + review.getAuthorId())))
                        ).toList()
        );
    }

    public PagedResponse<ReviewDto> findReviewsByBookId(String id) {
        if (bookRepository.findById(id).isEmpty()) {
            throw new BookNotFoundException(BOOK_NOT_FOUND_MSG + id);
        }
        List<ReviewDto> reviews = reviewRepository.findAllByBookId(id).stream()
                .map(review -> modelMapper.toReviewDto(review, userRepository.findById(review.getAuthorId())
                        .orElseThrow(() -> new UserNotFoundException("Not found user with id: " + review.getAuthorId())))
                ).toList();
        return new PagedResponse<>(reviews);
    }

}
