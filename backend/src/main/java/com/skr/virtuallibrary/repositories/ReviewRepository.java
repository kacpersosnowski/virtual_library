package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository extends MongoRepository<Review, String> {
}
