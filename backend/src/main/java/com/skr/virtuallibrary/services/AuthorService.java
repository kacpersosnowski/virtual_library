package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.exceptions.AuthorAlreadyExistsException;
import com.skr.virtuallibrary.exceptions.AuthorAssignedToBookException;
import com.skr.virtuallibrary.exceptions.AuthorNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.AuthorRepository;
import com.skr.virtuallibrary.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    private final BookRepository bookRepository;

    private final ModelMapper modelMapper;

    private static final String ERROR_NOT_FOUND_MSG = "Not found author with id: ";

    public AuthorDto findAuthorById(String id) {
        return authorRepository.findById(id).map(modelMapper::toAuthorDto)
                .orElseThrow(() -> new AuthorNotFoundException(ERROR_NOT_FOUND_MSG + id));
    }

    public PagedResponse<AuthorDto> findAllAuthors() {
        return new PagedResponse<>(authorRepository.findAll().stream().map(modelMapper::toAuthorDto).toList());
    }

    public PagedResponse<AuthorDto> findAllAuthors(int page) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by("lastName").ascending());
        Page<Author> authors = authorRepository.findAll(pageable);

        return new PagedResponse<>(
                authors.getTotalElements(),
                authors.stream().map(modelMapper::toAuthorDto).toList()
        );
    }

    public AuthorDto addAuthor(AuthorDto authorDto) {
        if (authorRepository.findByFirstNameAndLastName(authorDto.getFirstName(), authorDto.getLastName()).isPresent()) {
            throw new AuthorAlreadyExistsException(authorDto.getFirstName() + " " + authorDto.getLastName());
        }

        return saveAuthor(authorDto);
    }

    public void deleteAuthor(String id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new AuthorNotFoundException(ERROR_NOT_FOUND_MSG + id));

        if (!bookRepository.findAllByAuthorIdListContains(author.getId()).isEmpty()) {
            throw new AuthorAssignedToBookException();
        }

        authorRepository.deleteById(id);
    }

    public AuthorDto updateAuthor(String id, AuthorDto authorDto) {
        if (authorRepository.findById(id).isPresent()) {
            authorDto.setId(id);
            return saveAuthor(authorDto);
        } else {
            throw new AuthorNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }
    }

    public PagedResponse<AuthorDto> searchAuthors(String name) {
        List<Author> authors = getSearchedAuthorsFromDb(name);

        return new PagedResponse<>(authors.stream().distinct().map(modelMapper::toAuthorDto).toList());
    }

    public PagedResponse<AuthorDto> searchAuthors(String name, int page) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by("lastName").ascending());

        List<Author> authors = getSearchedAuthorsFromDb(name);
        authors = authors.stream().distinct().toList();

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), authors.size());
        List<AuthorDto> pageContent = authors.subList(start, end).stream().map(modelMapper::toAuthorDto).toList();
        Page<AuthorDto> authorsPage = new PageImpl<>(pageContent, pageable, authors.size());

        return new PagedResponse<>(
                authorsPage.getTotalElements(),
                authorsPage.toList()
        );
    }

    private List<Author> getSearchedAuthorsFromDb(String name) {
        String[] searchPhrases = name.trim().split(" ");

        List<Author> authors = authorRepository
                .findAllByFirstNameLikeIgnoreCaseOrLastNameLikeIgnoreCase(searchPhrases[0], searchPhrases[0]);
        for (int i = 1; i < searchPhrases.length; i++) {
            authors.addAll(authorRepository
                    .findAllByFirstNameLikeIgnoreCaseOrLastNameLikeIgnoreCase(searchPhrases[i], searchPhrases[i])
            );
        }
        return authors;
    }

    private AuthorDto saveAuthor(AuthorDto authorDto) {
        Author author = modelMapper.toAuthorEntity(authorDto);
        return modelMapper.toAuthorDto(authorRepository.save(author));
    }

}
