package com.skr.virtuallibrary.dto;

import com.skr.virtuallibrary.entities.enums.Genre;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
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

    private String cover;

}
