package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.GenreDto;
import com.skr.virtuallibrary.services.GenreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/genres")
@RequiredArgsConstructor
@Tag(name = "Genres", description = "Genres management APIs")
public class GenreController {

    private final GenreService genreService;

    @PostMapping
    @Operation(summary = "Create a new genre.")
    public GenreDto createGenre(@Valid @RequestBody GenreDto genreDto) {
        return genreService.createGenre(genreDto);
    }

    @GetMapping
    @Operation(summary = "Get all genres and search genres by name.")
    public PagedResponse<GenreDto> getAllGenres(@PathParam("search") String search, @PathParam("page") Integer page) {
        if (search != null) {
            String decryptedName = URLDecoder.decode(search, StandardCharsets.UTF_8).trim();
            if (page != null) {
                return genreService.searchGenres(decryptedName, page);
            }
            return genreService.searchGenres(decryptedName);
        }

        if (page != null) {
            return genreService.getAllGenres(page);
        }
        return genreService.getAllGenres();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get genre by id.")
    public GenreDto getGenreById(@PathVariable String id) {
        return genreService.getGenreById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update genre by id.")
    public GenreDto updateGenre(@PathVariable String id, @Valid @RequestBody GenreDto genreDto) {
        return genreService.updateGenre(id, genreDto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete genre by id.")
    public void deleteGenre(@PathVariable String id) {
        genreService.deleteGenre(id);
    }

    @GetMapping("/book-count")
    @Operation(summary = "Get all genres with book count.")
    public Map<String, Integer> getGenreBookCount() {
        return genreService.getGenreBookCount();
    }

}
