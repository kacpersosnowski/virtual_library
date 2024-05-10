package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.auth.JwtService;
import com.skr.virtuallibrary.entities.File;
import com.skr.virtuallibrary.services.FileService;
import org.assertj.core.api.Assertions;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.instancio.Select.field;
import static org.mockito.Mockito.when;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(FileController.class)
class FileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FileService fileService;

    @MockBean
    private JwtService jwtService;

    @Test
    void testGetBookCover() throws Exception {
        File file = Instancio.of(File.class).set(field(File::getFileType), "image/png").create();

        when(fileService.getFile("1", "image/")).thenReturn(file);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/files/image/1"))
                .andReturn();

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
    }

    @Test
    void testGetBookContent() throws Exception {
        File file = Instancio.of(File.class).set(field(File::getFileType), "application/pdf").create();

        when(fileService.getFile("1", "application/pdf")).thenReturn(file);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/files/content/1"))
                .andReturn();

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
    }

    @Test
    void testGetBookCoverFilename() throws Exception {
        String filename = "cover.png";

        when(fileService.getFilename("1")).thenReturn(filename);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/files/image/1/filename"))
                .andReturn();

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(result.getResponse().getContentAsString()).isEqualTo(filename);
    }

    @Test
    void testGetBookContentFilename() throws Exception {
        String filename = "content.pdf";

        when(fileService.getFilename("1")).thenReturn(filename);
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/files/content/1/filename"))
                .andReturn();

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(result.getResponse().getContentAsString()).isEqualTo(filename);
    }

}
