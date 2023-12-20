package com.skr.virtuallibrary.auth;

import com.skr.virtuallibrary.entities.UnregisteredUser;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Authority;
import com.skr.virtuallibrary.exceptions.RegistrationExpiredException;
import com.skr.virtuallibrary.exceptions.UserAlreadyExistsException;
import com.skr.virtuallibrary.exceptions.UserNotFoundException;
import com.skr.virtuallibrary.repositories.UnregisteredUserRepository;
import com.skr.virtuallibrary.repositories.UserRepository;
import com.skr.virtuallibrary.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class AuthenticationService {

    private final UserRepository userRepository;

    private final UnregisteredUserRepository unregisteredUserRepository;

    private final EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists with email: " + registerRequest.getEmail());
        }
        final User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .authority(Authority.USER)
                .language(registerRequest.getLanguage())
                .build();
        userRepository.save(user);
        return generateToken(user);
    }

    public void createTempUserAndSendEmail(RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()
                || unregisteredUserRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists with email: " + registerRequest.getEmail());
        }

        String usersTempToken;
        do {
            usersTempToken = generateRegistrationToken();
        } while (unregisteredUserRepository.findByRegistrationToken(usersTempToken).isPresent());

        final UnregisteredUser temporaryUser = UnregisteredUser.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .language(registerRequest.getLanguage())
                .registrationToken(usersTempToken)
                .expirationDate(LocalDate.now().plusDays(2L))
                .build();
        unregisteredUserRepository.save(temporaryUser);
        emailService.sendAuthenticationEmail(registerRequest.getLanguage(), registerRequest.getEmail(), usersTempToken);
    }

    public AuthenticationResponse finaliseRegistration(String registrationToken) {
        UnregisteredUser tempUser = unregisteredUserRepository.findByRegistrationToken(registrationToken)
                .orElseThrow(() -> new UserNotFoundException("User with given token doesn't exist: " + registrationToken));

        if (LocalDate.now().isAfter(tempUser.getExpirationDate())) {
            unregisteredUserRepository.delete(tempUser);
            throw new RegistrationExpiredException("Registration token expired.");
        }

        final User user = User.builder()
                .email(tempUser.getEmail())
                .password(tempUser.getPassword())
                .authority(Authority.USER)
                .language(tempUser.getLanguage())
                .build();
        userRepository.save(user);
        unregisteredUserRepository.delete(tempUser);
        return generateToken(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()
                )
        );
        User user = userRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + authenticationRequest.getEmail()));
        return generateToken(user);
    }

    private AuthenticationResponse generateToken(User user) {
        final String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private String generateRegistrationToken() {
        UUID randomUUID = UUID.randomUUID();
        return randomUUID.toString().replace("-", "");
    }

}
