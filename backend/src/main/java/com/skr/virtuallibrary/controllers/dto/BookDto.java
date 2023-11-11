package com.skr.virtuallibrary.controllers.dto;

import com.skr.virtuallibrary.entities.enums.Genre;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookDto {

    private String id;

    @NotEmpty
    private String title;

    @NotEmpty
    private List<String> authorIdList;

    @NotEmpty
    private String shortDescription;

    @NotEmpty
    private String longDescription;

    @NotEmpty
    private List<Genre> genreList;

    @NotEmpty
    private List<String> tagList;

    private String cover;

}
