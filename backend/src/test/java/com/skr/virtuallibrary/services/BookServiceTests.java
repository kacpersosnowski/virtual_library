package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.controllers.responses.PagedResponse;
import com.skr.virtuallibrary.dto.AuthorDto;
import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.dto.GenreDto;
import com.skr.virtuallibrary.entities.Author;
import com.skr.virtuallibrary.entities.Book;
import com.skr.virtuallibrary.entities.Genre;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.AuthorRepository;
import com.skr.virtuallibrary.repositories.BookRepository;
import com.skr.virtuallibrary.repositories.GenreRepository;
import com.skr.virtuallibrary.services.testData.BookTestDataBuilder;
import org.instancio.Instancio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.instancio.Select.field;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {BookRepository.class})
class BookServiceTests {

    @InjectMocks
    private BookService bookService;

    @Mock
    private BookRepository bookRepository;

    @Mock
    private AuthorRepository authorRepository;

    @Mock
    private GenreRepository genreRepository;

    @Mock
    private ModelMapper modelMapper;

    private Book exampleBook;

    @BeforeEach
    final void setUp() {
        exampleBook = BookTestDataBuilder.bookExample().book();
    }

    @Test
    void findBookById_shouldReturnBookDto() {
        // given
        String idToFind = "foo";
        BookDto bookToFindDto = Instancio.of(BookDto.class)
                .set(field(BookDto::getAuthorList), Instancio.ofList(AuthorDto.class).size(2).create())
                .set(field(BookDto::getGenreList), Instancio.ofList(GenreDto.class).size(2).create())
                .create();
        Book bookToFind = Instancio.of(Book.class)
                .set(field(Book::getAuthorIdList), Instancio.ofList(String.class).size(2).create())
                .set(field(Book::getGenreIdList), Instancio.ofList(String.class).size(2).create())
                .create();

        // when
        when(bookRepository.findById(idToFind)).thenReturn(Optional.ofNullable(bookToFind));
        for (AuthorDto authorDto : bookToFindDto.getAuthorList()) {
            Author tempAuthor = Author.builder()
                    .id(authorDto.getId())
                    .firstName(authorDto.getFirstName())
                    .lastName(authorDto.getLastName())
                    .build();
            assert bookToFind != null;
            String authorId = bookToFind.getAuthorIdList().get(bookToFindDto.getAuthorList().indexOf(authorDto));

            when(authorRepository.findById(authorId))
                    .thenReturn(Optional.ofNullable(tempAuthor));
            when(modelMapper.toAuthorDto(tempAuthor))
                    .thenReturn(authorDto);
        }
        for (GenreDto genreDto : bookToFindDto.getGenreList()) {
            Genre tempGenre = Genre.builder()
                    .id(genreDto.getId())
                    .name(genreDto.getName())
                    .build();
            assert bookToFind != null;
            String genreId = bookToFind.getGenreIdList().get(bookToFindDto.getGenreList().indexOf(genreDto));

            when(genreRepository.findById(genreId))
                    .thenReturn(Optional.ofNullable(tempGenre));
            when(modelMapper.toGenreDto(tempGenre))
                    .thenReturn(genreDto);
        }
        when(modelMapper.toBookDto(bookToFind, bookToFindDto.getAuthorList(), bookToFindDto.getGenreList()))
                .thenReturn(bookToFindDto);

        BookDto expected = bookToFindDto;
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
        List<BookDto> bookDtosExamples = Instancio.ofList(BookDto.class).size(3)
                .set(field(BookDto::getAuthorList), Instancio.ofList(AuthorDto.class).size(3).create())
                .set(field(BookDto::getGenreList), Instancio.ofList(GenreDto.class).size(3).create())
                .create();
        List<Book> booksExamples = Instancio.ofList(Book.class).size(3)
                .set(field(Book::getAuthorIdList), Instancio.ofList(String.class).size(3).create())
                .set(field(Book::getGenreIdList), Instancio.ofList(String.class).size(3).create())
                .create();

        // when
        when(bookRepository.findAll()).thenReturn(booksExamples);
        for (BookDto bookDto : bookDtosExamples) {
            for (AuthorDto authorDto : bookDto.getAuthorList()) {
                Author tempAuthor = Author.builder()
                        .id(authorDto.getId())
                        .firstName(authorDto.getFirstName())
                        .lastName(authorDto.getLastName())
                        .build();
                String authorId = booksExamples.get(bookDtosExamples.indexOf(bookDto))
                        .getAuthorIdList().get(bookDto.getAuthorList().indexOf(authorDto));

                when(authorRepository.findById(authorId))
                        .thenReturn(Optional.ofNullable(tempAuthor));
                when(modelMapper.toAuthorDto(tempAuthor))
                        .thenReturn(authorDto);
            }

            for (GenreDto genreDto : bookDto.getGenreList()) {
                Genre tempGenre = Genre.builder()
                        .id(genreDto.getId())
                        .name(genreDto.getName())
                        .build();
                String genreId = booksExamples.get(bookDtosExamples.indexOf(bookDto))
                        .getGenreIdList().get(bookDto.getGenreList().indexOf(genreDto));

                when(genreRepository.findById(genreId))
                        .thenReturn(Optional.ofNullable(tempGenre));
                when(modelMapper.toGenreDto(tempGenre))
                        .thenReturn(genreDto);
            }

            when(modelMapper.toBookDto(booksExamples.get(bookDtosExamples.indexOf(bookDto)), bookDto.getAuthorList(), bookDto.getGenreList()))
                    .thenReturn(bookDto);
        }

        PagedResponse<BookDto> actual = bookService.findAllBooks();
        PagedResponse<BookDto> expected = new PagedResponse<>(bookDtosExamples);

        // then
        assertThat(actual).usingRecursiveComparison().isEqualTo(expected);
    }

