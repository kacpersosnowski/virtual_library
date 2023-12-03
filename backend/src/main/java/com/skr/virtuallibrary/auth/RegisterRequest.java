package com.skr.virtuallibrary.auth;

import com.skr.virtuallibrary.entities.enums.Language;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
public class RegisterRequest {

    @Email(message = "Email should be valid")
    private String email;

    @NotEmpty(message = "Password should not be empty")
    private String password;

    @NotNull(message = "Language should not be null")
    private Language language;

}
