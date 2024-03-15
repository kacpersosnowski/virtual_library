package com.skr.virtuallibrary.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skr.virtuallibrary.auth.JwtService;
import com.skr.virtuallibrary.dto.UserDto;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.services.UserService;
import org.assertj.core.api.Assertions;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.instancio.Select.field;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private ModelMapper modelMapper;

    @Test
    void testChangeLanguage() throws Exception {
        UserDto userDto = Instancio.of(UserDto.class).set(field(UserDto::getLanguage), Language.PL).create();
        UserDto userDtoEng = Instancio.of(UserDto.class).set(field(UserDto::getId), userDto.getId()).set(field(UserDto::getLanguage), Language.ENG).create();

        when(userService.changeLanguage(any(), any())).thenReturn(userDtoEng);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.patch("/users/language/{id}", userDto.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Language.ENG)))
                .andReturn();
        UserDto actualUserDto = objectMapper.readValue(result.getResponse().getContentAsString(), UserDto.class);

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualUserDto).usingRecursiveComparison().isEqualTo(userDtoEng);
    }

    @Test
    void testGetCurrentUser() throws Exception {
        User user = Instancio.create(User.class);
        UserDto userDto = Instancio.create(UserDto.class);

        when(userService.getCurrentUser()).thenReturn(user);
        when(modelMapper.toUserDto(user)).thenReturn(userDto);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/users/me")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        UserDto actualUserDto = objectMapper.readValue(result.getResponse().getContentAsString(), UserDto.class);

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualUserDto).usingRecursiveComparison().isEqualTo(userDto);
    }

}
