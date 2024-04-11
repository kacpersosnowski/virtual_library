package com.skr.virtuallibrary.services;

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
    private ModelMapper modelMapper;

    public static final String USERNAME = "username";

    public static final String PASSWORD = "Password123!";

    public User exampleUser;

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
    }

    @Test
    @WithMockUser(username = USERNAME, password = PASSWORD)
    void findBookListById_shouldReturnBookListDto() {
        // given
        String idToFind = "foo";
        BookListDto bookListToFindDto = Instancio.of(BookListDto.class)
                .set(field(BookListDto::getBookIds), Instancio.ofList(String.class).size(2).create())
                .set(field(BookListDto::getUserId), exampleUser.getId())
                .create();
        BookList bookListToFind = Instancio.of(BookList.class)
                .set(field(BookList::getBookIds), Instancio.ofList(String.class).size(2).create())
                .set(field(BookList::getUserId), exampleUser.getId())
                .create();

        // when
        when(userService.getCurrentUser()).thenReturn(exampleUser);
        when(bookListRepository.findById(idToFind)).thenReturn(Optional.ofNullable(bookListToFind));
        when(modelMapper.toBookListDto(bookListToFind)).thenReturn(bookListToFindDto);

        BookListDto expected = bookListToFindDto;
        BookListDto actual = bookListService.getBookList(idToFind);

        // then
        assertThat(actual).usingRecursiveComparison().isEqualTo(expected);
    }

    @Test
    @WithMockUser(username = USERNAME, password = PASSWORD)
    void findBookLists_shouldReturnBookListDto() {
        // given
        List<BookList> bookLists = Instancio.ofList(BookList.class).size(3)
                .set(field(BookList::getBookIds), Instancio.ofList(String.class).size(3).create())
                .set(field(BookList::getUserId), exampleUser.getId())
                .create();
        List<BookListDto> bookListDtos = Instancio.ofList(BookListDto.class).size(3)
                .set(field(BookListDto::getBookIds), Instancio.ofList(String.class).size(3).create())
                .set(field(BookListDto::getUserId), exampleUser.getId())
                .create();

        // when
        when(userService.getCurrentUser()).thenReturn(exampleUser);
        when(bookListRepository.findAllByNameAndUserId("To Read", exampleUser.getId()).isEmpty())
                .thenReturn(false);
        when(bookListRepository.findAllByUserId(exampleUser.getId())).thenReturn(bookLists);
        for (int i = 0; i < bookLists.size(); i++) {
            when(modelMapper.toBookListDto(bookLists.get(i)))
                    .thenReturn(bookListDtos.get(i));
        }
        List<BookListDto> expected = bookListDtos;
        List<BookListDto> actual = bookListService.getBookLists();

        // then
        assertThat(actual).usingRecursiveComparison().isEqualTo(expected);
    }
}
