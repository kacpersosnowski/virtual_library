package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.GenreDto;
import com.skr.virtuallibrary.exceptions.GenreNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.GenreRepository;
import lombok.RequiredArgsConstructor;
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

    private GenreDto saveGenre(GenreDto genreDto) {
        return modelMapper.toGenreDto(genreRepository.save(modelMapper.toGenreEntity(genreDto)));
    }

}
