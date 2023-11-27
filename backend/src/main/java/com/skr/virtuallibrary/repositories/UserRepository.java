package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
