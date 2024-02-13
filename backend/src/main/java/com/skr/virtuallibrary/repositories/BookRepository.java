package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.entities.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {

    List<Book> findAllByAuthorListContains(Author author);
}
