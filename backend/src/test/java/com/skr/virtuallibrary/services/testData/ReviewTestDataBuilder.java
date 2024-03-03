package com.skr.virtuallibrary.services.testData;

import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.entities.AuditData;
import com.skr.virtuallibrary.entities.Review;
import com.skr.virtuallibrary.services.testData.records.ReviewDtoExample;
import com.skr.virtuallibrary.services.testData.records.ReviewExample;

import java.time.LocalDateTime;
import java.util.List;

public class ReviewTestDataBuilder {

    private ReviewTestDataBuilder() {
    }

    public static ReviewExample reviewExample() {
        String reviewId = "foo";

        Review review = Review.builder()
                .id(reviewId)
                .title("exampleTitle")
                .content("exampleContent")
                .rating(5)
                .bookId(BookTestDataBuilder.bookExample().book().getId())
                .authorId(UserTestDataBuilder.userExample().user().getId())
                .auditData(AuditData.builder()
                        .createdBy(UserTestDataBuilder.userExample().user().getId())
                        .createdDate(LocalDateTime.MIN)
                        .lastModifiedBy(UserTestDataBuilder.userExample().user().getId())
                        .lastModifiedDate(LocalDateTime.MIN)
                        .build())
                .build();

        return new ReviewExample(review);
    }

    public static ReviewDtoExample reviewDtoExample() {
        String reviewDtoId = "foo";

        ReviewDto reviewDto = ReviewDto.builder()
                .id(reviewDtoId)
                .title("exampleTitle")
                .content("exampleContent")
                .rating(5)
                .bookId(BookTestDataBuilder.bookExample().book().getId())
                .author(UserTestDataBuilder.userDtoExample().userDto())
                .created(LocalDateTime.MIN)
                .lastModified(LocalDateTime.MIN)
                .build();

        return new ReviewDtoExample(reviewDto);
    }

    public static List<Review> exampleReviewList() {
        JsonResourceBuilder jsonDataBuilder = new JsonResourceBuilder();
        return jsonDataBuilder.loadModelList("services/reviews.json", Review.class);
    }

    public static List<ReviewDto> exampleReviewDtoList() {
        JsonResourceBuilder jsonDataBuilder = new JsonResourceBuilder();
        return jsonDataBuilder.loadModelList("services/reviewDtos.json", ReviewDto.class);
    }
}
