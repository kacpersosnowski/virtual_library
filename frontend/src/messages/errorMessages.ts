import Message from "../types/Message";

const errorMessages: Message = {
  fetchBookListError: {
    key: "books >> fetch_list >> error",
    pl: "Pobieranie książek zakończyło się niepowodzeniem. Spróbuj ponownie później.",
    en: "Failed to fetch books. Try again later.",
  },
};

export default errorMessages;
