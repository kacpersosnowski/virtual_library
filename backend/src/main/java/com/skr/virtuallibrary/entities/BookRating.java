package com.skr.virtuallibrary.entities;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document
public class BookRating {

    @Id
    private String id;

    private String bookId;

    private int rateCount;

    private double rateAverage;

}
