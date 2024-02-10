package com.skr.virtuallibrary.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class GenreDto {

        private String id;

        @NotEmpty(message = "Genre name is mandatory.")
        private String name;

}
