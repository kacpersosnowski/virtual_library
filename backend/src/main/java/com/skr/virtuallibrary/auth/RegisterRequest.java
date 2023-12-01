package com.skr.virtuallibrary.auth;

import lombok.*;

@Data
@Builder
public class RegisterRequest {

    private String email;

    private String password;

}
