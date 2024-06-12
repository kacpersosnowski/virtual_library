package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.repositories.AuthorRepository;
import com.skr.virtuallibrary.repositories.BookRepository;
import com.skr.virtuallibrary.repositories.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final BookRepository bookRepository;

    private final AuthorRepository authorRepository;

    private final GenreRepository genreRepository;

    public Map<String, Long> getAllStatistics() {
        return Map.of(
                "booksCount", bookRepository.count(),
                "authorsCount", authorRepository.count(),
                "genresCount", genreRepository.count()
        );
    }
}
