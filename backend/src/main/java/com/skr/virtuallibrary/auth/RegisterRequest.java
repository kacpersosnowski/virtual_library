package com.skr.virtuallibrary.auth;

import com.skr.virtuallibrary.entities.enums.Language;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
public class RegisterRequest {

    @Email
    private String email;

    @NotEmpty
    private String password;

    @NotNull
    private Language language;

}
