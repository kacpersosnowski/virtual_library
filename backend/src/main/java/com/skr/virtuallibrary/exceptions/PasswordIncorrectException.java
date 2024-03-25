package com.skr.virtuallibrary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PasswordIncorrectException extends ResponseStatusException {
    public PasswordIncorrectException(String message) {
        super(HttpStatus.FORBIDDEN, message);
    }
}
