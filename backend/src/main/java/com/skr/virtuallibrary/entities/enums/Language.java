package com.skr.virtuallibrary.entities.enums;

import lombok.Getter;

@Getter
public enum Language {
    PL("pl"),
    ENG("en");

    private final String label;

    private Language(String label) {
        this.label = label;
    }
}
