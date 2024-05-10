import axios from "axios";
import { useEffect, useState } from "react";
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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import StyledTable, {
  StyledTableCell,
  StyledTableRow,
} from "../../Layout/common/StyledTable";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import AlertDialog from "../../Layout/common/AlertDialog";
import { queryClient } from "../../../config/api";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";
import adminMessages from "../../../messages/adminMessages";
import errorMessages from "../../../messages/errorMessages";
import { RootState } from "../../../store/redux";
import { Author } from "../../../config/api/authors/authors.types";
import authorsApi from "../../../config/api/authors/authors";

const AdminAuthorsTable = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<Author>(null);
  const searchText = useSelector(
    (state: RootState) => state.search.searchText.authorsTable,
  );
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();
  const {
    data: authorsResponse,
    isLoading: isListLoading,
    isError: isListError,
  } = useQuery({
    queryKey: ["authors", { page: currentPage, search: searchText }],
    queryFn: () =>
      authorsApi.getAllAuthorsForAdmin({
        page: currentPage,
        search: searchText,
      }),
  });
  const {
    mutate: deleteAuthor,
    isLoading: isDeletingLoading,
    isError: isDeletingError,
    error: deleteError,
  } = useMutation({
    mutationFn: authorsApi.deleteAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries(["authors"]);
      handleDeleteDialogClose();
      dispatch(
        snackbarActions.show(
          t(adminMessages.deleteAuthorFormSuccessMessage.key),
        ),
      );
    },
    onError: () => {
      handleDeleteDialogClose();
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(0);
  }, [searchText]);

  const handleDeleteDialogOpen = (author: Author) => {
    setAuthorToDelete(author);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setAuthorToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteAuthor = () => {
    deleteAuthor(authorToDelete.id);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value - 1);
  };

  const authors = authorsResponse?.content;
  const totalPages = authorsResponse
    ? Math.ceil(authorsResponse.totalElements / 10)
    : 0;

  if (isListLoading || isDeletingLoading) {
    return <LoadingSpinner />;
  }

  if (isListError) {
    return <ErrorMessage message={t(errorMessages.fetchAuthorListError.key)} />;
  }

  const heads = [
    t(adminMessages.listAuthorTableNumberHeader.key),
    t(adminMessages.listAuthorTableFirstNameHeader.key),
    t(adminMessages.listBookTableLastNameHeader.key),
    t(adminMessages.listAuthorTableActionsHeader.key),
  ];
  const tableBody = (
    <TableBody>
      {authors.length === 0 && (
        <StyledTableRow>
          <StyledTableCell colSpan={heads.length} align="center">
            {t(adminMessages.listAuthorTableNoAuthors.key)}
          </StyledTableCell>
        </StyledTableRow>
      )}
      {authors.map((author, index) => {
        return (
          <StyledTableRow key={author.id}>
            <StyledTableCell align="center">
              {index + 1 + 10 * currentPage}
            </StyledTableCell>
            <StyledTableCell align="center">{author.firstName}</StyledTableCell>
            <StyledTableCell align="center">{author.lastName}</StyledTableCell>
            <StyledTableCell align="center">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tooltip
                  title={t(adminMessages.listAuthorTableActionsEdit.key)}
                  arrow
                >
                  <IconButton onClick={() => navigate(`edit/${author.id}`)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={t(adminMessages.listAuthorTableActionsDelete.key)}
                  arrow
                >
                  <IconButton
                    onClick={handleDeleteDialogOpen.bind(null, author)}
                  >
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

  let deleteErrorMessage = "";
  if (
    deleteError &&
    axios.isAxiosError(deleteError) &&
    deleteError.response.status === 400
  ) {
    deleteErrorMessage = t(errorMessages.deleteAuthorErrorBooksExist.key);
  } else {
    deleteErrorMessage = t(errorMessages.deleteAuthorError.key);
  }

  return (
    <>
      {isDeletingError && <ErrorMessage message={deleteErrorMessage} />}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        closeHandler={handleDeleteDialogClose}
        title={`${t(adminMessages.deleteAuthorAlertDialogTitle.key)} (${
          authorToDelete?.firstName + " " + authorToDelete?.lastName
        })`}
        contentText={t(adminMessages.deleteAuthorAlertDialogContentText.key)}
        cancelButtonText={t(
          adminMessages.deleteAuthorAlertDialogCancelButton.key,
        )}
        agreeButton={
          <Button
            onClick={handleDeleteAuthor}
            autoFocus
            variant="contained"
            color="error"
          >
            {t(adminMessages.deleteAuthorAlertDialogDeleteButton.key)}
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
    </>
  );
};

export default AdminAuthorsTable;
