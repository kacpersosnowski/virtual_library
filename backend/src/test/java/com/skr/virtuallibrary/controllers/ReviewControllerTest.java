package com.skr.virtuallibrary.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skr.virtuallibrary.auth.JwtService;
import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.ReviewDto;
import com.skr.virtuallibrary.services.FindReviewService;
import com.skr.virtuallibrary.services.ReviewService;
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

import static org.mockito.Mockito.when;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(ReviewController.class)
class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private FindReviewService findReviewService;

    @MockBean
    private ReviewService reviewService;

    @MockBean
    private JwtService jwtService;

    @Test
    void testFindReviewById() throws Exception {
        ReviewDto reviewDto = Instancio.create(ReviewDto.class);

        when(findReviewService.findReviewById(reviewDto.getId())).thenReturn(reviewDto);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/reviews/{id}", reviewDto.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        ReviewDto actualReviewDto = objectMapper.readValue(result.getResponse().getContentAsString(), ReviewDto.class);

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualReviewDto).usingRecursiveComparison().isEqualTo(reviewDto);
    }

    @Test
    void testFindAllReviews() throws Exception {
        List<ReviewDto> reviewDtoList = Instancio.ofList(ReviewDto.class).size(3).create();

        when(findReviewService.findAllReviews()).thenReturn(reviewDtoList);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/reviews")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        List<ReviewDto> actualReviewDtoList = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualReviewDtoList).usingRecursiveComparison().isEqualTo(reviewDtoList);
    }

    @Test
    void testFindReviewsByBookId() throws Exception {
        List<ReviewDto> reviewDtoList = Instancio.ofList(ReviewDto.class).size(3).create();
        PagedResponse<ReviewDto> pagedResponse = new PagedResponse<>(3L, reviewDtoList);

        when(findReviewService.findReviewsByBookId("1", 1)).thenReturn(pagedResponse);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/reviews/book/{id}", "1")
                        .param("page", "1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        PagedResponse<ReviewDto> actualPagedResponse = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {
        });

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(actualPagedResponse).usingRecursiveComparison().isEqualTo(pagedResponse);
    }

    @Test
    void testDeleteReview() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.delete("/reviews/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
    }

}
