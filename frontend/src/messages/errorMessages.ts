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
