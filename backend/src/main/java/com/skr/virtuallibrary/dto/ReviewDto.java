package com.skr.virtuallibrary.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReviewDto {

    private String id;

    private String title;

    @NotEmpty(message = "Content is mandatory.")
    private String content;

    @NotNull(message = "Rating is mandatory.")
    private Integer rating;

    private UserDto author;

    @NotNull(message = "Book is mandatory.")
    private BookDto book;

    private LocalDate date;
}
