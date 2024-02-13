package com.skr.virtuallibrary.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthorDto {

    private String id;

    @NotEmpty(message = "First name is mandatory.")
    private String firstName;

    @NotEmpty(message = "Last name is mandatory.")
    private String lastName;

}
