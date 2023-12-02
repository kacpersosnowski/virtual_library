package com.skr.virtuallibrary.emails;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("/email")
@Tag(name = "Emails", description = "Email management APIs")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send/en")
    @Operation(summary = "Send verification email in English.")
    public String sendEmailEn(
            @RequestParam String to,
            @RequestParam String token) throws MessagingException, IOException {
        emailService.sendAuthenticationEmailEn(to, token);
        return "Email sent successfully!";
    }

    @PostMapping("/send/pl")
    @Operation(summary = "Send verification email in Polish.")
    public String sendEmailPl(
            @RequestParam String to,
            @RequestParam String token) throws MessagingException, IOException {
        emailService.sendAuthenticationEmailPl(to, token);
        return "Email sent successfully!";
    }
}
