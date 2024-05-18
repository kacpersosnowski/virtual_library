package com.skr.virtuallibrary.entities;

import com.skr.virtuallibrary.entities.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@SuperBuilder
@Document
@NoArgsConstructor
@AllArgsConstructor
public class UnregisteredUser {

    @Id
    private String id;

    private String username;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private Language language;

    private String registrationToken;

    private LocalDate expirationDate;

    private boolean publicAccount;

}
