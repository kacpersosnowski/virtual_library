package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.dto.UserDto;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/users")
@Tag(name = "Users", description = "Users management APIs")
public class UserController {

    private final UserService userService;

    private final ModelMapper modelMapper;

    @PatchMapping("/language/{id}")
    @Operation(summary = "Change language of user with specified id.")
    public UserDto changeLanguage(@Parameter @PathVariable String id, @Valid @RequestBody Language language) {
        return userService.changeLanguage(id, language);
    }

    @GetMapping("/me")
    @Operation(summary = "Get current user.")
    public UserDto getCurrentUser() {
        return modelMapper.toUserDto(userService.getCurrentUser());
    }

    @PatchMapping("/login/{id}")
    @Operation(summary = "Change user's login.")
    public UserDto changeLogin(@Parameter @PathVariable String id, @Valid @RequestBody String login) {
        return userService.changeLogin(id, login);
    }
}
