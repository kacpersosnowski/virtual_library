package com.skr.virtuallibrary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidTokenException extends ResponseStatusException {
    public InvalidTokenException(String message) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, message);
    }
}
