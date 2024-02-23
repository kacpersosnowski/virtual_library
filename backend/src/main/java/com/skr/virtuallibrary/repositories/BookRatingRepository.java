package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.BookRating;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BookRatingRepository extends MongoRepository<BookRating, String> {

    Optional<BookRating> findByBookId(String bookId);

}
