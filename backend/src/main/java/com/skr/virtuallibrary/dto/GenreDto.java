package com.skr.virtuallibrary.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GenreDto {

    private String id;

    @NotEmpty(message = "Genre name is mandatory.")
    private String name;

}
