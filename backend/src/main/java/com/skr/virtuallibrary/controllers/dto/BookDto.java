package com.skr.virtuallibrary.controllers.dto;

import com.skr.virtuallibrary.entities.enums.Genre;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.Binary;

import java.util.List;

@Getter
@Setter
public class BookDto {

    private String title;

    private String authorId;

    private String shortDescription;

    private String longDescription;

    private List<Genre> genreList;

    private List<String> tagList;

    private Binary cover;
}
