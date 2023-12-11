package com.skr.virtuallibrary.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Genre {

        @Id
        private String id;

        private String name;

}
