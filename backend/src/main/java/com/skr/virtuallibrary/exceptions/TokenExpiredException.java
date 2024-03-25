package com.skr.virtuallibrary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class TokenExpiredException extends ResponseStatusException {
    public TokenExpiredException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
