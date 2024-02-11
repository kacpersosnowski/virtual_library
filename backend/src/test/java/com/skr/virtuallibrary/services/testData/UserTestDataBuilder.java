package com.skr.virtuallibrary.services.testData;

import com.skr.virtuallibrary.dto.UserDto;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Authority;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.services.testData.records.UserDtoExample;
import com.skr.virtuallibrary.services.testData.records.UserExample;

public class UserTestDataBuilder {

    private UserTestDataBuilder() {
    }

    public static UserExample userExample() {
        String userId = "foo";

        User user = User.builder()
                .id(userId)
                .email("email@example.com")
                .password("Password123!")
                .authority(Authority.USER)
                .language(Language.ENG)
                .build();

        return new UserExample(user);
    }

    public static UserDtoExample userDtoExample() {
        String userDtoId = "foo";

        UserDto userDto = UserDto.builder()
                .id(userDtoId)
                .email("email@example.com")
                .authority(Authority.USER)
                .language(Language.ENG)
                .build();

        return new UserDtoExample(userDto);
    }
}
