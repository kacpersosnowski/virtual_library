package com.skr.virtuallibrary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public abstract class NotFoundException extends ResponseStatusException {
    protected NotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
