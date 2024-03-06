package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.repositories.ReviewRepository;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.instancio.Select.field;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {ReviewRepository.class})
class BookRatingServiceTest {

    @InjectMocks
    private BookRatingService bookRatingService;

    @Mock
    private BookService bookService;

    @Mock
    private FindReviewService findReviewService;

    @Test
    void testUpdateBookRating_shouldUpdateBookRating() {
        // given
        List<ReviewDto> reviewDtoList = Instancio.ofList(ReviewDto.class).size(3).create().stream().peek(reviewDto -> reviewDto.setRating(3)).toList();
        PagedResponse<ReviewDto> reviewDtoPagedResponse = new PagedResponse<>(reviewDtoList);
        String bookId = reviewDtoList.get(0).getBookId();
        BookDto bookDto = Instancio.of(BookDto.class).set(field(BookDto::getId), bookId).create();

        // when
        when(findReviewService.findReviewsByBookId(bookId)).thenReturn(reviewDtoPagedResponse);
        when(bookService.findBookById(bookId)).thenReturn(bookDto);
        bookRatingService.updateBookRating(bookId);

        // then
        verify(bookService).updateBook(bookId, bookDto);
    }

}
