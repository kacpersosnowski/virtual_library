import Message from "../types/Message";

const errorMessages: Message = {
  fetchBookListError: {
    key: "books >> fetch_list >> error",
    pl: "Pobieranie książek zakończyło się niepowodzeniem. Spróbuj ponownie później.",
    en: "Failed to fetch books. Try again later.",
  },
  fetchBookDetailsError: {
    key: "books >> fetch_details >> error",
    pl: "Nie udało się pobrać informacji o tej książce. Spróbuj ponownie później.",
    en: "Failed to fetch information about this book. Try again later.",
  },
  deleteBookError: {
    key: "books >> delete >> error",
    pl: "Nie udało się usunąć książki. Spróbuj ponownie później.",
    en: "Failed to delete the book. Try again later.",
  },
  deleteAuthorError: {
    key: "authors >> delete >> error",
    pl: "Nie udało się usunąć autora. Spróbuj ponownie później.",
    en: "Failed to delete the author. Try again later.",
  },
  deleteAuthorErrorBooksExist: {
    key: "authors >> delete >> error_books_exist",
    pl: "Ten autor jest przypisany do książki (książek) i nie może zostać usunięty.",
    en: "This author is assigned to book(s) and cannot be deleted.",
  },
  fetchAuthorListError: {
    key: "authors >> fetch_list >> error",
    pl: "Pobieranie autorów zakończyło się niepowodzeniem. Spróbuj ponownie później.",
    en: "Failed to fetch authors. Try again later.",
  },
  deleteGenreError: {
    key: "genres >> delete >> error",
    pl: "Nie udało się usunąć gatunku. Spróbuj ponownie później.",
    en: "Failed to delete the genre. Try again later.",
  },
  deleteGenreErrorBooksExist: {
    key: "genres >> delete >> error_books_exist",
    pl: "Ten gatunek jest przypisany do książki (książek) i nie może zostać usunięty.",
    en: "This genre is assigned to book(s) and cannot be deleted.",
  },
  fetchGenreListError: {
    key: "genres >> fetch_list >> error",
    pl: "Pobieranie gatunków zakończyło się niepowodzeniem. Spróbuj ponownie później.",
    en: "Failed to fetch genres. Try again later.",
  },
  bookContentError: {
    key: "books >> read_book >> content",
    pl: "Nie udało się wczytać zawartości książki. Spróbuj ponownie później.",
    en: "Failed to load the book's content. Try again later.",
  },
  userDataError: {
    key: "users >> user_data >> error",
    pl: "Nie udało się wczytać danych użytkownika. Spróbuj ponownie później.",
    en: "Failed to load user data. Try again later.",
  },
  somethingWentWrongError: {
    key: "something_went_wrong >> error",
    pl: "Coś poszło nie tak. Spróbuj ponownie później",
    en: "Something went wrong. Try again later",
  },
  pageNotFoundError: {
    key: "page_not_found >> error",
    pl: "Tutaj nic nie mamy. Jeżeli się zgubiłeś, wróć na",
    en: "We do not have anything here. If you got lost go back to",
  },
  pageNotFoundErrorMainPage: {
    key: "page_not_found >> error >> main_page",
    pl: "stronę główną.",
    en: "the main page.",
  },
};

export default errorMessages;
