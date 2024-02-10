package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository extends MongoRepository<Review, String> {

    Page<Review> findAllByBookId(String bookId, Pageable pageable);

}
