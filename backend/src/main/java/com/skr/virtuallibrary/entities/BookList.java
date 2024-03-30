package com.skr.virtuallibrary.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookList {

    @Id
    private String id;

    private String userId;

    private String name;

    private AuditData auditData;

    private List<String> bookIds;

    private boolean deletable;

}
