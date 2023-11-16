package com.skr.virtuallibrary.controllers.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthorDto {

    private String id;

    @NotEmpty(message = "First name is mandatory.")
    private String firstName;

    @NotEmpty(message = "Last name is mandatory.")
    private String lastName;

}
