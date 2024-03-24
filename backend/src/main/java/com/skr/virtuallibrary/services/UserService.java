package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.UpdateUserRequest;
import com.skr.virtuallibrary.dto.UserDto;
import com.skr.virtuallibrary.entities.UnregisteredUser;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.exceptions.UserNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.UnregisteredUserRepository;
import com.skr.virtuallibrary.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final UnregisteredUserRepository unregisteredUserRepository;

    private final ModelMapper modelMapper;

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
        userRepository.save(user);
    }

    public void addUnregisteredUser(UnregisteredUser unregisteredUser) {
        checkIfUserExists(unregisteredUser);
        String usersTempToken;
        do {
            usersTempToken = generateRegistrationToken();
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

    private String generateRegistrationToken() {
        UUID randomUUID = UUID.randomUUID();
        return randomUUID.toString().replace("-", "");
    }

}
