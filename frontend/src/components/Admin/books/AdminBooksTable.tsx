import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  IconButton,
  Pagination,
  TableBody,
  Tooltip,
} from "@mui/material";

import DetailsIcon from "@mui/icons-material/Details";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import StyledTable, {
  StyledTableCell,
  StyledTableRow,
} from "../../Layout/common/StyledTable";
import { booksApi } from "../../../config/api/books/books";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import AlertDialog from "../../Layout/common/AlertDialog";
import { BookItemData } from "../../../config/api/books/books.types";
import { queryClient } from "../../../config/api";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";
import adminMessages from "../../../messages/adminMessages";
import errorMessages from "../../../messages/errorMessages";
import { RootState } from "../../../store/redux";

const AdminBooksTable = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<BookItemData>(null);
  const searchText = useSelector(
    (state: RootState) => state.search.searchText.booksTable,
  );
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();
  const {
    data: booksResponse,
    isLoading: isListLoading,
    isError: isListError,
  } = useQuery({
    queryKey: ["books", { page: currentPage, search: searchText }],
    queryFn: () =>
      booksApi.getAllBooksForAdmin({ page: currentPage, search: searchText }),
  });
  const {
    mutate: deleteBook,
    isLoading: isDeletingLoading,
    isError: isDeletingError,
  } = useMutation({
    mutationFn: booksApi.deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      handleDeleteDialogClose();
      dispatch(
        snackbarActions.show(t(adminMessages.deleteBookFormSuccessMessage.key)),
      );
    },
    onError: () => {
      handleDeleteDialogClose();
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteDialogOpen = (book: BookItemData) => {
    setBookToDelete(book);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setBookToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteBook = () => {
    deleteBook(bookToDelete.id);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value - 1);
  };

  const books = booksResponse?.content;
  const totalPages = booksResponse
    ? Math.ceil(booksResponse.totalElements / 10)
    : 0;

  if (isListLoading || isDeletingLoading) {
    return <LoadingSpinner />;
  }

  if (isListError) {
    return <ErrorMessage message={t(errorMessages.fetchBookListError.key)} />;
  }

  const heads = [
    t(adminMessages.listBookTableNumberHeader.key),
    t(adminMessages.listBookTableTitleHeader.key),
    t(adminMessages.listBookTableAuthorHeader.key),
    t(adminMessages.listBookTableGenreHeader.key),
    t(adminMessages.listBookTableActionsHeader.key),
  ];
  const tableBody = (
    <TableBody>
      {books.length === 0 && (
        <StyledTableRow>
          <StyledTableCell colSpan={heads.length} align="center">
            {t(adminMessages.listBookTableNoBooks.key)}
          </StyledTableCell>
        </StyledTableRow>
      )}
      {books.map((book, index) => {
        return (
          <StyledTableRow key={book.id}>
            <StyledTableCell align="center">
              {index + 1 + 10 * currentPage}
            </StyledTableCell>
            <StyledTableCell align="center">{book.title}</StyledTableCell>
            <StyledTableCell align="center">{book.authorList}</StyledTableCell>
            <StyledTableCell align="center">{book.genreList}</StyledTableCell>
            <StyledTableCell align="center">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tooltip
                  title={t(adminMessages.listBookTableActionsDetails.key)}
                  arrow
                >
                  <IconButton onClick={() => navigate(`/book/${book.id}`)}>
                    <DetailsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={t(adminMessages.listBookTableActionsEdit.key)}
                  arrow
                >
                  <IconButton onClick={() => navigate(`edit/${book.id}`)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={t(adminMessages.listBookTableActionsDelete.key)}
                  arrow
                >
                  <IconButton onClick={handleDeleteDialogOpen.bind(null, book)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
    </TableBody>
  );

  return (
    <>
      {isDeletingError && (
        <ErrorMessage message={t(errorMessages.deleteBookError.key)} />
      )}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        closeHandler={handleDeleteDialogClose}
        title={`${t(
          adminMessages.deleteBookAlertDialogTitle.key,
        )} (${bookToDelete?.title})`}
        contentText={t(adminMessages.deleteBookAlertDialogContentText.key)}
        cancelButtonText={t(
          adminMessages.deleteBookAlertDialogCancelButton.key,
        )}
        agreeButton={
          <Button
            onClick={handleDeleteBook}
            autoFocus
            variant="contained"
            color="error"
          >
            {t(adminMessages.deleteBookAlertDialogDeleteButton.key)}
          </Button>
        }
      />
      <StyledTable heads={heads} body={tableBody} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "1rem",
        }}
      >
        {books.length > 0 && (
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
    </>
  );
};

export default AdminBooksTable;
