package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface GenreRepository extends MongoRepository<Genre, String> {

    Optional<Genre> findByName(String name);

    Page<Genre> findAllByNameLikeIgnoreCase(String name, Pageable pageable);

    List<Genre> findAllByNameLikeIgnoreCase(String name);

    Page<Genre> findAllByNameLikeIgnoreCase(Pageable pageable);

}
