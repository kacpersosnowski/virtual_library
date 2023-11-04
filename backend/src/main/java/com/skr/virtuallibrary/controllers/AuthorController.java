package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.dto.AuthorDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.exceptions.AuthorNotFoundException;
import com.skr.virtuallibrary.services.AuthorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/authors")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

    private final ModelMapper modelMapper;

    @GetMapping("/{id}")
    public ResponseEntity<AuthorDto> findAuthorById(@PathVariable String id) {
        try {
            AuthorDto authorDto = convertToDto(authorService.findAuthorById(id));
            return ResponseEntity.ok(authorDto);
        } catch (AuthorNotFoundException ex) {
            log.error("Failed to find author: ", ex);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<AuthorDto>> findAllAuthors() {
        List<AuthorDto> authorDtoList = authorService.findAllAuthors().stream().map(this::convertToDto).toList();
        return ResponseEntity.ok(authorDtoList);
    }

    @PostMapping
    public ResponseEntity<AuthorDto> addAuthor(@Valid @RequestBody AuthorDto authorDto) {
        Author author = convertToEntity(authorDto);
        AuthorDto authorCreated = convertToDto(authorService.addAuthor(author));
        return ResponseEntity.ok(authorCreated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable String id) {
        try {
            authorService.deleteAuthor(id);
            return ResponseEntity.ok().build();
        } catch (AuthorNotFoundException ex) {
            log.error("Failed to delete author: ", ex);
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuthorDto> updateAuthor(@PathVariable String id, @Valid @RequestBody AuthorDto authorDto) {
        try {
            Author author = convertToEntity(authorDto);
            AuthorDto authorUpdated = convertToDto(authorService.updateAuthor(id, author));
            return ResponseEntity.ok(authorUpdated);
        } catch (AuthorNotFoundException ex) {
            log.error("Failed to update author: ", ex);
            return ResponseEntity.notFound().build();
        }
    }

    private AuthorDto convertToDto(Author author) {
        return modelMapper.map(author, AuthorDto.class);
    }

    private Author convertToEntity(AuthorDto authorDto) {
        return modelMapper.map(authorDto, Author.class);
    }

}
