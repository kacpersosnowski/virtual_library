package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.Genre;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GenreRepository extends MongoRepository<Genre, String> {

    Optional<Genre> findByName(String name);

    Optional<Genre> findByNameIgnoreCase(String name);

}
