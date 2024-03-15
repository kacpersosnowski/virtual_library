package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.UnregisteredUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UnregisteredUserRepository extends MongoRepository<UnregisteredUser, String> {

    Optional<UnregisteredUser> findByUsername(String username);

    Optional<UnregisteredUser> findByEmail(String email);

    Optional<UnregisteredUser> findByRegistrationToken(String token);

}
