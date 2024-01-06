package com.skr.virtuallibrary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class IncorrectContentTypeException extends ResponseStatusException {
    public IncorrectContentTypeException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
