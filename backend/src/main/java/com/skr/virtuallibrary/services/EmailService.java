package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.exceptions.InternalException;
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
import java.util.EnumMap;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private static final String AUTHENTICATION_EMAIL_PATH = "/email_content/authentication_%s.txt";

    public void sendAuthenticationEmail(Language language, String username, String token) {
        EnumMap<Language, String> subject = new EnumMap<>(Language.class);
        subject.put(Language.PL, "Witamy w Liber Mundi");
        subject.put(Language.ENG, "Welcome to Liber Mundi");
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            ClassPathResource resource = new ClassPathResource(String.format(AUTHENTICATION_EMAIL_PATH, language.name()));
            String messageText = FileCopyUtils.copyToString(
                    new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));

            helper.setTo(username);
            helper.setSubject(subject.get(language));
            helper.setText(String.format(messageText, username, token));
        } catch (MessagingException e) {
            throw new InternalException("Error while sending email.", e);
        } catch (IOException e) {
            throw new InternalException("Error while crafting email.", e);
        }

        mailSender.send(message);
    }

}
