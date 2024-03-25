package com.skr.virtuallibrary.controllers.requests;

import com.skr.virtuallibrary.validation.ValidPassword;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {

    @NotEmpty
    String oldPassword;

    @ValidPassword
    String newPassword;

}
