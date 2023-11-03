package com.skr.virtuallibrary.controllers.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthorDto {

    private String id;

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

}
