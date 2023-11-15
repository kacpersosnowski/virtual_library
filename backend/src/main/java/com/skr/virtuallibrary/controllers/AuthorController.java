package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.dto.AuthorDto;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/authors")
@Tag(name = "Authors", description = "Authors management APIs")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

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
    public AuthorDto findAuthorById(
            @Parameter(description = "Author id.", example = "1")
            @PathVariable String id
    ) {
        return authorService.findAuthorById(id);
    }

    @Operation(
            summary = "Find all Authors",
            description = "Get all Author instances."
    )
    @GetMapping
    public List<AuthorDto> findAllAuthors() {
        return authorService.findAllAuthors();
    }

    @Operation(
            summary = "Post Author",
            description = "Post an Author to database."
    )
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public AuthorDto addAuthor(@Valid @RequestBody AuthorDto authorDto) {
        return authorService.addAuthor(authorDto);
    }

    @Operation(
            summary = "Delete Author by id",
            description = "Delete an Author by specifying its id."
    )
    @DeleteMapping("/{id}")
    public void deleteAuthor(
            @Parameter(description = "Author id.", example = "1")
            @PathVariable String id
    ) {
        authorService.deleteAuthor(id);
    }

    @Operation(
            summary = "Update Author by id",
            description = "Put a Author by specifying its id and providing new Author."
    )
    @PutMapping("/{id}")
    public AuthorDto updateAuthor(
            @Parameter(description = "Author id.", example = "1")
            @PathVariable String id,
            @Valid @RequestBody AuthorDto authorDto
    ) {
        return authorService.updateAuthor(id, authorDto);
    }
}
