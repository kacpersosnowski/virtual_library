package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.dto.ReviewDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BookRatingService {

    private final BookService bookService;

    private final FindReviewService findReviewService;

    public void updateBookRating(String bookId) {
        List<ReviewDto> reviewList = findReviewService.findReviewsByBookId(bookId).getContent();
        int rateCount = reviewList.size();
        double rateAverage = reviewList.stream().mapToDouble(ReviewDto::getRating).average().orElse(0);

        BookDto book = bookService.findBookById(bookId);
        book.setRateCount(rateCount);
        book.setRateAverage(rateAverage);

        bookService.updateBook(book.getId(), book);
    }

}
