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
public class Author {

    @Id
    private String id;

    private AuditData auditData;

    private String firstName;

    private String lastName;

}
