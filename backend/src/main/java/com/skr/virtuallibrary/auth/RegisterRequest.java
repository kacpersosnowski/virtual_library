package com.skr.virtuallibrary.auth;

import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.validation.ValidPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {

    @NotEmpty
    private String username;

    private String firstName;

    private String lastName;

    @Email(message = "Email should be valid")
    private String email;

    @ValidPassword
    private String password;

    @NotNull(message = "Language should not be null")
    private Language language;

}
