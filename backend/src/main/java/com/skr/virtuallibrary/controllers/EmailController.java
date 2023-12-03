package com.skr.virtuallibrary.controllers;

import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.services.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/email")
@Tag(name = "Emails", description = "Email management APIs")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send")
    @Operation(summary = "Send verification email.")
    public String sendEmailEn(@RequestParam Language language, @RequestParam String to, @RequestParam String token) {
        emailService.sendAuthenticationEmail(language, to, token);
        return "Email sent successfully!";
    }
}
