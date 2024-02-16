package com.skr.virtuallibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookRating {

    private String bookId;

    private int rateCount;

    private double rateMean;

}
