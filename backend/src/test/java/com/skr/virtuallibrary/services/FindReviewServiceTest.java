package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.entities.Review;
import com.skr.virtuallibrary.exceptions.ReviewNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.ReviewRepository;
import com.skr.virtuallibrary.services.testData.ReviewTestDataBuilder;
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
    private ModelMapper modelMapper;

    private Review exampleReview;

    private ReviewDto exampleReviewDto;

    @BeforeEach
    final void setUp() {
        exampleReview = ReviewTestDataBuilder.reviewExample().review();
        exampleReviewDto = ReviewTestDataBuilder.reviewDtoExample().reviewDto();
    }

    @Test
    void findReviewById_shouldReturnReviewDto() {
        // given
        String idToFind = "foo";

        // when
        when(reviewRepository.findById(idToFind)).thenReturn(Optional.ofNullable(exampleReview));
        when(modelMapper.toReviewDto(exampleReview)).thenReturn(exampleReviewDto);

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
            when(modelMapper.toReviewDto(reviewsExamples.get(i)))
                    .thenReturn(reviewDtosExamples.get(i));
        }
        List<ReviewDto> expected = reviewDtosExamples;
        List<ReviewDto> actual = findReviewService.findAllReviews();

        // then
        assertEquals(expected, actual);
    }

}
