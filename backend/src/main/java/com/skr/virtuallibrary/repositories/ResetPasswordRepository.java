package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.PasswordReset;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ResetPasswordRepository extends MongoRepository<PasswordReset, String> {

    Optional<PasswordReset> findByUsername(String username);

}
