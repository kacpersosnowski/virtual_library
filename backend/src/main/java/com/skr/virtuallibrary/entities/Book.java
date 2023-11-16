package com.skr.virtuallibrary.entities;

import com.skr.virtuallibrary.entities.enums.Genre;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document
public class Book {

    @Id
    private String id;

    private String title;

    private List<Author> authorList;

    private String shortDescription;

    private String longDescription;

    private List<Genre> genreList;

    private List<String> tagList;

    private Binary cover;

}
