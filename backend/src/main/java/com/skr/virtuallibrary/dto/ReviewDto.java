package com.skr.virtuallibrary.dto;

import com.skr.virtuallibrary.validation.ValidRating;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
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

    private LocalDateTime created;

    private LocalDateTime lastModified;

}
