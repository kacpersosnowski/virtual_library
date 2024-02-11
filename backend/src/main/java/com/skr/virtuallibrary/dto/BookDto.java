package com.skr.virtuallibrary.dto;

import com.skr.virtuallibrary.entities.Genre;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    private String id;

    @NotEmpty(message = "Title is mandatory.")
    private String title;

    @NotEmpty(message = "Author name list is mandatory.")
    private List<AuthorDto> authorList;

    @NotEmpty(message = "Short description is mandatory.")
    private String shortDescription;

    @NotEmpty(message = "Long description is mandatory.")
    private String longDescription;

    @NotEmpty(message = "Genre list is mandatory.")
    private List<Genre> genreList;

    @NotEmpty(message = "Tag list is mandatory.")
    private List<String> tagList;

    private String bookCoverId;

    private String bookContentId;

}
