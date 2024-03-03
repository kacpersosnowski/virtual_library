package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.entities.Review;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.exceptions.ReviewNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.ReviewRepository;
import com.skr.virtuallibrary.repositories.UserRepository;
import com.skr.virtuallibrary.services.testData.ReviewTestDataBuilder;
import com.skr.virtuallibrary.services.testData.UserTestDataBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {ReviewRepository.class})
class FindReviewServiceTest {

    @InjectMocks
    private FindReviewService findReviewService;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private UserRepository userRepository;

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
        when(modelMapper.toReviewDto(exampleReview, exampleUser)).thenReturn(exampleReviewDto);

        // then
        assertEquals(exampleReviewDto, findReviewService.findReviewById(idToFind));
    }

    @Test
    void findReviewById_shouldThrowReviewNotFoundException() {
        // given
        String idToFind = "foo";

        // when
        when(reviewRepository.findById(idToFind)).thenReturn(Optional.empty());

        // then
        assertThrows(ReviewNotFoundException.class, () -> findReviewService.findReviewById(idToFind));
    }

    @Test
    void findAllReviews_shouldReturnListOfReviewDtos() {
        // given
        List<Review> reviewsExamples = ReviewTestDataBuilder.exampleReviewList();
        List<ReviewDto> reviewDtosExamples = ReviewTestDataBuilder.exampleReviewDtoList();

        // when
        when(reviewRepository.findAll()).thenReturn(reviewsExamples);
        for (int i = 0; i < reviewsExamples.size(); i++) {
            when(userRepository.findById(reviewsExamples.get(i).getAuthorId()))
                    .thenReturn(Optional.ofNullable(exampleUser));
            when(modelMapper.toReviewDto(reviewsExamples.get(i), exampleUser))
                    .thenReturn(reviewDtosExamples.get(i));
        }
        List<ReviewDto> expected = reviewDtosExamples;
        List<ReviewDto> actual = findReviewService.findAllReviews();

        // then
        assertEquals(expected, actual);
    }

}
