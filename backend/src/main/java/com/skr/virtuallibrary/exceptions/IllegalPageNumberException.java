package com.skr.virtuallibrary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class IllegalPageNumberException extends ResponseStatusException {

    public IllegalPageNumberException() {
        super(HttpStatus.BAD_REQUEST, "Page number cannot be negative.");
    }

}
