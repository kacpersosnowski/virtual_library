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
};

export default errorMessages;
