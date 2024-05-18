package com.skr.virtuallibrary.dto;

import com.skr.virtuallibrary.entities.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchedUserDto {

    private String id;

    private String username;

    private String firstName;

    private String lastName;

    private Language language;

    private String profilePictureId;

}
