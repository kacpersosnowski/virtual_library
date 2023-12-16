package com.skr.virtuallibrary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class RegistrationExpiredException extends ResponseStatusException {
    public RegistrationExpiredException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
