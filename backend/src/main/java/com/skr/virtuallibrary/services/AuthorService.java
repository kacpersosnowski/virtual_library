package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.exceptions.AuthorNotFoundException;
import com.skr.virtuallibrary.repositories.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    private final ModelMapper modelMapper;

    private static final String ERROR_NOT_FOUND_MSG = "Not found author with id: ";

    public AuthorDto findAuthorById(String id) throws AuthorNotFoundException {
        return authorRepository.findById(id).map(this::convertToDto)
                .orElseThrow(() -> new AuthorNotFoundException(ERROR_NOT_FOUND_MSG + id));
    }

    public List<AuthorDto> findAllAuthors() {
        return authorRepository.findAll().stream().map(this::convertToDto).toList();
    }

    public AuthorDto addAuthor(AuthorDto authorDto) {
        return saveAuthor(authorDto);
    }

    public void deleteAuthor(String id) {
        if (authorRepository.findById(id).isPresent()) {
            authorRepository.deleteById(id);
        } else {
            throw new AuthorNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }
    }

    public AuthorDto updateAuthor(String id, AuthorDto authorDto) {
        if (authorRepository.findById(id).isPresent()) {
            authorDto.setId(id);
            return saveAuthor(authorDto);
        } else {
            throw new AuthorNotFoundException(ERROR_NOT_FOUND_MSG + id);
        }
    }

    private AuthorDto saveAuthor(AuthorDto authorDto) {
        Author author = convertToEntity(authorDto);
        return convertToDto(authorRepository.save(author));
    }

    private AuthorDto convertToDto(Author author) {
        return modelMapper.map(author, AuthorDto.class);
    }

    private Author convertToEntity(AuthorDto authorDto) {
        return modelMapper.map(authorDto, Author.class);
    }
}
