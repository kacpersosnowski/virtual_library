package com.skr.virtuallibrary.controllers.requests;

import com.skr.virtuallibrary.validation.ValidPassword;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordRequest {

    @ValidPassword
    private String newPassword;

    @NotEmpty
    private String token;

}
