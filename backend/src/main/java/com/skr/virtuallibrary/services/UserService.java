package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.controllers.requests.ResetPasswordRequest;
import com.skr.virtuallibrary.dto.UpdateUserRequest;
import com.skr.virtuallibrary.dto.UserDto;
import com.skr.virtuallibrary.entities.PasswordReset;
import com.skr.virtuallibrary.entities.UnregisteredUser;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.exceptions.UserNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.ResetPasswordRepository;
import com.skr.virtuallibrary.repositories.UnregisteredUserRepository;
import com.skr.virtuallibrary.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final UnregisteredUserRepository unregisteredUserRepository;

    private final ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;

    private final EmailService emailService;

    private final ResetPasswordRepository resetPasswordRepository;

    public UserDto changeLanguage(String userId, Language language) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User could not be found with id: " + userId));

        user.setLanguage(language);
        return modelMapper.toUserDto(userRepository.save(user));
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return findUserByUsername(authentication.getName());
    }

    public void addUser(User user) {
        checkIfUserExists(user);
        userRepository.save(user);
    }

    public void addUnregisteredUser(UnregisteredUser unregisteredUser) {
        String usersTempToken;
        do {
            usersTempToken = generateToken();
        } while (unregisteredUserRepository.findByRegistrationToken(usersTempToken).isPresent());

        unregisteredUser.setRegistrationToken(usersTempToken);
        unregisteredUserRepository.save(unregisteredUser);
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User could not be found with username: " + username));
    }

    public UnregisteredUser findUnregisteredUserByToken(String token) {
        return unregisteredUserRepository.findByRegistrationToken(token)
                .orElseThrow(() -> new UserNotFoundException("User could not be found with token: " + token));
    }

    public UserDto updateUser(UpdateUserRequest request, String profilePictureId) {
        User user = getCurrentUser();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setLanguage(request.getLanguage());
        if (profilePictureId != null) {
            user.setProfilePictureId(profilePictureId);
        }
        return modelMapper.toUserDto(userRepository.save(user));
    }

    public void deleteUnregisteredUser(UnregisteredUser unregisteredUser) {
        unregisteredUserRepository.delete(unregisteredUser);
    }

    public void checkIfUserExists(User user) {
        String username = user.getUsername();
        String email = user.getEmail();
        if (
                userRepository.findByUsername(username).isPresent() ||
                        unregisteredUserRepository.findByUsername(username).isPresent()
        ) {
            throw new UserNotFoundException("User already exists with username: " + username);
        }

        if (
                userRepository.findByEmail(email).isPresent() ||
                        unregisteredUserRepository.findByEmail(email).isPresent()
        ) {
            throw new UserNotFoundException("User already exists with email: " + email);
        }
    }

    public void resetPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User could not be found with email: " + email));

        String token = generateToken();
        LocalDateTime expirationDate = LocalDateTime.now().plusHours(2);
        PasswordReset passwordReset = PasswordReset.builder()
                .email(user.getEmail())
                .token(token)
                .expirationDate(expirationDate)
                .build();

        resetPasswordRepository.save(passwordReset);
        emailService.sendPasswordResetEmail(user.getLanguage(), user.getEmail(), token);
    }

    public void finalizePasswordReset(ResetPasswordRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User could not be found with username: " + request.getUsername()));
        PasswordReset passwordReset = resetPasswordRepository.findByEmail(request.getUsername())
                .orElseThrow(() -> new UserNotFoundException("This user didn't ask for password reset: " + request.getUsername()));

        if (!passwordReset.getToken().equals(request.getToken())) {
            throw new UserNotFoundException("Invalid token.");
        }
        if (passwordReset.getExpirationDate().isBefore(LocalDateTime.now())) {
            throw new UserNotFoundException("Token expired.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        resetPasswordRepository.delete(passwordReset);
    }

    private String generateToken() {
        UUID randomUUID = UUID.randomUUID();
        return randomUUID.toString().replace("-", "");
    }

}
