package com.skr.virtuallibrary.entities;

import com.skr.virtuallibrary.entities.enums.Language;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    private String id;

    private String title;

    private AuditData auditData;

    private List<Author> authorList;

    private String description;

    private List<Genre> genreList;

    private List<String> tagList;

    private Language language;

    private String bookCoverId;

    private String bookContentId;

    private int rateCount = 0;

    private double rateAverage = 0;

}
