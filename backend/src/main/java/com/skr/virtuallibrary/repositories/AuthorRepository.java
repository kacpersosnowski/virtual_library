package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.Author;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuthorRepository extends MongoRepository<Author, String> {
}
