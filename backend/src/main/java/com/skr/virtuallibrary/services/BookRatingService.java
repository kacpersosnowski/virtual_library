package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.BookRating;
import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.exceptions.InternalException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BookRatingService {

    private final ReviewService reviewService;

    public BookRating getBookRating(String bookId) {
        List<ReviewDto> reviewList = reviewService.findReviewsByBookId(bookId).getContent();
        int rateCount = reviewList.size();
        double rateMean = reviewList.stream().mapToDouble(ReviewDto::getRating).average()
                .orElseThrow(() -> new InternalException("Error while calculating rating mean."));
        return new BookRating(bookId, rateCount, rateMean);
    }

}
