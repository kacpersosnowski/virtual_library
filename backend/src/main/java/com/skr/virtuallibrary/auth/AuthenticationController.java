package com.skr.virtuallibrary.auth;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Auth management APIs")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/quick-register")
    @Operation(summary = "Register user without email authentication.")
    public AuthenticationResponse registerUserQuickly(@Valid @RequestBody RegisterRequest registerRequest) {
        return authenticationService.register(registerRequest);
    }

    @PostMapping("/register")
    @Operation(summary = "Register user and sent authentication email.")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        authenticationService.createTempUserAndSendEmail(registerRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/finalize-registration")
    @Operation(summary = "Confirm authentication and activate account.")
    public AuthenticationResponse confirmRegistration(@Valid @RequestBody String registrationToken) {
        return authenticationService.finaliseRegistration(registrationToken);
    }

    @PostMapping("/login")
    @Operation(summary = "Login user.")
    public AuthenticationResponse authenticateUser(@Valid @RequestBody AuthenticationRequest authenticationRequest) {
        return authenticationService.authenticate(authenticationRequest);
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Refresh authentication token.")
    public AuthenticationResponse refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authenticationService.refreshToken(refreshTokenRequest);
    }

}
