import Message from "../types/Message";

const errorMessages: Message = {
  fetchBookListError: {
    key: "books >> fetch_list >> error",
    pl: "Pobieranie książek zakończyło się niepowodzeniem. Spróbuj ponownie później.",
    en: "Failed to fetch books. Try again later.",
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
