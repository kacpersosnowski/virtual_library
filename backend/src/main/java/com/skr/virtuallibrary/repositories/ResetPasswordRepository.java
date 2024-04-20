package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.ResetPassword;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ResetPasswordRepository extends MongoRepository<ResetPassword, String> {

    Optional<ResetPassword> findByToken(String token);

}
