package com.skr.virtuallibrary.auth;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class RefreshTokenRequest {

    @NotEmpty(message = "Refresh token should not be empty")
    private String refreshToken;

}
