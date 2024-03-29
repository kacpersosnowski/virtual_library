package com.skr.virtuallibrary.dto;

import com.skr.virtuallibrary.entities.enums.Language;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateUserRequest {

    private String firstName;

    private String lastName;

    @NotEmpty
    private String email;

    @NotNull
    private Language language;

}
