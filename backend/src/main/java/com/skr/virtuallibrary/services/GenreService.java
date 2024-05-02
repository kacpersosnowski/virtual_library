package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.GenreDto;
import com.skr.virtuallibrary.entities.Genre;
import com.skr.virtuallibrary.exceptions.GenreAlreadyExistsException;
import com.skr.virtuallibrary.exceptions.GenreAssignedToBookException;
import com.skr.virtuallibrary.exceptions.GenreNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.BookRepository;
import com.skr.virtuallibrary.repositories.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GenreService {

    private final GenreRepository genreRepository;

    private final BookRepository bookRepository;

    private final ModelMapper modelMapper;

    private static final String ERROR_NOT_FOUND_MSG = "Not found genre with id: ";

    public GenreDto createGenre(GenreDto genreDto) {
        return saveGenre(genreDto);
    }

    public PagedResponse<GenreDto> getAllGenres() {
        return new PagedResponse<>(genreRepository.findAll().stream().map(modelMapper::toGenreDto).toList());
    }

    public PagedResponse<GenreDto> getAllGenres(int page) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by("name").descending());
        Page<Genre> genres = genreRepository.findAllByNameLikeIgnoreCase(pageable);

        return new PagedResponse<>(
                genres.getTotalElements(),
                genres.stream().map(modelMapper::toGenreDto).toList()
        );
    }

    public GenreDto getGenreById(String id) {
        return genreRepository.findById(id).map(modelMapper::toGenreDto)
                .orElseThrow(() -> new GenreNotFoundException(ERROR_NOT_FOUND_MSG + id));
    }

    public GenreDto updateGenre(String id, GenreDto genreDto) {
        if (genreRepository.findById(id).isEmpty()) {
            throw new GenreNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }
        genreDto.setId(id);
        return saveGenre(genreDto);
    }

    public void deleteGenre(String id) {
        if (!bookRepository.findAllByGenreIdListContains(id).isEmpty()) {
            throw new GenreAssignedToBookException();
        }
        genreRepository.deleteById(id);
    }

    public PagedResponse<GenreDto> searchGenres(String name, int page) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by("name").descending());
        Page<Genre> genres = genreRepository.findAllByNameLikeIgnoreCase(name, pageable);

        return new PagedResponse<>(
                genres.getTotalElements(),
                genres.stream().map(modelMapper::toGenreDto).toList()
        );
    }

    public PagedResponse<GenreDto> searchGenres(String name) {
        return new PagedResponse<>(
                genreRepository.findAllByNameLikeIgnoreCase(name).stream().map(modelMapper::toGenreDto).toList()
        );
    }

    public Map<String, Integer> getGenreBookCount() {
        Map<String, Integer> genreBookCount = new HashMap<>();
        List<Genre> genreList = genreRepository.findAll();

        for (Genre genre : genreList) {
            int bookCount = bookRepository.countByGenreIdListContains(genre.getId());
            genreBookCount.put(genre.getName(), bookCount);
        }

        return genreBookCount.entrySet().stream().sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }

    private GenreDto saveGenre(GenreDto genreDto) {
        if (genreRepository.findByName(genreDto.getName()).isPresent()) {
            throw new GenreAlreadyExistsException(genreDto.getName());
        }
        return modelMapper.toGenreDto(genreRepository.save(modelMapper.toGenreEntity(genreDto)));
    }

}
