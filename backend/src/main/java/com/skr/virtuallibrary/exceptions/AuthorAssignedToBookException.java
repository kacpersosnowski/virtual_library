package com.skr.virtuallibrary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class AuthorAssignedToBookException extends ResponseStatusException {

    public AuthorAssignedToBookException() {
        super(HttpStatus.BAD_REQUEST, "Author is assigned to book(s)");
    }

}
