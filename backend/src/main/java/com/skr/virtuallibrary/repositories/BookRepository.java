package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRepository extends MongoRepository<Book, String> {
}
