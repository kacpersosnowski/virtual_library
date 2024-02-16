package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.BookRating;
import com.skr.virtuallibrary.dto.ReviewDto;
import org.assertj.core.api.Assertions;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.mockito.Mockito.when;

@SpringBootTest
class BookRatingServiceTest {

    @InjectMocks
    private BookRatingService bookRatingService;

    @Mock
    private ReviewService reviewService;

    @Test
    void testGetBookRating_shouldReturnBookRating() {
        // given
        String bookId = "foo";
        List<ReviewDto> reviewList = Instancio.ofList(ReviewDto.class).size(3).create();
        for (int i = 0; i < reviewList.size(); i++) {
            reviewList.get(i).setRating(1 + i);
        }
        BookRating bookRating = new BookRating(bookId, 3, 2.0);

        // when
        when(reviewService.findReviewsByBookId(bookId)).thenReturn(new PagedResponse<>(reviewList));
        BookRating result = bookRatingService.getBookRating(bookId);

        // then
        Assertions.assertThat(result).isEqualTo(bookRating);
    }
}
