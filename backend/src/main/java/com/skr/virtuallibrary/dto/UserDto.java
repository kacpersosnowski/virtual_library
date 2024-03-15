package com.skr.virtuallibrary.dto;

import com.skr.virtuallibrary.entities.enums.Authority;
import com.skr.virtuallibrary.entities.enums.Language;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String id;

    @NotEmpty
    private String username;

    @NotEmpty
    private String email;

    @NotNull
    private Authority authority;

    @NotNull
    private Language language;

}
