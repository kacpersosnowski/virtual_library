package com.skr.virtuallibrary.dto;

import com.skr.virtuallibrary.validation.ValidRating;
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

    @ValidRating
    private Integer rating;

    private UserDto author;

    @NotEmpty(message = "BookId is mandatory.")
    private String bookId;

    private LocalDate created;

    private LocalDate lastModified;

}
