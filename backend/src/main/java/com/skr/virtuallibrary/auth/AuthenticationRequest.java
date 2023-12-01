package com.skr.virtuallibrary.auth;

import lombok.*;

@Data
@Builder
public class AuthenticationRequest {

    private String email;

    private String password;

}
