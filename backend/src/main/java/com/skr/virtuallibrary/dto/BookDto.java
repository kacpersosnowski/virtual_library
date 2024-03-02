package com.skr.virtuallibrary.dto;

import com.skr.virtuallibrary.entities.Genre;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    private String id;

    @NotEmpty(message = "Title is mandatory.")
    private String title;

    @NotEmpty(message = "Author name list is mandatory.")
    private List<AuthorDto> authorList;

    @NotEmpty(message = "Description is mandatory.")
    private String description;

    @NotEmpty(message = "Genre list is mandatory.")
    private List<Genre> genreList;

    @NotEmpty(message = "Tag list is mandatory.")
    private List<String> tagList;

    private String bookCoverId;

    private String bookContentId;

}
