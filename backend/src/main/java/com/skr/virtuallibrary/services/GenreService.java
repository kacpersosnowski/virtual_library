package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.GenreDto;
import com.skr.virtuallibrary.entities.Genre;
import com.skr.virtuallibrary.exceptions.GenreAlreadyExistsException;
import com.skr.virtuallibrary.exceptions.GenreNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreService {

    private final GenreRepository genreRepository;

    private final ModelMapper modelMapper;

    private static final String ERROR_NOT_FOUND_MSG = "Not found genre with id: ";

    public GenreDto createGenre(GenreDto genreDto) {
        return saveGenre(genreDto);
    }

    public List<GenreDto> getAllGenres() {
        return genreRepository.findAll().stream().map(modelMapper::toGenreDto).toList();
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
        genreRepository.deleteById(id);
    }

    public Pair<Long, List<GenreDto>> searchGenres(String name) {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Genre> genres = genreRepository.findAllByNameLikeIgnoreCase(name, pageable);

        return Pair.of(
                (long) genres.getNumberOfElements(),
                genres.stream().map(modelMapper::toGenreDto).toList()
        );
    }

    private GenreDto saveGenre(GenreDto genreDto) {
        if (genreRepository.findByName(genreDto.getName()).isPresent()) {
            throw new GenreAlreadyExistsException(genreDto.getName());
        }
        return modelMapper.toGenreDto(genreRepository.save(modelMapper.toGenreEntity(genreDto)));
    }

}
