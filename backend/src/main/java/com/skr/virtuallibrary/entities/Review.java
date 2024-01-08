package com.skr.virtuallibrary.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
public class Review {

    @Id
    private String id;

    private String title;

    private String content;

    private int rating;

    private User author;

    private Book reviewTarget;
}
