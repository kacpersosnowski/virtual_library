package com.skr.virtuallibrary.emails;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendAuthenticationEmailEn(String recipient, String token) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        ClassPathResource resource = new ClassPathResource("/email_content/authentication_en.txt");
        String messageText = FileCopyUtils.copyToString(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));

        helper.setTo(recipient);
        helper.setSubject("Welcome to Liber Mundi");
        helper.setText(String.format(messageText, token));

        mailSender.send(message);
    }

    public void sendAuthenticationEmailPl(String recipient, String token) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        ClassPathResource resource = new ClassPathResource("/email_content/authentication_pl.txt");
        String messageText = FileCopyUtils.copyToString(
                new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));

        helper.setTo(recipient);
        helper.setSubject("Witamy w Liber Mundi");
        helper.setText(String.format(messageText, token));

        mailSender.send(message);
    }
}
