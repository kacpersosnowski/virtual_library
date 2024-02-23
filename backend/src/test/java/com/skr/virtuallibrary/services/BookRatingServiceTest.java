package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.BookRatingDto;
import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.entities.BookRating;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.BookRatingRepository;
import com.skr.virtuallibrary.repositories.ReviewRepository;
import org.assertj.core.api.Assertions;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.instancio.Select.field;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {ReviewRepository.class})
class BookRatingServiceTest {

    @InjectMocks
    private BookRatingService bookRatingService;

    @Mock
    private BookRatingRepository bookRatingRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private FindReviewService findReviewService;

    @Test
    void testGetBookRating_shouldReturnBookRating() {
        // given
        BookRating bookRating = Instancio.create(BookRating.class);
        BookRatingDto bookRatingDto = modelMapper.toBookRatingDto(bookRating);

        // when
        when(bookRatingRepository.findByBookId(bookRating.getBookId())).thenReturn(Optional.of(bookRating));
        BookRatingDto result = bookRatingService.getBookRating(bookRating.getBookId());

        // then
        Assertions.assertThat(result).isEqualTo(bookRatingDto);
    }

    @Test
    void testUpdateBookRating_shouldUpdateBookRating() {
        // given
        BookRating bookRating = Instancio.of(BookRating.class)
                .set(field(BookRating::getId), "id")
                .set(field(BookRating::getRateCount), 3)
                .set(field(BookRating::getRateAverage), 3.0)
                .create();
        List<ReviewDto> reviewDtoList = Instancio.ofList(ReviewDto.class).size(3).create().stream().peek(reviewDto -> reviewDto.setRating(3)).toList();
        PagedResponse<ReviewDto> reviewDtoPagedResponse = new PagedResponse<>(reviewDtoList);

        // when
        when(bookRatingRepository.findByBookId(bookRating.getBookId())).thenReturn(Optional.of(bookRating));
        when(findReviewService.findReviewsByBookId(bookRating.getBookId())).thenReturn(reviewDtoPagedResponse);
        when(bookRatingRepository.save(bookRating)).thenReturn(bookRating);
        bookRatingService.updateBookRating(bookRating.getBookId());

        // then
        verify(bookRatingRepository).save(bookRating);
    }

}
