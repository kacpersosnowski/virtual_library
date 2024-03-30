package com.skr.virtuallibrary.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookListDto {

    private String id;

    private String userId;

    @NotEmpty
    private String name;

    @NotNull
    private List<String> bookIds;

    private LocalDateTime createdDate;

    private LocalDateTime lastEditedDate;

}
