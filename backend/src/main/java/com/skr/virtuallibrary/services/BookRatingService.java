package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.BookRatingDto;
import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.entities.BookRating;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.BookRatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BookRatingService {

    private final BookRatingRepository bookRatingRepository;

    private final FindReviewService findReviewService;

    private final ModelMapper modelMapper;

    public BookRatingDto getBookRating(String bookId) {
        return modelMapper.toBookRatingDto(getBookRatingOrCreate(bookId));
    }

    public void updateBookRating(String bookId) {
        BookRating savedBookRating = getBookRatingOrCreate(bookId);
        BookRating updatedBookRating = calculateBookRating(bookId);

        updatedBookRating.setId(savedBookRating.getId());
        bookRatingRepository.save(updatedBookRating);
    }

    private BookRating getBookRatingOrCreate(String bookId) {
        Optional<BookRating> bookRating = bookRatingRepository.findByBookId(bookId);
        if (bookRating.isEmpty()) {
            bookRating = Optional.of(bookRatingRepository.save(
                    calculateBookRating(bookId)
            ));
        }
        return bookRating.get();
    }

    private BookRating calculateBookRating(String bookId) {
        List<ReviewDto> reviewList = findReviewService.findReviewsByBookId(bookId).getContent();
        int rateCount = reviewList.size();
        double rateMean = reviewList.stream().mapToDouble(ReviewDto::getRating).average().orElse(0);
        return BookRating.builder().bookId(bookId).rateAverage(rateMean).rateCount(rateCount).build();
    }

}
