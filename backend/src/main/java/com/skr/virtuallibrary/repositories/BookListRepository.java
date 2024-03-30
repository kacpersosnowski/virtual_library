package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.BookList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookListRepository extends MongoRepository<BookList, String> {
}
