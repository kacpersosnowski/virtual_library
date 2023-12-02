package com.skr.virtuallibrary.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@Builder
public class AuthenticationRequest {

    @Email
    private String email;

    @NotEmpty
    private String password;

}
