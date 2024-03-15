package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.entities.Review;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.exceptions.ReviewNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.ReviewRepository;
import com.skr.virtuallibrary.services.testData.ReviewTestDataBuilder;
import com.skr.virtuallibrary.services.testData.UserTestDataBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {ReviewRepository.class})
public class ReviewServiceTests {

    public static final String USERNAME = "email@example.com";

    public static final String PASSWORD = "Password123!";

    @InjectMocks
    private ReviewService reviewService;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private BookService bookService;

    @Mock
    private UserService userService;

    @Mock
    private BookRatingService bookRatingService;

    @Mock
    private ModelMapper modelMapper;

    private Review exampleReview;

    private User exampleUser;

    @BeforeEach
    final void setUp() {
        exampleReview = ReviewTestDataBuilder.reviewExample().review();
        exampleUser = UserTestDataBuilder.userExample().user();
    }

    @Test
    @WithMockUser(username = USERNAME, password = PASSWORD, roles = "USER")
    void addReview_shouldReturnReviewDto() {
        // given
        ReviewDto reviewDto = ReviewTestDataBuilder.reviewDtoExample().reviewDto();
        Review review = ReviewTestDataBuilder.reviewExample().review();

        // when
        when(bookService.findBookById(review.getBookId())).thenReturn(new BookDto());
        when(modelMapper.toReviewEntity(reviewDto)).thenReturn(review);
        when(userService.getCurrentUser()).thenReturn(exampleUser);
        when(reviewRepository.save(review)).thenReturn(review);
        when(modelMapper.toReviewDto(review, exampleUser)).thenReturn(reviewDto);
        ReviewDto expected = reviewDto;
        ReviewDto actual = reviewService.addReview(reviewDto);

        // then
        verify(bookRatingService).updateBookRating(review.getBookId());
        assertEquals(expected, actual);
    }

    @Test
    @WithMockUser(username = USERNAME, password = PASSWORD, roles = "USER")
    void deleteReview_shouldDeleteAuthor() {
        // given
        String idToDelete = "foo";

        // when
        when(reviewRepository.findById(idToDelete)).thenReturn(Optional.ofNullable(exampleReview));
        when(userService.getCurrentUser()).thenReturn(exampleUser);
        reviewService.deleteReview(idToDelete);

        // then
        verify(reviewRepository).deleteById(idToDelete);
        verify(bookRatingService).updateBookRating(exampleReview.getBookId());
    }

    @Test
    void deleteReview_shouldThrowReviewNotFoundException() {
        // given
        String idToDelete = "foo";

        // when
        when(reviewRepository.findById(idToDelete)).thenReturn(Optional.empty());

        // then
        assertThrows(ReviewNotFoundException.class, () -> reviewService.deleteReview(idToDelete));
    }

    @Test
    @WithMockUser(username = USERNAME, password = PASSWORD, roles = "USER")
    void updateReview_shouldReturnReviewDto() {
        // given
        String idToUpdate = "foo";
        Review oldReview = ReviewTestDataBuilder.reviewExample().review();

        ReviewDto newReviewDto = ReviewTestDataBuilder.reviewDtoExample().reviewDto();
        newReviewDto.setTitle("newTitle");

        Review newReview = ReviewTestDataBuilder.reviewExample().review();
        newReview.setTitle("newTitle");

        oldReview.setTitle(newReviewDto.getTitle());

        // when
        when(bookService.findBookById(oldReview.getBookId())).thenReturn(new BookDto());
        when(reviewRepository.findById(idToUpdate)).thenReturn(Optional.of(oldReview));
        when(userService.getCurrentUser()).thenReturn(exampleUser);
        when(reviewRepository.save(oldReview)).thenReturn(newReview);
        when(modelMapper.toReviewDto(newReview, exampleUser)).thenReturn(newReviewDto);

        ReviewDto expected = newReviewDto;
        ReviewDto actual = reviewService.updateReview(idToUpdate, newReviewDto);

        // then
        verify(bookRatingService).updateBookRating(newReview.getBookId());
        assertEquals(expected, actual);
    }
}
