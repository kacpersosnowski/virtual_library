package com.skr.virtuallibrary.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public class AuthorDto {

    private String id;

    @NotEmpty(message = "First name is mandatory.")
    private String firstName;

    @NotEmpty(message = "Last name is mandatory.")
    private String lastName;

}
