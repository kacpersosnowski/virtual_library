package com.skr.virtuallibrary.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skr.virtuallibrary.auth.JwtService;
import com.skr.virtuallibrary.dto.BookRatingDto;
import com.skr.virtuallibrary.entities.BookRating;
import com.skr.virtuallibrary.services.BookRatingService;
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

import static org.mockito.Mockito.when;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(BookRatingController.class)
class BookRatingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private BookRatingService bookRatingService;

    @MockBean
    private JwtService jwtService;

    @Test
    void testGetBookRating() throws Exception {
        BookRatingDto bookRatingDto = Instancio.create(BookRatingDto.class);

        when(bookRatingService.getBookRating(bookRatingDto.getBookId())).thenReturn(bookRatingDto);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/book-ratings/{id}", bookRatingDto.getBookId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        BookRating actualBookRating = objectMapper.readValue(result.getResponse().getContentAsString(), BookRating.class);

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualBookRating).usingRecursiveComparison().isEqualTo(bookRatingDto);
    }

}
