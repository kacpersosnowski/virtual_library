package com.skr.virtuallibrary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class AlreadyExistsException extends ResponseStatusException {
    protected AlreadyExistsException(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
