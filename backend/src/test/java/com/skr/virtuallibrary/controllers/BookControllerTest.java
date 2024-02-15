package com.skr.virtuallibrary.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skr.virtuallibrary.auth.JwtService;
import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.services.BookService;
import com.skr.virtuallibrary.services.FileService;
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

import static org.instancio.Select.field;
import static org.mockito.Mockito.when;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(BookController.class)
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private BookService bookService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private FileService fileService;

    @Test
    void testFindBookById() throws Exception {
        BookDto bookDto = Instancio.of(BookDto.class)
                .set(field(BookDto::getAuthorList), Instancio.ofList(AuthorDto.class).size(2).create())
                .create();

        when(bookService.findBookById(bookDto.getId())).thenReturn(bookDto);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/books/{id}", bookDto.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        BookDto actualBookDto = objectMapper.readValue(result.getResponse().getContentAsString(), BookDto.class);

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualBookDto).usingRecursiveComparison().isEqualTo(bookDto);

    }

    @Test
    void testFindAllBooks() throws Exception {
        List<BookDto> bookDtoList = Instancio.ofList(BookDto.class).size(3)
                .set(field(BookDto::getAuthorList), Instancio.ofList(AuthorDto.class).size(2).create())
                .create();
        PagedResponse<BookDto> pagedResponse = new PagedResponse<>(bookDtoList);

        when(bookService.findAllBooks()).thenReturn(pagedResponse);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/books")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        PagedResponse<BookDto> actualPagedResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualPagedResponse).usingRecursiveComparison().isEqualTo(pagedResponse);
    }

    @Test
    void testDeleteBook() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.delete("/books/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
    }
}