package com.skr.virtuallibrary.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/booklist")
@Tag(name = "Book Lists", description = "API for...")
public class BookListController {

    /* TODO:
    get wsszystkie listy użytkownika

    get 1 lista użytkownika

    post nowa lista

    patch zmiana w liście: dodanie/usunięcie książki, zmiana nazwy

    delete usunięcie listy
    */
}
