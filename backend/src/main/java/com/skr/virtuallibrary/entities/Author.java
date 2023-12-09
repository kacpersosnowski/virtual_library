package com.skr.virtuallibrary.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
@SuperBuilder
public class Author {

    @Id
    private String id;

    private String firstName;

    private String lastName;

}
