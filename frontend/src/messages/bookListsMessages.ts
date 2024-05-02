import Message from "../types/Message";

const bookListsMessages: Message = {
  listsNavTitle: {
    key: "lists >> nav_title",
    pl: "Moje listy",
    en: "My lists",
  },
  listsHeaderTitle: {
    key: "lists >> header_title",
    pl: "Moje listy",
    en: "My lists",
  },
  noBooks: {
    key: "lists >> no_books",
    pl: "Brak książek",
    en: "No books",
  },
  editName: {
    key: "lists >> edit_name",
    pl: "Edytuj nazwę",
    en: "Edit name",
  },
  deleteList: {
    key: "lists >> delete_list",
    pl: "Usuń listę",
    en: "Delete list",
  },
  changeNameButton: {
    key: "lists >> change_name_button",
    pl: "Zmień nazwę",
    en: "Change name",
  },
  changeNameCancelButton: {
    key: "lists >> change_name_cancel_button",
    pl: "Anuluj",
    en: "Cancel",
  },
  changeNameSuccessMessage: {
    key: "lists >> change_name_success_message",
    pl: "Nazwa została zmieniona pomyślnie.",
    en: "The name was changed successfully.",
  },
  deleteListSuccessMessage: {
    key: "lists >> delete_list_success_message",
    pl: "Lista została usunięta pomyślnie.",
    en: "The list was deleted successfully.",
  },
  listNameInputLabel: {
    key: "lists >> name_label",
    pl: "Nazwa listy",
    en: "List's name",
  },
  deleteListDialogTitle: {
    key: "lists >> delete_dialog >> title",
    pl: "Czy na pewno chcesz usunąć tę listę?",
    en: "Are you sure you want to delete this list?",
  },
  deleteListDialogContentText: {
    key: "lists >> delete_dialog >> content_text",
    pl: "Operacja nie może być cofnięta.",
    en: "The operation cannot be undone.",
  },
  deleteListCancelButtonText: {
    key: "lists >> delete_dialog >> cancel_button",
    pl: "Anuluj",
    en: "Cancel",
  },
  deleteListDeleteButtonText: {
    key: "lists >> delete_dialog >> delete_button",
    pl: "Usuń",
    en: "Delete",
  },
  manageBooksButton: {
    key: "lists >> manage_books_button",
    pl: "Zarządzaj książkami",
    en: "Manage books",
  },
  removeBooksFromListSuccessMessage: {
    key: "lists >> remove_books >> success_message",
    pl: "Książki zostały pomyślnie usunięte z listy.",
    en: "The books were removed successfully from the list.",
  },
  removeChosenBooksButton: {
    key: "lists >> remove_chosen_books >> button_text",
    pl: "Usuń wybrane",
    en: "Remove chosen books",
  },
  deleteModeLabel: {
    key: "lists >> delete_mode_label",
    pl: "Tryb usuwania",
    en: "Delete mode",
  },
  deleteBooksFromListDialogTitle: {
    key: "lists >> delete_books_dialog >> title",
    pl: "Czy na pewno chcesz usunąć te książki ({{num}}) z listy {{listName}}?",
    en: "Are you sure you want to delete these books ({{num}}) from the list {{listName}}?",
  },
  deleteBooksFromListCancelButtonText: {
    key: "lists >> delete_books_dialog >> cancel_button",
    pl: "Anuluj",
    en: "Cancel",
  },
  deleteBooksFromListDeleteButtonText: {
    key: "lists >> delete_books_dialog >> delete_button",
    pl: "Usuń",
    en: "Delete",
  },
  backToListsButton: {
    key: "lists >> back_to_lists >> button_text",
    pl: "Wróć do list",
    en: "Back to lists",
  },
  noBooksInListMessage: {
    key: "lists >> no_books_in_list",
    pl: "W tej liście nie masz żadnej książki",
    en: "You don't have any book in this list",
  },
  addBooksToListButton: {
    key: "lists >> add_books_to_list >> button_text",
    pl: "Dodaj nowe książki do listy",
    en: "Add new books to the list",
  },
  addBooksToListSuccessMessage: {
    key: "lists >> add_books_to_list >> success_message",
    pl: "Książki zostały pomyślnie dodane do listy.",
    en: "The books were added to the list successfully.",
  },
  addChosenBooksToListButton: {
    key: "lists >> add_chosen_books_to_list >> button_text",
    pl: "Dodaj wybrane książki do listy",
    en: "Add chosen books to the list",
  },
  searchBooksPlaceholder: {
    key: "lists >> search_books >> placeholder_text",
    pl: "Szukaj książki po tytule i autorze",
    en: "Search for a book by title and author",
  },
  addListButton: {
    key: "lists >> add_list >> button_text",
    pl: "Dodaj listę",
    en: "Add list",
  },
  addNewListHeader: {
    key: "lists >> add_new_list >> header_text",
    pl: "Dodaj nową listę",
    en: "Add new list",
  },
  addNewListSuccessMessage: {
    key: "lists >> add_new_list >> success_message",
    pl: "Lista została utworzona pomyślnie.",
    en: "The list was created successfully.",
  },
  addChosenBooksToListPrompt: {
    key: "lists >> add_chosen_books >> prompt",
    pl: "Dodaj wybrane książki do listy",
    en: "Add chosen books to the list",
  },
  createListSubmitButton: {
    key: "lists >> create_list >> submit_button",
    pl: "Utwórz listę",
    en: "Create list",
  },
  listNameAlreadyExistsErrorMessage: {
    key: "lists >> name_already_exists >> error_message",
    pl: "Lista z tą nazwą już istnieje.",
    en: "The list with this name already exists.",
  },
  addBookToListFromModalSuccessMessage: {
    key: "lists >> add_book_to_list_modal >> success_message",
    pl: "Książka została pomyślnie dodana do listy {{listName}}.",
    en: "The book was added to the list {{listName}} successfully.",
  },
  removeBookFromListFromModalSuccessMessage: {
    key: "lists >> remove_book_from_list_modal >> success_message",
    pl: "Książka została pomyślnie usunięta z listy {{listName}}.",
    en: "The book was removed from the list {{listName}} successfully.",
  },
  saveBookToTheListPrompt: {
    key: "lists >> save_book_to_list >> prompt",
    pl: "Zapisz książkę na liście...",
    en: "Save the book on the list...",
  },
};

export default bookListsMessages;
