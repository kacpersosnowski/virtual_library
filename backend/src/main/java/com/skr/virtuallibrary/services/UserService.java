package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.UserDto;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.exceptions.UserNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    public UserDto changeLanguage(String userId, Language language) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User could not be found with id: " + userId));

        user.setLanguage(language);
        return modelMapper.toUserDto(userRepository.save(user));
    }

    public UserDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UserNotFoundException("User could not be found with email: " + authentication.getName()));
        return modelMapper.toUserDto(user);
    }
}
