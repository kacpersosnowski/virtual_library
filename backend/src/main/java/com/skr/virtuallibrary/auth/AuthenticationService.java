package com.skr.virtuallibrary.auth;

import com.skr.virtuallibrary.entities.UnregisteredUser;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Authority;
import com.skr.virtuallibrary.exceptions.TokenExpiredException;
import com.skr.virtuallibrary.services.EmailService;
import com.skr.virtuallibrary.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class AuthenticationService {

    private final UserService userService;

    private final JwtService jwtService;

    private final EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        final User user = User.builder()
                .username(registerRequest.getUsername())
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .authority(Authority.USER)
                .language(registerRequest.getLanguage())
                .build();
        userService.addUser(user);
        return jwtService.generateTokens(user);
    }

    public void createTempUserAndSendEmail(RegisterRequest registerRequest) {
        final UnregisteredUser temporaryUser = UnregisteredUser.builder()
                .username(registerRequest.getUsername())
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .language(registerRequest.getLanguage())
                .expirationDate(LocalDate.now().plusDays(2L))
                .build();
        userService.addUnregisteredUser(temporaryUser);
        emailService.sendAuthenticationEmail(temporaryUser.getLanguage(), temporaryUser.getEmail(), temporaryUser.getRegistrationToken());
    }

    public AuthenticationResponse finaliseRegistration(String registrationToken) {
        UnregisteredUser tempUser = userService.findUnregisteredUserByToken(registrationToken);

        if (LocalDate.now().isAfter(tempUser.getExpirationDate())) {
            userService.deleteUnregisteredUser(tempUser);
            throw new TokenExpiredException("Registration token expired.");
        }

        final User user = User.builder()
                .username(tempUser.getUsername())
                .firstName(tempUser.getFirstName())
                .lastName(tempUser.getLastName())
                .email(tempUser.getEmail())
                .password(tempUser.getPassword())
                .authority(Authority.USER)
                .language(tempUser.getLanguage())
                .build();
        userService.addUser(user);
        userService.deleteUnregisteredUser(tempUser);
        return jwtService.generateTokens(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        User user = userService.findUserByUsername(authenticationRequest.getUsername());
        return jwtService.generateTokens(user);
    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String username = jwtService.extractUsername(refreshTokenRequest.getRefreshToken());
        User user = userService.findUserByUsername(username);
        return jwtService.generateTokens(user);
    }

}
