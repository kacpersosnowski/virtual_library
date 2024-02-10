package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.AuthorRepository;
import com.skr.virtuallibrary.repositories.BookRepository;
import com.skr.virtuallibrary.services.testData.BookTestDataBuilder;
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
@SpringBootTest(classes = {BookRepository.class})
class BookServiceTests {

    @InjectMocks
    private BookService bookService;

    @Mock
    private BookRepository bookRepository;

    @Mock
    private AuthorRepository authorRepository;

    @Mock
    private ModelMapper modelMapper;

    private Book exampleBook;

    private BookDto exampleBookDto;

    @BeforeEach
    final void setUp() {
        exampleBook = BookTestDataBuilder.bookExample().book();
        exampleBookDto = BookTestDataBuilder.bookDtoExample().bookDto();
    }

    @Test
    void findBookById_shouldReturnBookDto() {
        // given
        String idToFind = "foo";

        // when
        when(bookRepository.findById(idToFind)).thenReturn(Optional.ofNullable(exampleBook));
        when(modelMapper.toBookDto(exampleBook)).thenReturn(exampleBookDto);
        BookDto expected = exampleBookDto;
        BookDto actual = bookService.findBookById(idToFind);

        // then
        assertEquals(expected, actual);
    }

    @Test
    void findBookById_shouldThrowBookNotFoundException() {
        // given
        String idToFind = "foo";

        // when
        when(bookRepository.findById(idToFind)).thenReturn(Optional.empty());

        // then
        assertThrows(BookNotFoundException.class, () -> bookService.findBookById(idToFind));
    }

    @Test
    void findAllBooks_shouldReturnListOfBookDtos() {
        // given
        List<Book> booksExamples = BookTestDataBuilder.exampleBookList();
        List<BookDto> bookDtosExamples = BookTestDataBuilder.exampleBookDtoList();

        // when
        when(bookRepository.findAll()).thenReturn(booksExamples);
        for (int i = 0; i < booksExamples.size(); i++) {
            when(modelMapper.toBookDto(booksExamples.get(i)))
                    .thenReturn(bookDtosExamples.get(i));
        }
        List<BookDto> expected = bookDtosExamples;
        List<BookDto> actual = bookService.findAllBooks();

        // then
        assertEquals(expected, actual);
    }

    @Test
    void addBook_shouldReturnBookDto() {
        // given
        BookDto bookDtoToAdd = BookTestDataBuilder.bookDtoExampleWithoutId().bookDto();
        Book bookToAdd = BookTestDataBuilder.bookExampleWithoutId().book();

        // when
        when(modelMapper.toBookEntity(bookDtoToAdd)).thenReturn(bookToAdd);
        for (AuthorDto authorDto : bookDtoToAdd.getAuthorList()) {
            when(authorRepository.findByFirstNameAndLastName(authorDto.getFirstName(), authorDto.getLastName()))
                    .thenReturn(Optional.ofNullable(
                            Author.builder()
                                    .id(authorDto.getId())
                                    .firstName(authorDto.getFirstName())
                                    .lastName(authorDto.getLastName())
                                    .build()
                    ));
        }
        when(bookRepository.save(bookToAdd)).thenReturn(bookToAdd);
        when(modelMapper.toBookDto(bookToAdd)).thenReturn(bookDtoToAdd);
        when(bookRepository.save(bookToAdd)).thenReturn(bookToAdd);
        when(modelMapper.toBookDto(bookToAdd)).thenReturn(bookDtoToAdd);
        BookDto expected = bookDtoToAdd;
        BookDto actual = bookService.addBook(bookDtoToAdd);

        // then
        assertEquals(expected, actual);
    }

    @Test
    void deleteBook_shouldDeleteBook() {
        // given
        String idToDelete = "foo";

        // when
        when(bookRepository.findById(idToDelete)).thenReturn(Optional.ofNullable(exampleBook));
        bookService.deleteBook(idToDelete);

        // then
        verify(bookRepository).deleteById(idToDelete);
    }

    @Test
    void deleteBook_shouldThrowBookNotFoundException() {
        // given
        String idToDelete = "foo";

        // when
        when(bookRepository.findById(idToDelete)).thenReturn(Optional.empty());

        // then
        assertThrows(BookNotFoundException.class, () -> bookService.deleteBook(idToDelete));
    }

    @Test
    void updateBook_shouldReturnUpdatedBookDto() {
        // given
        String existingBookId = "foo";
        BookDto inputBook = BookTestDataBuilder.bookDtoExampleWithoutId().bookDto();
        Book newBook = BookTestDataBuilder.bookExampleWithoutId().book();

        // when
        BookDto bookInProgress = inputBook;
        bookInProgress.setId(existingBookId);

        when(bookRepository.findById(existingBookId)).thenReturn(Optional.ofNullable(exampleBook));
        when(modelMapper.toBookEntity(bookInProgress)).thenReturn(newBook);
        when(bookRepository.save(newBook)).thenReturn(newBook);
        when(modelMapper.toBookDto(newBook)).thenReturn(bookInProgress);
        BookDto expected = bookInProgress;
        BookDto actual = bookService.updateBook(existingBookId, inputBook);

        // then
        assertEquals(expected, actual);
    }

}
