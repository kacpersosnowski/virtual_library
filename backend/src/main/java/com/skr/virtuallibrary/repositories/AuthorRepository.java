package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.Author;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AuthorRepository extends MongoRepository<Author, String> {

    Optional<Author> findByFirstNameAndLastName(String firstName, String lastName);

}
