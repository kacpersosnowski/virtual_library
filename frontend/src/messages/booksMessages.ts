import Message from "../types/Message";

const booksMessages: Message = {
  bookItemDetails: {
    key: "books >> book_item >> details",
    pl: "Szczegóły",
    en: "Details",
  },
  bookAuthor: {
    key: "books >> book_details >> author",
    pl: "Autor",
    en: "Author",
  },
  bookGenre: {
    key: "books >> book_details >> genre",
    pl: "Gatunek",
    en: "Genre",
  },
  bookTags: {
    key: "books >> book_details >> tags",
    pl: "Tagi",
    en: "Tags",
  },
  bookLanguage: {
    key: "books >> book_details >> language",
    pl: "Język",
    en: "Language",
  },
  readBook: {
    key: "books >> book_details >> read",
    pl: "Czytaj",
    en: "Read",
  },
  bookDescription: {
    key: "books >> book_details >> description",
    pl: "Opis",
    en: "Description",
  },
  enterFullscreen: {
    key: "books >> read_book >> enter_full_screen",
    pl: "Pełny ekran (f)",
    en: "Fullscreen (f)",
  },
  exitFullscreen: {
    key: "books >> read_book >> exit_full_screen",
    pl: "Zamknij pełny ekran (f)",
    en: "Exit (f)",
  },
};

export default booksMessages;
