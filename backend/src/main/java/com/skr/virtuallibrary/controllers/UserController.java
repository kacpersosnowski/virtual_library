package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.requests.ChangePasswordRequest;
import com.skr.virtuallibrary.dto.UpdateUserRequest;
import com.skr.virtuallibrary.dto.UserDto;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.services.FileService;
import com.skr.virtuallibrary.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/users")
@Tag(name = "Users", description = "Users management APIs")
public class UserController {

    private final UserService userService;

    private final FileService fileService;

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

    @PutMapping
    @Operation(summary = "Update user.")
    public UserDto updateUser(
            @Valid @RequestPart("user") UpdateUserRequest request,
            @RequestPart(required = false, name = "profilePicture") MultipartFile profilePicture
    ) {
        if (profilePicture != null) {
            String profilePictureId = fileService.addFile(profilePicture, "image/png");
            return userService.updateUser(request, profilePictureId);
        }
        return userService.updateUser(request, null);
    }

    @PatchMapping("/password")
    @Operation(summary = "Change user's password.")
    public UserDto changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        return userService.changePassword(request);
    }
}
