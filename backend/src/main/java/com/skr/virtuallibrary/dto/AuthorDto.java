package com.skr.virtuallibrary.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class AuthorDto {

    private String id;

    @NotEmpty(message = "First name is mandatory.")
    private String firstName;

    @NotEmpty(message = "Last name is mandatory.")
    private String lastName;

}
