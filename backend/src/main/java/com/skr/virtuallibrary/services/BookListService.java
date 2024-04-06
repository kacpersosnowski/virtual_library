package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.entities.BookList;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.exceptions.AccessForbiddenException;
import com.skr.virtuallibrary.exceptions.BookListAlreadyExistsException;
import com.skr.virtuallibrary.exceptions.BookListNotFoundException;
import com.skr.virtuallibrary.repositories.BookListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookListService {

    private final BookListRepository bookListRepository;

    private final UserService userService;

    private static final String BOOK_LIST_NOT_FOUND = "Book list not found wit id: ";

    private static final String ACCESS_DENIED = "You don't have access to this book list.";

    public List<BookList> getBookLists() {
        User user = userService.getCurrentUser();
        List<BookList> bookLists = bookListRepository.findAllByUserId(user.getId());
        if (bookLists.isEmpty() || bookListRepository.findAllByNameAndUserId(toReadListName(user), user.getId()).isEmpty()) {
            BookList toReadList = createToReadList(user);
            bookLists.add(toReadList);
        }
        return bookLists;
    }

    public BookList getBookList(String id) {
        User user = userService.getCurrentUser();
        BookList bookList = bookListRepository.findById(id)
                .orElseThrow(() -> new BookListNotFoundException(BOOK_LIST_NOT_FOUND + id));
        if (!bookList.getUserId().equals(user.getId())) {
            throw new AccessForbiddenException(ACCESS_DENIED);
        }
        return bookList;
    }

    public BookList createBookList(BookList bookList) {
        User user = userService.getCurrentUser();
        if (!bookListRepository.findAllByNameAndUserId(bookList.getName(), user.getId()).isEmpty()) {
            throw new BookListAlreadyExistsException(bookList.getName());
        }

        return bookListRepository.save(
                BookList.builder()
                        .userId(user.getId())
                        .name(bookList.getName())
                        .deletable(true)
                        .bookIds(bookList.getBookIds())
                        .build()
        );
    }

    public BookList addBookToList(String id, String bookId) {
        User user = userService.getCurrentUser();
        BookList bookList = bookListRepository.findById(id)
                .orElseThrow(() -> new BookListNotFoundException(BOOK_LIST_NOT_FOUND + id));
        if (!bookList.getUserId().equals(user.getId())) {
            throw new AccessForbiddenException(ACCESS_DENIED);
        }
        if (bookList.getBookIds().contains(bookId)) {
            return bookList;
        }

        bookList.getBookIds().add(bookId);
        return bookListRepository.save(bookList);
    }

    public BookList removeBookFromList(String id, String bookId) {
        User user = userService.getCurrentUser();
        BookList bookList = bookListRepository.findById(id)
                .orElseThrow(() -> new BookListNotFoundException(BOOK_LIST_NOT_FOUND + id));
        if (!bookList.getUserId().equals(user.getId())) {
            throw new AccessForbiddenException(ACCESS_DENIED);
        }
        bookList.getBookIds().remove(bookId);
        return bookListRepository.save(bookList);
    }

    public BookList changeName(String id, String name) {
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
        return bookListRepository.save(bookList);
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
