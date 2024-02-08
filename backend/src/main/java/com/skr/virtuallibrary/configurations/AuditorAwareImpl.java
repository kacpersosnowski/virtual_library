package com.skr.virtuallibrary.configurations;

import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.exceptions.UserNotFoundException;
import com.skr.virtuallibrary.repositories.UserRepository;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<User> {

    private final UserRepository userRepository;    //FIXME: resolve problems

    @Override
    public Optional<User> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UserNotFoundException("User could not be found with email: " + authentication.getName()));
        return user != null ? Optional.of(user) : Optional.empty();
    }
}
