package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.dto.AuthorDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.exceptions.AuthorNotFoundException;
import com.skr.virtuallibrary.services.AuthorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/authors")
@Tag(name = "Authors", description = "Authors management APIs")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

    private final ModelMapper modelMapper;

    @Operation(
            summary = "Find Author by id",
            description = "Get a Author by specifying its id."
    )
    @ApiResponse(
            responseCode = "200",
            content = {
                    @Content(schema = @Schema(implementation = AuthorDto.class), mediaType = "application/json")})
    @ApiResponse(
            responseCode = "404",
            content = {@Content(schema = @Schema(implementation = AuthorNotFoundException.class))})
    @ApiResponse(
            responseCode = "500",
            content = {@Content(schema = @Schema())})
    @GetMapping("/{id}")
    public ResponseEntity<AuthorDto> findAuthorById(
            @Parameter(description = "Author id.", example = "1")
            @PathVariable String id
    ) {
        try {
            AuthorDto authorDto = convertToDto(authorService.findAuthorById(id));
            return ResponseEntity.ok(authorDto);
        } catch (AuthorNotFoundException ex) {
            log.error("Failed to find author: ", ex);
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(
            summary = "Find all Authors",
            description = "Get all Author instances."
    )
    @GetMapping
    public ResponseEntity<List<AuthorDto>> findAllAuthors() {
        List<AuthorDto> authorDtoList = authorService.findAllAuthors().stream().map(this::convertToDto).toList();
        return ResponseEntity.ok(authorDtoList);
    }

    @Operation(
            summary = "Post Author",
            description = "Post an Author to database."
    )
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity<AuthorDto> addAuthor(@Valid @RequestBody AuthorDto authorDto) {
        Author author = convertToEntity(authorDto);
        AuthorDto authorCreated = convertToDto(authorService.addAuthor(author));
        return ResponseEntity.ok(authorCreated);
    }

    @Operation(
            summary = "Delete Author by id",
            description = "Delete an Author by specifying its id."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuthor(
            @Parameter(description = "Author id.", example = "1")
            @PathVariable String id
    ) {
        try {
            authorService.deleteAuthor(id);
            return ResponseEntity.ok().build();
        } catch (AuthorNotFoundException ex) {
            log.error("Failed to delete author: ", ex);
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(
            summary = "Update Author by id",
            description = "Put a Author by specifying its id and providing new Author."
    )
    @PutMapping("/{id}")
    public ResponseEntity<AuthorDto> updateAuthor(
            @Parameter(description = "Author id.", example = "1")
            @PathVariable String id,
            @Valid @RequestBody AuthorDto authorDto
    ) {
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
