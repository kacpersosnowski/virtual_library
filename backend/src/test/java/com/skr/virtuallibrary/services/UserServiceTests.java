package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.UserDto;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.UserRepository;
import com.skr.virtuallibrary.services.testData.UserTestDataBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {UserRepository.class})
public class UserServiceTests {

    public static final String USERNAME = "email@example.com";
    public static final String PASSWORD = "Password123!";
    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    private User exampleUser;

    private UserDto exampleUserDto;

    @BeforeEach
    final void setUp() {
        exampleUser = UserTestDataBuilder.userExample().user();
        exampleUserDto = UserTestDataBuilder.userDtoExample().userDto();
    }

    @Test
    void changeLanguage_shouldReturnUserDto() {
        // given
        String userId = "foo";
        Language language = Language.PL;

        // when
        when(userRepository.findById(userId)).thenReturn(Optional.ofNullable(exampleUser));
        when(userRepository.save(exampleUser)).thenReturn(exampleUser);
        when(modelMapper.toUserDto(exampleUser)).thenReturn(exampleUserDto);
        UserDto expected = exampleUserDto;
        UserDto actual = userService.changeLanguage(userId, language);

        // then
        assertEquals(expected, actual);
    }

    @Test
    @WithMockUser(username = USERNAME, password = PASSWORD)
    void getCurrentUser_shouldReturnUser() {
        // given

        // when
        when(userRepository.findByUsername(USERNAME)).thenReturn(Optional.ofNullable(exampleUser));
        User expected = exampleUser;
        User actual = userService.getCurrentUser();

        // then
        assertEquals(expected, actual);
    }
}
