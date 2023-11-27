package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.UserDto;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final ModelMapper modelMapper;

    private final UserRepository userRepository;

    public UserDto addUser(UserDto userDto) {
        return saveUser(userDto);
    }

    private UserDto saveUser(UserDto userDto) {
        User user = modelMapper.toUser(userDto);
        return modelMapper.toUserDto(userRepository.save(user));
    }

}
