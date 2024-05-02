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
};

export default bookListsMessages;
