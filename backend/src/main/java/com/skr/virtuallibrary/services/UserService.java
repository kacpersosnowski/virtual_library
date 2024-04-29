package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.controllers.requests.ChangePasswordRequest;
import com.skr.virtuallibrary.controllers.requests.ResetPasswordRequest;
import com.skr.virtuallibrary.dto.UpdateUserRequest;
import com.skr.virtuallibrary.dto.UserDto;
import com.skr.virtuallibrary.entities.BookList;
import com.skr.virtuallibrary.entities.ResetPassword;
import com.skr.virtuallibrary.entities.UnregisteredUser;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.exceptions.PasswordIncorrectException;
import com.skr.virtuallibrary.exceptions.ResetPasswordNotFoundException;
import com.skr.virtuallibrary.exceptions.TokenExpiredException;
import com.skr.virtuallibrary.exceptions.UserNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.BookListRepository;
import com.skr.virtuallibrary.repositories.ResetPasswordRepository;
import com.skr.virtuallibrary.repositories.UnregisteredUserRepository;
import com.skr.virtuallibrary.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final UnregisteredUserRepository unregisteredUserRepository;

    private final BookListRepository bookListRepository;

    private final ModelMapper modelMapper;

    public static final String USER_NOT_FOUND_MSG = "User could not be found with id: ";

    private final PasswordEncoder passwordEncoder;

    private final EmailService emailService;

    private final ResetPasswordRepository resetPasswordRepository;

    public UserDto changeLanguage(String userId, Language language) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND_MSG + userId));

        user.setLanguage(language);
        return modelMapper.toUserDto(userRepository.save(user));
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return findUserByUsername(authentication.getName());
    }

    public void addUser(User user) {
        User newUser = userRepository.save(user);
        createToReadList(newUser);
    }

    public void addUnregisteredUser(UnregisteredUser unregisteredUser) {
        checkIfUserExists(unregisteredUser);
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

    public void checkIfUserExists(UnregisteredUser user) {
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

    public UserDto changePassword(ChangePasswordRequest request) {
        User user = getCurrentUser();
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new PasswordIncorrectException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        return modelMapper.toUserDto(userRepository.save(user));
    }

    public void resetPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User could not be found with email: " + email));

        String token = generateToken();
        while (resetPasswordRepository.findByToken(token).isPresent()) {
            token = generateToken();
        }
        LocalDateTime expirationDate = LocalDateTime.now().plusHours(2);
        ResetPassword resetPassword = ResetPassword.builder()
                .username(user.getUsername())
                .token(token)
                .expirationDate(expirationDate)
                .build();

        resetPasswordRepository.save(resetPassword);
        emailService.sendPasswordResetEmail(user.getLanguage(), user.getEmail(), token);
    }

    public void finalizePasswordReset(ResetPasswordRequest request) {
        ResetPassword resetPassword = resetPasswordRepository.findByToken(request.getToken())
                .orElseThrow(ResetPasswordNotFoundException::new);
        User user = userRepository.findByUsername(resetPassword.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User could not be found with username: " + resetPassword.getUsername()));

        if (resetPassword.getExpirationDate().isBefore(LocalDateTime.now())) {
            resetPasswordRepository.delete(resetPassword);
            throw new TokenExpiredException("Token expired.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        resetPasswordRepository.delete(resetPassword);
    }

    public void deleteProfilePicture() {
        User user = getCurrentUser();
        user.setProfilePictureId(null);
        userRepository.save(user);
    }

    private String generateToken() {
        UUID randomUUID = UUID.randomUUID();
        return randomUUID.toString().replace("-", "");
    }

    public void createToReadList(User user) {
        BookList bookList = BookList.builder()
                .userId(user.getId())
                .name(toReadListName(user))
                .editable(false)
                .bookIds(List.of())
                .build();
        bookListRepository.save(bookList);
    }

    private String toReadListName(User user) {
        return user.getLanguage().equals(Language.PL) ? "Do przeczytania" : "To Read";
    }
}
