package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.GenreDto;
import com.skr.virtuallibrary.entities.Genre;
import com.skr.virtuallibrary.exceptions.GenreNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.GenreRepository;
import com.skr.virtuallibrary.services.testData.GenreTestDataBuilder;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@Slf4j
@SpringBootTest(classes = {GenreRepository.class})
class GenreServiceTests {

    @InjectMocks
    private GenreService genreService;

    @Mock
    private GenreRepository genreRepository;

    @Mock
    private ModelMapper modelMapper;

    private Genre exampleGenre;

    private GenreDto exampleGenreDto;

    @BeforeEach
    final void setUp() {
        exampleGenre = GenreTestDataBuilder.genreExample().genre();
        exampleGenreDto = GenreTestDataBuilder.genreDtoExample().genreDto();
    }

    @Test
    void findGenreById_shouldReturnGenreDto() {
        // given
        String idToFind = "foo";

        // when
        when(genreRepository.findById(idToFind)).thenReturn(Optional.ofNullable(exampleGenre));
        when(modelMapper.toGenreDto(exampleGenre)).thenReturn(exampleGenreDto);
        GenreDto expected = exampleGenreDto;
        GenreDto actual = genreService.getGenreById(idToFind);

        // then
        assertEquals(expected, actual);
    }

    @Test
    void findGenreById_shouldThrowGenreNotFoundException() {
        // given
        String idToFind = "foo";

        // when
        when(genreRepository.findById(idToFind)).thenReturn(Optional.empty());

        // then
        assertThrows(GenreNotFoundException.class, () -> genreService.getGenreById(idToFind));
    }

    @Test
    void updateGenre_shouldReturnGenreDto() {
        // given
        String idToUpdate = "foo";
        GenreDto genreDtoToUpdate = GenreTestDataBuilder.genreDtoExample().genreDto();
        GenreDto genreDtoToUpdateWith = GenreTestDataBuilder.genreDtoExample().genreDto();
        genreDtoToUpdateWith.setName("updatedName");
        Genre updatedGenre = Genre.builder()
                .id(idToUpdate)
                .name("updatedName")
                .build();

        // when
        when(genreRepository.findById(idToUpdate)).thenReturn(Optional.ofNullable(exampleGenre));
        genreDtoToUpdateWith.setId(idToUpdate);
        when(modelMapper.toGenreEntity(genreDtoToUpdateWith)).thenReturn(updatedGenre);
        when(genreRepository.save(updatedGenre)).thenReturn(updatedGenre);
        when(modelMapper.toGenreDto(updatedGenre)).thenReturn(genreDtoToUpdateWith);
        GenreDto expected = genreDtoToUpdateWith;
        GenreDto actual = genreService.updateGenre(idToUpdate, genreDtoToUpdateWith);

        // then
        assertEquals(expected, actual);
    }

    @Test
    void updateGenre_shouldThrowGenreNotFoundException() {
        // given
        String idToUpdate = "foo";
        GenreDto genreDtoToUpdate = GenreTestDataBuilder.genreDtoExample().genreDto();

        // when
        when(genreRepository.findById(idToUpdate)).thenReturn(Optional.empty());

        // then
        assertThrows(GenreNotFoundException.class, () -> genreService.updateGenre(idToUpdate, genreDtoToUpdate));
    }

    @Test
    void deleteGenre_shouldReturnVoid() {
        // given
        String idToDelete = "foo";

        // when
        genreService.deleteGenre(idToDelete);

        // then
        verify(genreRepository).deleteById(idToDelete);
    }

    @Test
    void createGenre_shouldReturnGenreDto() {
        // given
        GenreDto genreDtoToCreate = GenreTestDataBuilder.genreDtoExampleWithoutId().genreDto();

        // when
        when(modelMapper.toGenreEntity(genreDtoToCreate)).thenReturn(exampleGenre);
        when(genreRepository.save(exampleGenre)).thenReturn(exampleGenre);
        when(modelMapper.toGenreDto(exampleGenre)).thenReturn(exampleGenreDto);
        GenreDto expected = exampleGenreDto;
        GenreDto actual = genreService.createGenre(genreDtoToCreate);

        // then
        assertEquals(expected, actual);
    }

    @Test
    void getAllGenres_shouldReturnListOfGenreDto() {
        // given
        List<Genre> exampleGenreList = GenreTestDataBuilder.exampleGenreList();
        List<GenreDto> exampleGenreDtoList = GenreTestDataBuilder.exampleGenreDtoList();

        // when
        when(genreRepository.findAll()).thenReturn(exampleGenreList);
        for (int i = 0; i < exampleGenreList.size(); i++) {
            when(modelMapper.toGenreDto(exampleGenreList.get(i))).thenReturn(exampleGenreDtoList.get(i));
        }
        List<GenreDto> expected = exampleGenreDtoList;
        List<GenreDto> actual = genreService.getAllGenres();

        // then
        assertEquals(expected, actual);
    }
}
