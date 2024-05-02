import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Pagination,
  Switch,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { BookListDTO } from "../../config/api/bookLists/bookLists.types";
import UserBookListHeader from "./UserBookListHeader";
import BookItemCompressed from "../Books/BookItemCompressed";
import bookListsApi from "../../config/api/bookLists/bookLists";
import ActionButton from "../UI/ActionButton";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import errorMessages from "../../messages/errorMessages";
import { snackbarActions } from "../../store/redux/slices/snackbar-slice";
import { queryClient } from "../../config/api";
import AlertDialog from "../Layout/common/AlertDialog";
import bookListsMessages from "../../messages/bookListsMessages";
import { BookItemData } from "../../config/api/books/books.types";
import AddBookToListForm from "../Forms/bookLists/AddBookToListForm";

type Props = {
  bookList: BookListDTO;
};

const BOOKS_PER_PAGE = 8;

const UserBookListView: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [booksToDelete, setBooksToDelete] = useState([] as string[]);
  const [deleteCheckboxes, setDeleteCheckboxes] = useState<{
    [key: string]: boolean;
  }>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [booksToDisplay, setBooksToDisplay] = useState([] as BookItemData[]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (props.bookList.books) {
      const books = props.bookList.books.slice(
        currentPage * BOOKS_PER_PAGE,
        currentPage * BOOKS_PER_PAGE + BOOKS_PER_PAGE,
      );
      setBooksToDisplay(books);
    }
  }, [props.bookList.books, currentPage]);

  const {
    mutate: removeBooks,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: bookListsApi.removeBooksFromList,
    onSuccess: () => {
      queryClient.invalidateQueries(["bookList", props.bookList.id]);
      dispatch(
        snackbarActions.show(
          t(bookListsMessages.removeBooksFromListSuccessMessage.key),
        ),
      );
      setIsDeleteDialogOpen(false);
      resetState();
    },
    onError: () => {
      setIsDeleteDialogOpen(false);
      resetState();
    },
  });

  const resetState = () => {
    setIsDeleteMode(false);
    setBooksToDelete([]);
    setDeleteCheckboxes({});
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isDeleteMode) {
      resetState();
    }
    setIsDeleteMode(event.target.checked);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value - 1);
  };

  const handleCheckboxChange = (
    bookId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDeleteCheckboxes({
      ...deleteCheckboxes,
      [bookId]: event.target.checked,
    });
    if (event.target.checked) {
      setBooksToDelete([...booksToDelete, bookId]);
    } else {
      const bookIdIndex = booksToDelete.indexOf(bookId);
      if (bookIdIndex > -1) {
        const newBooksToDelete = [...booksToDelete];
        newBooksToDelete.splice(bookIdIndex, 1);
        setBooksToDelete(newBooksToDelete);
      }
    }
  };

  const toggleCheckBox = (bookId: string) => {
    const checkBoxChecked = deleteCheckboxes[bookId];
    if (checkBoxChecked) {
      setDeleteCheckboxes({
        ...deleteCheckboxes,
        [bookId]: false,
      });
      const bookIdIndex = booksToDelete.indexOf(bookId);
      if (bookIdIndex > -1) {
        const newBooksToDelete = [...booksToDelete];
        newBooksToDelete.splice(bookIdIndex, 1);
        setBooksToDelete(newBooksToDelete);
      }
    } else {
      setDeleteCheckboxes({
        ...deleteCheckboxes,
        [bookId]: true,
      });
      setBooksToDelete([...booksToDelete, bookId]);
    }
  };

  const totalPages = props.bookList.books
    ? Math.ceil(props.bookList.books.length / BOOKS_PER_PAGE)
    : 0;

  return (
    <Box>
      <UserBookListHeader
        listId={props.bookList.id}
        text={props.bookList.name}
        deleteCallback={() => navigate("/book-lists")}
      />
      <Box sx={{ display: "flex", my: "1rem", px: "4rem" }}>
        <ActionButton onClick={() => navigate("/book-lists")}>
          <ArrowBackIcon />
          {t(bookListsMessages.backToListsButton.key)}
        </ActionButton>
      </Box>
      {booksToDisplay.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: "center",
            columnGap: 2,
            my: "1rem",
            px: "4rem",
          }}
        >
          {isLoading && <LoadingSpinner />}
          {isDeleteMode && !isLoading && (
            <ActionButton
              color="error"
              onClick={
                booksToDelete?.length > 0
                  ? () => setIsDeleteDialogOpen(true)
                  : null
              }
            >
              {t(bookListsMessages.removeChosenBooksButton.key)}
            </ActionButton>
          )}
          {(!isDeleteMode || isLoading) && <Box></Box>}
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isDeleteMode}
                    onChange={handleSwitchChange}
                    name="delete-mode"
                    color="error"
                  />
                }
                label={t(bookListsMessages.deleteModeLabel.key)}
              />
            </FormGroup>
          </FormControl>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
          mt: "2rem",
        }}
      >
        {booksToDisplay.length === 0 && (
          <Typography variant="h5">
            {t(bookListsMessages.noBooksInListMessage.key)}
          </Typography>
        )}
        {booksToDisplay.map((book) => {
          if (!isDeleteMode) {
            return <BookItemCompressed book={book} key={book.id} />;
          } else {
            return (
              <Badge
                key={book.id}
                badgeContent={
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    icon={<DeleteOutlineIcon />}
                    checkedIcon={<DeleteIcon />}
                    color="error"
                    checked={
                      deleteCheckboxes[book.id] === undefined
                        ? false
                        : deleteCheckboxes[book.id]
                    }
                    onChange={handleCheckboxChange.bind(null, book.id)}
                  />
                }
              >
                <BookItemCompressed
                  book={book}
                  key={book.id}
                  onClick={toggleCheckBox.bind(null, book.id)}
                />
              </Badge>
            );
          }
        })}
      </Box>
      {isError && (
        <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "1rem",
        }}
      >
        {totalPages > 1 && (
          <Pagination
            color="secondary"
            count={totalPages}
            siblingCount={2}
            page={currentPage + 1}
            onChange={handlePageChange}
            disabled={totalPages <= 1}
          />
        )}
      </Box>
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        closeHandler={() => setIsDeleteDialogOpen(false)}
        title={t(bookListsMessages.deleteBooksFromListDialogTitle.key, {
          num: booksToDelete.length,
          listName: props.bookList.name,
        })}
        cancelButtonText={t(
          bookListsMessages.deleteBooksFromListCancelButtonText.key,
        )}
        agreeButton={
          <Button
            onClick={() => {
              removeBooks({
                bookIdList: booksToDelete,
                listId: props.bookList.id,
              });
            }}
            autoFocus
            variant="contained"
            color="error"
          >
            {t(bookListsMessages.deleteBooksFromListDeleteButtonText.key)}
          </Button>
        }
      />
      <Divider sx={{ borderBottomWidth: 2, my: "2rem" }} />
      <Typography variant="h4" sx={{ mb: "2rem" }}>
        {t(bookListsMessages.addBooksToListButton.key)}
      </Typography>
      <AddBookToListForm
        list={props.bookList}
        containerSx={{
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          columnGap: 2,
          my: "1rem",
          px: "4rem",
        }}
      />
    </Box>
  );
};

export default UserBookListView;
