package com.skr.virtuallibrary.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    private String id;

    private AuditData auditData;

    private String title;

    private String content;

    private int rating;

    private User author;

    private Book book;

}
