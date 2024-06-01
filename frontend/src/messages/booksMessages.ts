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
  readBookAccess: {
    key: "books >> book_details >> read_access",
    pl: "Dostęp do czytania tylko dla zalogowanych użytkowników",
    en: "Access to reading only for logged-in users",
  },
  saveBookOnList: {
    key: "books >> book_details >> save_on_list",
    pl: "Zapisz",
    en: "Save",
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
  bookReviewsUpdateFormSaveButton: {
    key: "books >> reviews_form >> save_button",
    pl: "Zapisz",
    en: "Save",
  },
  bookReviewsUpdateFormCancelButton: {
    key: "books >> reviews_form >> cancel_button",
    pl: "Anuluj",
    en: "Cancel",
  },
  bookReviewsUpdateFormSuccess: {
    key: "books >> reviews_form >> update_success",
    pl: "Recenzja została zaktualizowana pomyślnie.",
    en: "The review was updated successfully.",
  },
  bookReviewsDeleteFormDialogTitle: {
    key: "books >> reviews_form >> delete_dialog_title",
    pl: "Czy na pewno chcesz usunąć tę recenzję?",
    en: "Are you sure you want to delete this review?",
  },
  bookReviewsDeleteFormDialogContent: {
    key: "books >> reviews_form >> delete_dialog_content",
    pl: "Operacja nie może zostać cofnięta.",
    en: "The operation cannot be undone.",
  },
  bookReviewsDeleteFormSuccess: {
    key: "books >> reviews_form >> delete_success",
    pl: "Recenzja została usunięta pomyślnie.",
    en: "The review was deleted successfully.",
  },
  bookReviewsUpdated: {
    key: "books >> reviews >> updated",
    pl: "Edytowano",
    en: "Edited",
  },
  booksListPopularHeader: {
    key: "books_list >> popular >> header",
    pl: "Popularne w ostatnim czasie",
    en: "Recently popular",
  },
  booksListBestRatedHeader: {
    key: "books_list >> best_rated >> header",
    pl: "Najlepiej oceniane",
    en: "Best rated",
  },
  booksListLoadMoreButtonText: {
    key: "books_list >> load_more >> button_text",
    pl: "Wczytaj więcej",
    en: "Load more",
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
  searchResultsHeader: {
    key: "books >> search_books >> header",
    pl: "Wyniki wyszukiwania",
    en: "Search results",
  },
  noSearchResults: {
    key: "books >> search_books >> no_results",
    pl: "Brak wyników",
    en: "No results",
  },
};

export default booksMessages;
