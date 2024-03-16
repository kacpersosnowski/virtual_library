package com.skr.virtuallibrary.repositories;

import com.skr.virtuallibrary.entities.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {

    List<Book> findAllByAuthorIdListContains(String authorId);

    List<Book> findAllByGenreIdListContains(String genreId);

    Page<Book> findAllByGenreIdListContains(String genreId, Pageable pageable);

    int countByGenreIdListContains(String genreId);

    List<Book> findTop10ByOrderByRateAverageDesc();

    List<Book> findTop10ByOrderByRateCountDesc();

}
