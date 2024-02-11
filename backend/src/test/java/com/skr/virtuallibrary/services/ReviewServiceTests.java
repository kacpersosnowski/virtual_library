package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.entities.Review;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.exceptions.ReviewNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.AuthorRepository;
import com.skr.virtuallibrary.repositories.BookRepository;
import com.skr.virtuallibrary.repositories.ReviewRepository;
import com.skr.virtuallibrary.repositories.UserRepository;
import com.skr.virtuallibrary.services.testData.ReviewTestDataBuilder;
import com.skr.virtuallibrary.services.testData.UserTestDataBuilder;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@Slf4j
@SpringBootTest(classes = {ReviewRepository.class})
public class ReviewServiceTests {

    public static final String USERNAME = "email@example.com";
    public static final String PASSWORD = "Password123!";
    @InjectMocks
    private ReviewService reviewService;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private AuthorRepository authorRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private BookRepository bookRepository;

    @Mock
    private ModelMapper modelMapper;

    private Review exampleReview;

    private ReviewDto exampleReviewDto;

    private User exampleUser;

    @BeforeEach
    final void setUp() {
        exampleReview = ReviewTestDataBuilder.reviewExample().review();
        exampleReviewDto = ReviewTestDataBuilder.reviewDtoExample().reviewDto();
        exampleUser = UserTestDataBuilder.userExample().user();
    }

    @Test
    void findReviewById_shouldReturnReviewDto() {
        // given
        String idToFind = "foo";

        // when
        when(reviewRepository.findById(idToFind)).thenReturn(Optional.ofNullable(exampleReview));
        when(modelMapper.toReviewDto(exampleReview)).thenReturn(exampleReviewDto);

        // then
        assertEquals(exampleReviewDto, reviewService.findReviewById(idToFind));
    }

    @Test
    void findReviewById_shouldThrowReviewNotFoundException() {
        // given
        String idToFind = "foo";

        // when
        when(reviewRepository.findById(idToFind)).thenReturn(Optional.empty());

        // then
        assertThrows(ReviewNotFoundException.class, () -> reviewService.findReviewById(idToFind));
    }

    @Test
    void findAllReviews_shouldReturnListOfReviewDtos() {
        // given
        List<Review> reviewsExamples = ReviewTestDataBuilder.exampleReviewList();
        List<ReviewDto> reviewDtosExamples = ReviewTestDataBuilder.exampleReviewDtoList();

        // when
        when(reviewRepository.findAll()).thenReturn(reviewsExamples);
        for (int i = 0; i < reviewsExamples.size(); i++) {
            when(modelMapper.toReviewDto(reviewsExamples.get(i)))
                    .thenReturn(reviewDtosExamples.get(i));
        }
        List<ReviewDto> expected = reviewDtosExamples;
        List<ReviewDto> actual = reviewService.findAllReviews();

        // then
        assertEquals(expected, actual);
    }

    @Test
    void addReview_shouldReturnReviewDto() {
        // given
        ReviewDto reviewDto = ReviewTestDataBuilder.reviewDtoExample().reviewDto();
        Review review = ReviewTestDataBuilder.reviewExample().review();

        // when
        when(modelMapper.toReviewEntity(reviewDto)).thenReturn(review);
        when(modelMapper.toReviewDto(review)).thenReturn(reviewDto);
        when(userRepository.findById(reviewDto.getAuthor().getId())).thenReturn(Optional.ofNullable(review.getAuthor()));
        when(reviewRepository.save(review)).thenReturn(review);

        // then
        assertEquals(reviewDto, reviewService.addReview(reviewDto));
    }

    @Test
    @WithMockUser(username = USERNAME, password = PASSWORD, roles = "USER")
    void deleteReview_shouldDeleteAuthor() {
        // given
        String idToDelete = "foo";

        // when
        when(reviewRepository.findById(idToDelete)).thenReturn(Optional.ofNullable(exampleReview));
        when(userRepository.findByEmail("email@example.com")).thenReturn(Optional.ofNullable(exampleUser));
        reviewService.deleteReview(idToDelete);

        // then
        verify(reviewRepository).deleteById(idToDelete);
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
        newReviewDto.setContent("newContent");
        newReviewDto.setRating(3);
        Review newReview = ReviewTestDataBuilder.reviewExample().review();
        newReview.setTitle("newTitle");
        newReview.setContent("newContent");
        newReview.setRating(3);

        // when
        when(reviewRepository.findById(idToUpdate)).thenReturn(Optional.ofNullable(oldReview));
        when(bookRepository.findById(newReviewDto.getBookId())).thenReturn(Optional.ofNullable(newReview.getBook()));
        when(userRepository.findByEmail(USERNAME)).thenReturn(Optional.ofNullable(exampleUser));

        assert oldReview != null;
        oldReview.setTitle(newReviewDto.getTitle());
        oldReview.setContent(newReviewDto.getContent());
        oldReview.setRating(newReviewDto.getRating());
        when(reviewRepository.save(oldReview)).thenReturn(newReview);
        when(modelMapper.toReviewDto(newReview)).thenReturn(newReviewDto);

        ReviewDto expected = newReviewDto;
        ReviewDto actual = reviewService.updateReview(idToUpdate, newReviewDto);

        // then
        assertEquals(expected, actual);
    }
}
