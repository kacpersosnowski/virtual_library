import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import bookListsApi from "../../config/api/bookLists/bookLists";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import errorMessages from "../../messages/errorMessages";
import { snackbarActions } from "../../store/redux/slices/snackbar-slice";
import bookListsMessages from "../../messages/bookListsMessages";

type Props = {
  open: boolean;
  handleClose: () => void;
  bookId: string;
  sx?: SxProps<Theme>;
};

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SaveBookOnListModal: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    data: bookLists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookLists"],
    queryFn: bookListsApi.getAllBookLists,
  });
  const { mutate: addBookToList } = useMutation({
    mutationFn: bookListsApi.addBookToList,
    onSuccess: (values) => {
      dispatch(
        snackbarActions.show(
          t(bookListsMessages.addBookToListFromModalSuccessMessage.key, {
            listName: values.name,
          }),
        ),
      );
    },
  });
  const { mutate: removeBookFromList } = useMutation({
    mutationFn: bookListsApi.removeBookFromList,
    onSuccess: (values) => {
      dispatch(
        snackbarActions.show(
          t(bookListsMessages.removeBookFromListFromModalSuccessMessage.key, {
            listName: values.name,
          }),
        ),
      );
    },
  });

  const toggleBook = (
    listId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      addBookToList({ bookId: props.bookId, listId });
    } else {
      removeBookFromList({ bookId: props.bookId, listId });
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      sx={{ overflow: "scroll" }}
    >
      <Box sx={{ ...style, ...props.sx }}>
        <Typography variant="h6" component="h2">
          {t(bookListsMessages.saveBookToTheListPrompt.key)}
        </Typography>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <Box sx={{ maxHeight: "70vh", maxWidth: "40vh", overflowY: "auto" }}>
            <FormGroup>
              {bookLists?.map((bookList) => {
                const bookIdsList = bookList.books.map((book) => book.id);
                const checkboxChecked = bookIdsList.includes(props.bookId);
                return (
                  <FormControlLabel
                    key={bookList.id}
                    control={
                      <Checkbox
                        onChange={toggleBook.bind(null, bookList.id)}
                        defaultChecked={checkboxChecked}
                      />
                    }
                    label={bookList.name}
                  />
                );
              })}
            </FormGroup>
          </Box>
        )}
        {isError && (
          <ErrorMessage
            message={t(errorMessages.somethingWentWrongError.key)}
          />
        )}
      </Box>
    </Modal>
  );
};

export default SaveBookOnListModal;
