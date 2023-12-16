package com.skr.virtuallibrary.auth;

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
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/quick-register")
    public AuthenticationResponse registerUserQuickly(@Valid @RequestBody RegisterRequest registerRequest) {
        return authenticationService.register(registerRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        authenticationService.createTempUserAndSendEmail(registerRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/finalize-registration")
    public AuthenticationResponse confirmRegistration(@Valid @RequestBody String registrationToken) {
        return authenticationService.finaliseRegistration(registrationToken);
    }

    @PostMapping("/login")
    public AuthenticationResponse authenticateUser(@Valid @RequestBody AuthenticationRequest authenticationRequest) {
        return authenticationService.authenticate(authenticationRequest);
    }

}
