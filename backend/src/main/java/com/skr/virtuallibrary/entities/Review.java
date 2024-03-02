package com.skr.virtuallibrary.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
@Builder
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

    private String bookId;

}
