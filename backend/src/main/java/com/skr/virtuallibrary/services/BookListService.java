package com.skr.virtuallibrary.services;

import com.skr.virtuallibrary.dto.BookDto;
import com.skr.virtuallibrary.dto.BookListDto;
import com.skr.virtuallibrary.entities.BookList;
import com.skr.virtuallibrary.entities.User;
import com.skr.virtuallibrary.entities.enums.Language;
import com.skr.virtuallibrary.exceptions.AccessForbiddenException;
import com.skr.virtuallibrary.exceptions.BookListAlreadyExistsException;
import com.skr.virtuallibrary.exceptions.BookListNotFoundException;
import com.skr.virtuallibrary.exceptions.BookNotFoundException;
import com.skr.virtuallibrary.mapping.ModelMapper;
import com.skr.virtuallibrary.repositories.BookListRepository;
import com.skr.virtuallibrary.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookListService {

    private final BookListRepository bookListRepository;

    private final UserService userService;

    private final BookRepository bookRepository;

    private final BookService bookService;

    private final ModelMapper modelMapper;

    private static final String BOOK_LIST_NOT_FOUND = "Book list not found wit id: ";

    private static final String ACCESS_DENIED = "You don't have access to this book list.";

    public List<BookListDto> getBookLists() {
        User user = userService.getCurrentUser();
        List<BookList> bookList = bookListRepository.findAllByUserId(user.getId());
        return bookList.stream().map(this::toBookListDto).toList();
    }

    public BookListDto getBookList(String id) {
        User user = userService.getCurrentUser();
        BookList bookList = bookListRepository.findById(id)
                .orElseThrow(() -> new BookListNotFoundException(BOOK_LIST_NOT_FOUND + id));
        if (!bookList.getUserId().equals(user.getId())) {
            throw new AccessForbiddenException(ACCESS_DENIED);
        }
        return toBookListDto(bookList);
    }

    public BookListDto createBookList(BookListDto bookListDto) {
        User user = userService.getCurrentUser();
        if (bookListRepository.findAllByNameAndUserId(bookListDto.getName(), user.getId()).isPresent()) {
            throw new BookListAlreadyExistsException(bookListDto.getName());
        }
        for (String bookId : bookListDto.getBooks().stream().map(BookDto::getId).toList()) {
            if (bookRepository.findById(bookId).isEmpty()) {
                throw new BookNotFoundException("Book not found with id: " + bookId);
            }
        }

        return toBookListDto(bookListRepository.save(
                BookList.builder()
                        .userId(user.getId())
                        .name(bookListDto.getName())
                        .editable(true)
                        .bookIds(bookListDto.getBooks().stream().map(BookDto::getId).toList())
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
            return toBookListDto(bookList);
        }
        if (bookRepository.findById(bookId).isEmpty()) {
            throw new BookNotFoundException("Book not found with id: " + bookId);
        }

        bookList.getBookIds().add(bookId);
        return toBookListDto(bookListRepository.save(bookList));
    }

    public BookListDto removeBookFromList(String id, String bookId) {
        User user = userService.getCurrentUser();
        BookList bookList = bookListRepository.findById(id)
                .orElseThrow(() -> new BookListNotFoundException(BOOK_LIST_NOT_FOUND + id));
        if (!bookList.getUserId().equals(user.getId())) {
            throw new AccessForbiddenException(ACCESS_DENIED);
        }
        bookList.getBookIds().remove(bookId);
        return toBookListDto(bookListRepository.save(bookList));
    }

    public BookListDto changeName(String id, String name) {
        User user = userService.getCurrentUser();
        BookList bookList = bookListRepository.findById(id)
                .orElseThrow(() -> new BookListNotFoundException(BOOK_LIST_NOT_FOUND + id));
        if (!bookList.getUserId().equals(user.getId()) || !bookList.isEditable()) {
            throw new AccessForbiddenException(ACCESS_DENIED);
        }
        if (bookListRepository.findAllByNameAndUserId(name, user.getId()).isPresent()) {
            throw new BookListAlreadyExistsException(bookList.getName());
        }

        bookList.setName(name);
        return toBookListDto(bookListRepository.save(bookList));
    }

    public void deleteBookList(String id) {
        User user = userService.getCurrentUser();
        BookList bookList = bookListRepository.findById(id)
                .orElseThrow(() -> new BookListNotFoundException(BOOK_LIST_NOT_FOUND + id));
        if (!bookList.getUserId().equals(user.getId())) {
            throw new AccessForbiddenException(ACCESS_DENIED);
        }
        if (!bookList.isEditable()) {
            throw new AccessForbiddenException("You can't delete this book list.");
        }

        bookListRepository.deleteById(id);
    }

    public void createToReadList(User user) {
        BookList bookList = BookList.builder()
                .userId(user.getId())
                .name(toReadListName(user))
                .editable(false)
                .bookIds(List.of())
                .build();
        bookListRepository.save(bookList);
    }

    private String toReadListName(User user) {
        return user.getLanguage().equals(Language.PL) ? "Do przeczytania" : "To Read";
    }

    private BookListDto toBookListDto(BookList bookList) {
        List<BookDto> books = bookList.getBookIds().stream().map(bookService::findBookById).toList();
        return modelMapper.toBookListDto(bookList, books);
    }
}
