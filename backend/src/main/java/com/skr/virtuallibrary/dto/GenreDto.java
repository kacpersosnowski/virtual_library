package com.skr.virtuallibrary.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class GenreDto {

        private String id;

        @NotEmpty(message = "Genre name is mandatory.")
        private String name;

}
