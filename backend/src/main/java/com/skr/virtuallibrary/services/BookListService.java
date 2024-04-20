package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.BookListDto;
import com.skr.virtuallibrary.entities.BookList;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.exceptions.AccessForbiddenException;
import com.skr.virtuallibrary.exceptions.BookListAlreadyExistsException;
import com.skr.virtuallibrary.exceptions.BookListNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.BookListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookListService {

    private final BookListRepository bookListRepository;

    private final UserService userService;

    private final ModelMapper modelMapper;

    private static final String BOOK_LIST_NOT_FOUND = "Book list not found wit id: ";

    private static final String ACCESS_DENIED = "You don't have access to this book list.";

    public List<BookListDto> getBookLists() {
        User user = userService.getCurrentUser();
        List<BookList> bookLists = bookListRepository.findAllByUserId(user.getId());
        if (bookListRepository.findAllByNameAndUserId(toReadListName(user), user.getId()).isEmpty()) {
            BookList toReadList = createToReadList(user);
            bookLists.add(toReadList);
        }
        return bookLists.stream().map(modelMapper::toBookListDto).toList();
    }

    public BookListDto getBookList(String id) {
        User user = userService.getCurrentUser();
        BookList bookList = bookListRepository.findById(id)
                .orElseThrow(() -> new BookListNotFoundException(BOOK_LIST_NOT_FOUND + id));
        if (!bookList.getUserId().equals(user.getId())) {
            throw new AccessForbiddenException(ACCESS_DENIED);
        }
        return modelMapper.toBookListDto(bookList);
    }

    public BookListDto createBookList(BookListDto bookListDto) {
        User user = userService.getCurrentUser();
        if (!bookListRepository.findAllByNameAndUserId(bookListDto.getName(), user.getId()).isEmpty()) {
            throw new BookListAlreadyExistsException(bookListDto.getName());
        }

        return modelMapper.toBookListDto(bookListRepository.save(
                BookList.builder()
                        .userId(user.getId())
                        .name(bookListDto.getName())
                        .deletable(true)
                        .bookIds(bookListDto.getBookIds())
                        .build()
        ));
    }

    public BookListDto addBookToList(String id, String bookId) {
        User user = userService.getCurrentUser();
        BookList bookList = bookListRepository.findById(id)
                .orElseThrow(() -> new BookListNotFoundException(BOOK_LIST_NOT_FOUND + id));
        if (!bookList.getUserId().equals(user.getId())) {
            throw new AccessForbiddenException(ACCESS_DENIED);
        }
        if (bookList.getBookIds().contains(bookId)) {
            return modelMapper.toBookListDto(bookList);
        }

        bookList.getBookIds().add(bookId);
        return modelMapper.toBookListDto(bookListRepository.save(bookList));
    }

    public BookListDto removeBookFromList(String id, String bookId) {
        User user = userService.getCurrentUser();
        BookList bookList = bookListRepository.findById(id)
                .orElseThrow(() -> new BookListNotFoundException(BOOK_LIST_NOT_FOUND + id));
        if (!bookList.getUserId().equals(user.getId())) {
            throw new AccessForbiddenException(ACCESS_DENIED);
        }
        bookList.getBookIds().remove(bookId);
        return modelMapper.toBookListDto(bookListRepository.save(bookList));
    }

    public BookListDto changeName(String id, String name) {
        User user = userService.getCurrentUser();
        BookList bookList = bookListRepository.findById(id)
                .orElseThrow(() -> new BookListNotFoundException(BOOK_LIST_NOT_FOUND + id));
        if (!bookList.getUserId().equals(user.getId())) {
            throw new AccessForbiddenException(ACCESS_DENIED);
        }
        if (!bookListRepository.findAllByNameAndUserId(name, user.getId()).isEmpty()) {
            throw new BookListAlreadyExistsException(bookList.getName());
        }

        bookList.setName(name);
        return modelMapper.toBookListDto(bookListRepository.save(bookList));
    }

    public void deleteBookList(String id) {
        User user = userService.getCurrentUser();
        BookList bookList = bookListRepository.findById(id)
                .orElseThrow(() -> new BookListNotFoundException(BOOK_LIST_NOT_FOUND + id));
        if (!bookList.getUserId().equals(user.getId())) {
            throw new AccessForbiddenException(ACCESS_DENIED);
        }
        if (!bookList.isDeletable()) {
            throw new AccessForbiddenException("You can't delete this book list.");
        }

        bookListRepository.deleteById(id);
    }

    private BookList createToReadList(User user) {
        BookList bookList = BookList.builder()
                .userId(user.getId())
                .name(toReadListName(user))
                .deletable(false)
                .bookIds(List.of())
                .build();
        return bookListRepository.save(bookList);
    }

    private String toReadListName(User user) {
        return user.getLanguage().equals(Language.PL) ? "Do przeczytania" : "To Read";
    }
}
