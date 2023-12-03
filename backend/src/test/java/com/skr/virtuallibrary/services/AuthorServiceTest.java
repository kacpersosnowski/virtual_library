package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.exceptions.AuthorNotFoundException;
import com.skr.virtuallibrary.repositories.AuthorRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@Slf4j
class AuthorServiceTest {

    @InjectMocks
    private AuthorService authorService;

    @Mock
    private AuthorRepository authorRepository;

    @Test
    void findAuthorById() {
    }

    @Test
    void findAllAuthors_shouldReturnAuthorsList() {
    }

    @Test
    void addAuthor() {
    }

    @Test
    void deleteAuthor_shouldDeleteAuthor() {
    }

    @Test
    void deleteAuthor_shouldReturnException() {
        String authorId = "foo";

        when(authorRepository.findById(authorId)).thenThrow(new ResponseStatusException(HttpStatus.NOT_FOUND));

        assertThrows(AuthorNotFoundException.class, () -> authorService.deleteAuthor(authorId));
    }

    @Test
    void updateAuthor() {
    }
}