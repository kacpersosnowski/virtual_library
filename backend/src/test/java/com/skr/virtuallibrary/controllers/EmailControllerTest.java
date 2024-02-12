package com.skr.virtuallibrary.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skr.virtuallibrary.auth.JwtService;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.services.EmailService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.verify;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(EmailController.class)
class EmailControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmailService emailService;

    @MockBean
    private JwtService jwtService;

    @Test
    void testSendEmailEn() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/email/send")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("language", "ENG")
                        .param("to", "name@domain.com")
                        .param("token", "token"))
                .andReturn();

        verify(emailService).sendAuthenticationEmail(Language.ENG, "name@domain.com", "token");

        Assertions.assertThat(result.getResponse().getStatus()).isEqualTo(200);
        Assertions.assertThat(result.getResponse().getContentAsString()).isEqualTo("Email sent successfully!");
    }

}
