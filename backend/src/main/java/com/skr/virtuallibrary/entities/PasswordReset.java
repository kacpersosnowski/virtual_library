package com.skr.virtuallibrary.entities;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PasswordReset {

    private String email;

    private String token;

    private LocalDateTime expirationDate;

}
