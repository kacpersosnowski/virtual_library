package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.exceptions.AuthorAlreadyExistsException;
import com.skr.virtuallibrary.exceptions.AuthorAssignedToBookException;
import com.skr.virtuallibrary.exceptions.AuthorNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.AuthorRepository;
import com.skr.virtuallibrary.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
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

    public List<AuthorDto> findAllAuthors() {
        return authorRepository.findAll().stream().map(modelMapper::toAuthorDto).toList();
    }

    public Pair<Long, List<AuthorDto>> findAllAuthors(int page) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Author> authors = authorRepository.findAll(pageable);

        return Pair.of(
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

        if (!bookRepository.findAllByAuthorListContains(author).isEmpty()) {
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

    public List<AuthorDto> searchAuthors(String name) {
        return authorRepository.findAllByFirstNameLikeIgnoreCaseOrLastNameLikeIgnoreCase(name)
                .stream()
                .map(modelMapper::toAuthorDto)
                .toList();
    }

    public Pair<Long, List<AuthorDto>> searchAuthors(String name, int page) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Author> authors = authorRepository.findAllByFirstNameLikeIgnoreCaseOrLastNameLikeIgnoreCase(name, pageable);

        return Pair.of(
                authors.getTotalElements(),
                authors.stream().map(modelMapper::toAuthorDto).toList()
        );
    }

    private AuthorDto saveAuthor(AuthorDto authorDto) {
        Author author = modelMapper.toAuthorEntity(authorDto);
        return modelMapper.toAuthorDto(authorRepository.save(author));
    }

}
