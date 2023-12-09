package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.exceptions.AuthorNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.AuthorRepository;
import com.skr.virtuallibrary.services.testData.AuthorTestDataBuilder;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@Slf4j
@SpringBootTest(classes = {AuthorRepository.class})
class AuthorServiceTest {

    @InjectMocks
    private AuthorService authorService;

    @Mock
    private AuthorRepository authorRepository;

    @Mock
    private ModelMapper modelMapper;

    private Author exampleAuthor;
    private AuthorDto exampleAuthorDto;

    @BeforeEach
    final void setUp() {
        exampleAuthor = AuthorTestDataBuilder.authorExample().author();
        exampleAuthorDto = AuthorTestDataBuilder.authorDtoExample().authorDto();
    }

    @Test
    void findAuthorById_shouldReturnAuthorDto() {
        // given
        String idToFind = "foo";

        // when
        when(authorRepository.findById(idToFind)).thenReturn(Optional.ofNullable(exampleAuthor));
        when(modelMapper.toAuthorDto(exampleAuthor)).thenReturn(exampleAuthorDto);
        AuthorDto expected = exampleAuthorDto;
        AuthorDto actual = authorService.findAuthorById(idToFind);

        // then
        assertEquals(expected, actual);
    }

    @Test
    void findAuthorById_shouldThrowAuthorNotFoundException() {
        // given
        String idToFind = "foo";

        // when
        when(authorRepository.findById(idToFind)).thenReturn(Optional.empty());

        // then
        assertThrows(AuthorNotFoundException.class, () -> authorService.findAuthorById(idToFind));
    }

    @Test
    void findAllAuthors_shouldReturnAuthorsList() {
        // given
        List<Author> authorsExample = AuthorTestDataBuilder.exampleAuthorList();
        List<AuthorDto> authorDtosExample = AuthorTestDataBuilder.exampleAuthorDtoList();

        // when
        when(authorRepository.findAll()).thenReturn(authorsExample);
        for (int i = 0; i < authorsExample.size(); i++) {
            when(modelMapper.toAuthorDto(authorsExample.get(i)))
                    .thenReturn(authorDtosExample.get(i));
        }
        List<AuthorDto> expected = authorDtosExample;
        List<AuthorDto> actual = authorService.findAllAuthors();

        // then
        assertEquals(expected, actual);
    }

    @Test
    void addAuthor_shouldReturnNewAuthor() {
        // given
        AuthorDto inputAuthor = AuthorTestDataBuilder.authorDtoExampleWithoutId().authorDto();
        Author inputAuthorAfterMapping = AuthorTestDataBuilder.authorExampleWithoutId().author();

        // when
        when(modelMapper.toAuthorEntity(inputAuthor)).thenReturn(inputAuthorAfterMapping);
        when(authorRepository.save(inputAuthorAfterMapping)).thenReturn(exampleAuthor);
        when(modelMapper.toAuthorDto(exampleAuthor)).thenReturn(exampleAuthorDto);
        AuthorDto actual = authorService.addAuthor(inputAuthor);
        AuthorDto expected = exampleAuthorDto;

        // then
        assertEquals(expected, actual);
    }

    @Test
    void deleteAuthor_shouldDeleteAuthor() {
        // given
        String authorId = "foo";

        // when
        when(authorRepository.findById(authorId)).thenReturn(Optional.of(exampleAuthor));
        authorService.deleteAuthor(authorId);

        // then
        verify(authorRepository).deleteById(authorId);
    }

    @Test
    void deleteAuthor_shouldReturnException() {
        // given
        String authorId = "bar";

        // when
        when(authorRepository.findById(authorId)).thenReturn(Optional.empty());

        // then
        assertThrows(AuthorNotFoundException.class, () -> authorService.deleteAuthor(authorId));
    }

    @Test
    void updateAuthor_shouldReturnUpdatedAuthor() {
        // given
        String existingAuthorId = "foo";
        AuthorDto inputAuthor = AuthorDto.builder()
                .firstName("newName")
                .lastName("newLastName")
                .build();
        Author newAuthor = Author.builder()
                .id(existingAuthorId)
                .firstName("newName")
                .lastName("newLastName")
                .build();

        // when
        AuthorDto authorInProgress = inputAuthor;
        authorInProgress.setId(existingAuthorId);

        when(authorRepository.findById(existingAuthorId)).thenReturn(Optional.ofNullable(exampleAuthor));
        when(modelMapper.toAuthorEntity(authorInProgress)).thenReturn(newAuthor);
        when(authorRepository.save(newAuthor)).thenReturn(newAuthor);
        when(modelMapper.toAuthorDto(newAuthor)).thenReturn(authorInProgress);

        AuthorDto actual = authorService.addAuthor(inputAuthor);
        AuthorDto expected = authorInProgress;

        // then
        assertEquals(expected, actual);
    }

    @Test
    void updateAuthor_shouldThrowAuthorNotFoundException() {
        // given
        String authorIdToFind = "bar";

        // when
        when(authorRepository.findById(authorIdToFind)).thenReturn(Optional.empty());

        // then
        assertThrows(AuthorNotFoundException.class, () -> authorService.updateAuthor(authorIdToFind, exampleAuthorDto));
    }
}