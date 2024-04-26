package com.skr.virtuallibrary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class AccessForbiddenException extends ResponseStatusException {
    public AccessForbiddenException(String message) {
        super(HttpStatus.FORBIDDEN, message);
    }
}
