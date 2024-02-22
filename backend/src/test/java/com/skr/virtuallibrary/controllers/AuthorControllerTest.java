package com.skr.virtuallibrary.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skr.virtuallibrary.auth.JwtService;
import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.services.AuthorService;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(AuthorController.class)
class AuthorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthorService authorService;

    @MockBean
    private JwtService jwtService;

    @Test
    void testFindAuthorById() throws Exception {
        AuthorDto authorDto = Instancio.create(AuthorDto.class);

        when(authorService.findAuthorById(authorDto.getId())).thenReturn(authorDto);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/authors/{id}", authorDto.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        AuthorDto actualAuthorDto = objectMapper.readValue(result.getResponse().getContentAsString(), AuthorDto.class);

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualAuthorDto).usingRecursiveComparison().isEqualTo(authorDto);
    }

    @Test
    void testSearchForAuthorsOnPage() throws Exception {
        List<AuthorDto> authorDtoList = Instancio.ofList(AuthorDto.class).size(3).create();

        when(authorService.searchAuthors("example", 0)).thenReturn(new PagedResponse<>(authorDtoList));
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/authors")
                        .param("search", "example")
                        .param("page", "0")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        PagedResponse<AuthorDto> actualAuthorDtoList = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualAuthorDtoList).usingRecursiveComparison().isEqualTo(new PagedResponse<>(authorDtoList));
    }

    @Test
    void testSearchForAuthors() throws Exception {
        List<AuthorDto> authorDtoList = Instancio.ofList(AuthorDto.class).size(3).create();

        when(authorService.searchAuthors("example")).thenReturn(new PagedResponse<>(authorDtoList));
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/authors")
                        .param("search", "example")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        PagedResponse<AuthorDto> actualAuthorDtoList = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualAuthorDtoList).usingRecursiveComparison().isEqualTo(new PagedResponse<>(authorDtoList));
    }

    @Test
    void testFindAllAuthors() throws Exception {
        List<AuthorDto> authorDtoList = Instancio.ofList(AuthorDto.class).size(3).create();

        when(authorService.findAllAuthors()).thenReturn(new PagedResponse<>(authorDtoList));
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/authors")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        PagedResponse<AuthorDto> actualAuthorDtoList = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualAuthorDtoList).usingRecursiveComparison().isEqualTo(new PagedResponse<>(authorDtoList));
    }

    @Test
    void testAddAuthor() throws Exception {
        AuthorDto authorDto = Instancio.create(AuthorDto.class);

        when(authorService.addAuthor(any(AuthorDto.class))).thenReturn(authorDto);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/authors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authorDto)))
                .andReturn();
        AuthorDto actualAuthorDto = objectMapper.readValue(result.getResponse().getContentAsString(), AuthorDto.class);

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(201);
        Assertions.assertThat(actualAuthorDto).usingRecursiveComparison().isEqualTo(authorDto);
    }

    @Test
    void testDeleteAuthor() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.delete("/authors/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
    }

    @Test
    void testUpdateAuthor() throws Exception {
        AuthorDto authorDto = Instancio.create(AuthorDto.class);

        when(authorService.updateAuthor(any(String.class), any(AuthorDto.class))).thenReturn(authorDto);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.put("/authors/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authorDto)))
                .andReturn();
        AuthorDto actualAuthorDto = objectMapper.readValue(result.getResponse().getContentAsString(), AuthorDto.class);

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualAuthorDto).usingRecursiveComparison().isEqualTo(authorDto);
    }

}