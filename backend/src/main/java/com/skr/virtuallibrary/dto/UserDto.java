package com.skr.virtuallibrary.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    private String id;

    @Email
    private String email;

    @NotEmpty
    private String password;

}
