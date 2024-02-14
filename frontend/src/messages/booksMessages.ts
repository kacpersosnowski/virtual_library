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
  bookReviewsTitle: {
    key: "books >> reviews >> title",
    pl: "Recenzje",
    en: "Reviews",
  },
  bookReviewsNoReviews: {
    key: "books >> reviews >> no_reviews",
    pl: "Ta książka nie ma jeszcze recenzji.",
    en: "This book doesn't have any reviews yet.",
  },
  bookReviewsEditTooltip: {
    key: "books >> reviews >> edit_tooltip",
    pl: "Edytuj",
    en: "Edit",
  },
  bookReviewsDeleteTooltip: {
    key: "books >> reviews >> delete_tooltip",
    pl: "Usuń",
    en: "Delete",
  },
  bookReviewsAddFormLogin: {
    key: "books >> reviews_form >> login",
    pl: "Zaloguj się, aby dodać recenzję",
    en: "Log in to add a review",
  },
  bookReviewsAddFormRating: {
    key: "books >> reviews_form >> rating",
    pl: "Ocena",
    en: "Rating",
  },
  bookReviewsAddFormContent: {
    key: "books >> reviews_form >> content",
    pl: "Treść",
    en: "Content",
  },
  bookReviewsAddFormSubmitButton: {
    key: "books >> reviews_form >> submit_button",
    pl: "Dodaj recenzję",
    en: "Add review",
  },
  bookReviewsAddFormSuccess: {
    key: "books >> reviews_form >> add_success",
    pl: "Recenzja została dodana pomyślnie.",
    en: "The review was added successfully.",
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
