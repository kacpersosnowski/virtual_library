package com.skr.virtuallibrary.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skr.virtuallibrary.auth.JwtService;
import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.GenreDto;
import com.skr.virtuallibrary.services.GenreService;
import org.assertj.core.api.Assertions;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.when;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(GenreController.class)
class GenreControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private GenreService genreService;

    @MockBean
    private JwtService jwtService;

    @Test
    void testCreateGenre() throws Exception {
        GenreDto genreDto = Instancio.create(GenreDto.class);

        when(genreService.createGenre(genreDto)).thenReturn(genreDto);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/genres")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(genreDto)))
                .andReturn();
        GenreDto actualGenreDto = objectMapper.readValue(result.getResponse().getContentAsString(), GenreDto.class);

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualGenreDto).usingRecursiveComparison().isEqualTo(genreDto);
    }

    @Test
    void testSearchForGenres() throws Exception {
        List<GenreDto> genreDtoList = Instancio.ofList(GenreDto.class).size(3).create();

        when(genreService.searchGenres("name")).thenReturn(new PagedResponse<>(genreDtoList));
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/genres")
                        .param("search", "name")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        PagedResponse<GenreDto> actualGenreDtoList = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualGenreDtoList).usingRecursiveComparison().isEqualTo(new PagedResponse<>(genreDtoList));
    }

    @Test
    void testSearchForGenresOnPage() throws Exception {
        List<GenreDto> genreDtoList = Instancio.ofList(GenreDto.class).size(3).create();

        when(genreService.searchGenres("name", 0)).thenReturn(new PagedResponse<>(genreDtoList));
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/genres")
                        .param("search", "name")
                        .param("page", "0")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        PagedResponse<GenreDto> actualGenreDtoList = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualGenreDtoList).usingRecursiveComparison().isEqualTo(new PagedResponse<>(genreDtoList));
    }

    @Test
    void testGetAllGenres() throws Exception {
        PagedResponse<GenreDto> genre = new PagedResponse<>(Instancio.ofList(GenreDto.class).size(3).create());

        when(genreService.getAllGenres()).thenReturn(genre);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/genres")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        PagedResponse<GenreDto> actual = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actual).usingRecursiveComparison().isEqualTo(genre);
    }

    @Test
    void testGetGenreById() throws Exception {
        GenreDto genreDto = Instancio.create(GenreDto.class);

        when(genreService.getGenreById(genreDto.getId())).thenReturn(genreDto);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/genres/{id}", genreDto.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        GenreDto actualGenreDto = objectMapper.readValue(result.getResponse().getContentAsString(), GenreDto.class);

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualGenreDto).usingRecursiveComparison().isEqualTo(genreDto);
    }

    @Test
    void testUpdateGenre() throws Exception {
        GenreDto genreDto = Instancio.create(GenreDto.class);

        when(genreService.updateGenre(genreDto.getId(), genreDto)).thenReturn(genreDto);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.put("/genres/{id}", genreDto.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(genreDto)))
                .andReturn();
        GenreDto actualGenreDto = objectMapper.readValue(result.getResponse().getContentAsString(), GenreDto.class);

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualGenreDto).usingRecursiveComparison().isEqualTo(genreDto);
    }

    @Test
    void testDeleteGenre() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.delete("/genres/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
    }

    @Test
    void testGetGenreBookCount() throws Exception {
        Map<String, Integer> genreBookCount = Instancio.ofMap(String.class, Integer.class).size(3).create();

        when(genreService.getGenreBookCount()).thenReturn(genreBookCount);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/genres/book-count")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        Map<String, Integer> actual = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {});

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actual).usingRecursiveComparison().isEqualTo(genreBookCount);
    }

}
