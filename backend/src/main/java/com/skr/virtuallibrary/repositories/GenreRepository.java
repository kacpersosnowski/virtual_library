package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GenreRepository extends MongoRepository<Genre, String> {

    Page<Genre> findAllByNameLikeIgnoreCase(String name, Pageable pageable);
}
