package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.entities.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {

    List<Book> findAllByAuthorListContains(Author author);

    List<Book> findAllByGenreListContains(Genre genre);

    Page<Book> findAllByGenreListContains(Genre genre, Pageable pageable);

    int countByGenreListContains(Genre genre);

}
