package com.skr.virtuallibrary.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BookRatingDto {

    private String id;

    private String bookId;

    private int rateCount;

    private double rateAverage;

}
