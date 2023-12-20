package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Language;
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

    @PatchMapping("/language/{id}")
    @Operation(summary = "Change language of user with specified id.")
    public User changeLanguage(@Parameter @PathVariable String id, @Valid @RequestBody Language language) {
        return userService.changeLanguage(id, language);
    }
}
