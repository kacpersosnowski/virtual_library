package com.skr.virtuallibrary.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skr.virtuallibrary.auth.JwtService;
import com.skr.virtuallibrary.dto.BookListDto;
import com.skr.virtuallibrary.services.BookListService;
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
@WebMvcTest(BookListController.class)
public class BookListControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private BookListService bookListService;

    @MockBean
    private JwtService jwtService;

    @Test
    void testFindBookList() throws Exception {
        BookListDto bookListDto = Instancio.of(BookListDto.class)
                .set(field(BookListDto::getBookIds), Instancio.ofList(String.class).size(2).create())
                .create();

        when(bookListService.getBookList(bookListDto.getId())).thenReturn(bookListDto);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/book-list/{id}", bookListDto.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        BookListDto actualBookListDto = objectMapper.readValue(result.getResponse().getContentAsString(), BookListDto.class);

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualBookListDto).usingRecursiveComparison().isEqualTo(bookListDto);
    }

    @Test
    void testFindBookLists() throws Exception {
        List<BookListDto> bookListDtos = Instancio.ofList(BookListDto.class).size(3)
                .set(field(BookListDto::getBookIds), Instancio.ofList(String.class).size(2).create())
                .create();

        when(bookListService.getBookLists()).thenReturn(bookListDtos);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/book-list")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        List<BookListDto> actualBookListDtos = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualBookListDtos).usingRecursiveComparison().isEqualTo(bookListDtos);
    }

    @Test
    void testDeleteBookList() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/book-list/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
    }
}
