package com.skr.virtuallibrary.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    private String id;

    private String title;

    private AuditData auditData;

    private List<Author> authorList;

    private String shortDescription;

    private String longDescription;

    private List<Genre> genreList;

    private List<String> tagList;

    private String bookCoverId;

    private String bookContentId;

}
