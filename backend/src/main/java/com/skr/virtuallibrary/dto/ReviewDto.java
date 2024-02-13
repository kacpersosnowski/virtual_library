package com.skr.virtuallibrary.dto;

import com.skr.virtuallibrary.validation.ValidRating;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
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