    @Test
    void addBook_shouldReturnBookDto() {
        // given
        BookDto bookDtoToAdd = Instancio.of(BookDto.class)
                .set(field(BookDto::getAuthorList), Instancio.ofList(AuthorDto.class).size(2).create())
                .set(field(BookDto::getGenreList), Instancio.ofList(GenreDto.class).size(2).create())
                .create();
        Book bookToAdd = Instancio.of(Book.class)
                .set(field(Book::getAuthorIdList), Instancio.ofList(String.class).size(2).create())
                .set(field(Book::getGenreIdList), Instancio.ofList(String.class).size(2).create())
                .create();

        // when
        when(modelMapper.toBookEntity(bookDtoToAdd)).thenReturn(bookToAdd);
        for (AuthorDto authorDto : bookDtoToAdd.getAuthorList()) {
            Author tempAuthor = Author.builder()
                    .id(authorDto.getId())
                    .firstName(authorDto.getFirstName())
                    .lastName(authorDto.getLastName())
                    .build();

            // to entity
            when(authorRepository.findByFirstNameAndLastName(authorDto.getFirstName(), authorDto.getLastName()))
                    .thenReturn(Optional.ofNullable(tempAuthor));

            // to dto
            when(authorRepository.findById(authorDto.getId()))
                    .thenReturn(Optional.ofNullable(tempAuthor));
            when(modelMapper.toAuthorDto(tempAuthor))
                    .thenReturn(authorDto);
        }
        for (GenreDto genreDto : bookDtoToAdd.getGenreList()) {
            Genre tempGenre = Genre.builder()
                    .id(genreDto.getId())
                    .name(genreDto.getName())
                    .build();

            // to entity
            when(genreRepository.findByName(genreDto.getName()))
                    .thenReturn(Optional.ofNullable(tempGenre));

            // to dto
            when(genreRepository.findById(genreDto.getId()))
                    .thenReturn(Optional.ofNullable(tempGenre));
            when(modelMapper.toGenreDto(tempGenre))
                    .thenReturn(genreDto);
        }
        when(bookRepository.save(bookToAdd)).thenReturn(bookToAdd);
        when(modelMapper.toBookDto(bookToAdd, bookDtoToAdd.getAuthorList(), bookDtoToAdd.getGenreList()))
                .thenReturn(bookDtoToAdd);

        BookDto expected = bookDtoToAdd;
        BookDto actual = bookService.addBook(bookDtoToAdd);

        // then
        assertThat(expected).usingRecursiveComparison().isEqualTo(actual);
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
        BookDto inputBook = Instancio.of(BookDto.class)
                .set(field(BookDto::getAuthorList), Instancio.ofList(AuthorDto.class).size(2).create())
                .set(field(BookDto::getGenreList), Instancio.ofList(GenreDto.class).size(2).create())
                .create();
        Book newBook = Instancio.of(Book.class)
                .set(field(Book::getAuthorIdList), Instancio.ofList(String.class).size(2).create())
                .set(field(Book::getGenreIdList), Instancio.ofList(String.class).size(2).create())
                .create();

        // when
        when(bookRepository.findById(existingBookId)).thenReturn(Optional.ofNullable(exampleBook));
        when(modelMapper.toBookEntity(inputBook)).thenReturn(newBook);
        for (AuthorDto authorDto : inputBook.getAuthorList()) {
            Author tempAuthor = Author.builder()
                    .id(authorDto.getId())
                    .firstName(authorDto.getFirstName())
                    .lastName(authorDto.getLastName())
                    .build();

            // to entity
            when(authorRepository.findByFirstNameAndLastName(authorDto.getFirstName(), authorDto.getLastName()))
                    .thenReturn(Optional.ofNullable(tempAuthor));

            // to dto
            when(authorRepository.findById(authorDto.getId()))
                    .thenReturn(Optional.ofNullable(tempAuthor));
            when(modelMapper.toAuthorDto(tempAuthor))
                    .thenReturn(authorDto);
        }
        for (GenreDto genreDto : inputBook.getGenreList()) {
            Genre tempGenre = Genre.builder()
                    .id(genreDto.getId())
                    .name(genreDto.getName())
                    .build();

            // to entity
            when(genreRepository.findByName(genreDto.getName()))
                    .thenReturn(Optional.ofNullable(tempGenre));

            // to dto
            when(genreRepository.findById(genreDto.getId()))
                    .thenReturn(Optional.ofNullable(tempGenre));
            when(modelMapper.toGenreDto(tempGenre))
                    .thenReturn(genreDto);
        }
        when(bookRepository.save(newBook)).thenReturn(newBook);

        when(modelMapper.toBookDto(newBook, inputBook.getAuthorList(), inputBook.getGenreList()))
                .thenReturn(inputBook);

        BookDto expected = inputBook;
        BookDto actual = bookService.updateBook(existingBookId, inputBook);

        // then
        assertEquals(expected, actual);
    }

}
