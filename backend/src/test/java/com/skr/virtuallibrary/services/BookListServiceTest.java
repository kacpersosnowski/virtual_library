package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.dto.BookListDto;
import com.skr.virtuallibrary.entities.BookList;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Authority;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.BookListRepository;
import org.instancio.Instancio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.instancio.Select.field;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {BookListRepository.class})
class BookListServiceTest {

    @InjectMocks
    private BookListService bookListService;

    @Mock
    private BookListRepository bookListRepository;

    @Mock
    private UserService userService;

    @Mock
    private BookService bookService;

    @Mock
    private ModelMapper modelMapper;

    public static final String USERNAME = "username";

    public static final String PASSWORD = "Password123!";

    public User exampleUser;

    public BookList toReadBookList;

    @BeforeEach
    final void setUp() {
        exampleUser = User.builder()
                .id("userFoo")
                .email("example@example.com")
                .authority(Authority.USER)
                .language(Language.ENG)
                .username(USERNAME)
                .password(PASSWORD)
                .build();
        toReadBookList = BookList.builder()
                .name("To Read")
                .userId(exampleUser.getId())
                .editable(false)
                .build();
    }

    @Test
    @WithMockUser(username = USERNAME, password = PASSWORD)
    void findBookListById_shouldReturnBookListDto() {
        // given
        String idToFind = "foo";
        BookListDto bookListToFindDto = Instancio.of(BookListDto.class)
                .set(field(BookListDto::getBooks), Instancio.ofList(BookDto.class).size(2).create())
                .set(field(BookListDto::getUserId), exampleUser.getId())
                .create();
        BookList bookListToFind = Instancio.of(BookList.class)
                .set(field(BookList::getBookIds), Instancio.ofList(String.class).size(2).create())
                .set(field(BookList::getUserId), exampleUser.getId())
                .create();
        List<BookDto> booksInList = Instancio.ofList(BookDto.class).size(2).create();

        // when
        when(userService.getCurrentUser()).thenReturn(exampleUser);
        when(bookListRepository.findById(idToFind)).thenReturn(Optional.ofNullable(bookListToFind));
        for (int i = 0; i < booksInList.size(); i++) {
            assert bookListToFind != null;
            when(bookService.findBookById(bookListToFind.getBookIds().get(i))).thenReturn(booksInList.get(i));
        }
        when(modelMapper.toBookListDto(bookListToFind, booksInList)).thenReturn(bookListToFindDto);

        BookListDto expected = bookListToFindDto;
        BookListDto actual = bookListService.getBookList(idToFind);

        // then
        assertThat(actual).usingRecursiveComparison().isEqualTo(expected);
    }
}
