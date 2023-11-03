package com.skr.virtuallibrary.controllers.dto;

import com.skr.virtuallibrary.entities.enums.Genre;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.Binary;

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

    @NotNull
    private Binary cover;

}
