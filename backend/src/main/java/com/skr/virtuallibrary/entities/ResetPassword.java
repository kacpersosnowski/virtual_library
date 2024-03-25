package com.skr.virtuallibrary.entities;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResetPassword {

    @Id
    private String id;

    private String username;

    private String token;

    private LocalDateTime expirationDate;

}
