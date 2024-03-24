package com.skr.virtuallibrary.controllers.requests;

import com.skr.virtuallibrary.validation.ValidPassword;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResetPasswordRequest {

    @NotEmpty
    private String username;

    @ValidPassword
    private String newPassword;

    @NotEmpty
    private String token;
}
