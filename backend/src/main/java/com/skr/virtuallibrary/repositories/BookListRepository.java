package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.BookList;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookListRepository extends MongoRepository<BookList, String> {

    List<BookList> findAllByUserId(String userId);

    List<BookList> findAllByNameAndUserId(String name, String userId);
}
