package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
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
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/authors")
@Tag(name = "Authors", description = "Authors management APIs")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

    @Operation(summary = "Find Author by id")
    @ApiResponse(responseCode = "200")
    @ApiResponse(responseCode = "404")
    @ApiResponse(responseCode = "500")
    @GetMapping("/{id}")
    public AuthorDto findAuthorById(@PathVariable String id) {
        return authorService.findAuthorById(id);
    }

    @Operation(summary = "Find all Authors or search by first name or last name.")
    @GetMapping
    public PagedResponse<AuthorDto> findAllAuthors(@PathParam("search") String search, @PathParam("page") Integer page) {
        if (search != null && !search.isEmpty()) {
            String decryptedSearch = URLDecoder.decode(search, StandardCharsets.UTF_8).trim();
            if (page != null) {
                return authorService.searchAuthors(decryptedSearch, page);
            }
            return authorService.searchAuthors(decryptedSearch);
        }

        if (page != null) {
            return authorService.findAllAuthors(page);
        }
        return authorService.findAllAuthors();
    }

    @Operation(summary = "Post Author")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public AuthorDto addAuthor(@Valid @RequestBody AuthorDto authorDto) {
        return authorService.addAuthor(authorDto);
    }

    @Operation(summary = "Delete Author by id")
    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable String id) {
        authorService.deleteAuthor(id);
    }

    @Operation(summary = "Update Author by id")
    @PutMapping("/{id}")
    public AuthorDto updateAuthor(@PathVariable String id, @Valid @RequestBody AuthorDto authorDto) {
        return authorService.updateAuthor(id, authorDto);
    }
}
