package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.requests.ChangePasswordRequest;
import com.skr.virtuallibrary.controllers.requests.ResetPasswordRequest;
import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.SearchedUserDto;
import com.skr.virtuallibrary.dto.UpdateUserRequest;
import com.skr.virtuallibrary.dto.UserDto;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.exceptions.UserNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.services.FileService;
import com.skr.virtuallibrary.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

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

    @GetMapping("/{id}")
    @Operation(summary = "Get user profile by id.")
    public SearchedUserDto getUserById(@Parameter @PathVariable String id) {
        return userService.findById(id);
    }

    @GetMapping
    @Operation(summary = "Get and search for users.")
    public PagedResponse<SearchedUserDto> searchUsers(
            @PathParam("search") String search,
            @PathParam("page") Integer page
    ) {
        if (search != null && !search.isEmpty()) {
            String decodedSearch = URLDecoder.decode(search, StandardCharsets.UTF_8);
            if (page != null) {
                return userService.searchUsers(decodedSearch, page);
            }
            return userService.searchUsers(decodedSearch);
        }

        if (page != null) {
            return userService.findAllUsers(page);
        }
        return userService.findAllUsers();
    }

    @PutMapping
    @Operation(summary = "Update user.")
    public UserDto updateUser(
            @Valid @RequestPart("user") UpdateUserRequest request,
            @RequestPart(required = false, name = "profilePicture") MultipartFile profilePicture
    ) {
        if (profilePicture != null) {
            String profilePictureId = fileService.addFile(profilePicture, "image/", false);
            return userService.updateUser(request, profilePictureId);
        }
        return userService.updateUser(request, null);
    }

    @PatchMapping("/password")
    @Operation(summary = "Change user's password.")
    public UserDto changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        return userService.changePassword(request);
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Reset password.")
    public ResponseEntity<Object> resetPassword(@RequestBody @Email String email) {
        try {
            userService.resetPassword(email);
        } catch (UserNotFoundException e) {
            // pass
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/finalize-password-reset")
    @Operation(summary = "Change password.")
    public ResponseEntity<Object> changePassword(@Valid @RequestBody ResetPasswordRequest request) {
        userService.finalizePasswordReset(request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/profile-picture")
    @Operation(summary = "Delete profile picture.")
    public void deleteProfilePicture() {
        userService.deleteProfilePicture();
    }

}
