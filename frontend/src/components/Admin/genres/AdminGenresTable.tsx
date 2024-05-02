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
import genresApi from "../../../config/api/genres/genres";
import { Genre } from "../../../config/api/genres/genres.types";

const AdminGenresTable = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState<Genre>(null);
  const searchText = useSelector(
    (state: RootState) => state.search.searchText.genresTable,
  );
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();
  const {
    data: genresResponse,
    isLoading: isListLoading,
    isError: isListError,
  } = useQuery({
    queryKey: ["genres", { page: currentPage, search: searchText }],
    queryFn: () =>
      genresApi.getAllGenresForAdmin({
        page: currentPage,
        search: searchText,
      }),
  });
  const {
    mutate: deleteGenre,
    isLoading: isDeletingLoading,
    isError: isDeletingError,
    error: deleteError,
  } = useMutation({
    mutationFn: genresApi.deleteGenre,
    onSuccess: () => {
      queryClient.invalidateQueries(["genres"]);
      handleDeleteDialogClose();
      dispatch(
        snackbarActions.show(
          t(adminMessages.deleteGenreFormSuccessMessage.key),
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

  const handleDeleteDialogOpen = (genre: Genre) => {
    setGenreToDelete(genre);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setGenreToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteGenre = () => {
    deleteGenre(genreToDelete.id);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value - 1);
  };

  const genres = genresResponse?.content;
  const totalPages = genresResponse
    ? Math.ceil(genresResponse.totalElements / 10)
    : 0;

  if (isListLoading || isDeletingLoading) {
    return <LoadingSpinner />;
  }

  if (isListError) {
    return <ErrorMessage message={t(errorMessages.fetchGenreListError.key)} />;
  }

  const heads = [
    t(adminMessages.listGenreTableNumberHeader.key),
    t(adminMessages.listGenreTableNameHeader.key),
    t(adminMessages.listGenreTableActionsHeader.key),
  ];
  const tableBody = (
    <TableBody>
      {genres.length === 0 && (
        <StyledTableRow>
          <StyledTableCell colSpan={heads.length} align="center">
            {t(adminMessages.listGenreTableNoGenres.key)}
          </StyledTableCell>
        </StyledTableRow>
      )}
      {genres.map((genre, index) => {
        return (
          <StyledTableRow key={genre.id}>
            <StyledTableCell align="center">
              {index + 1 + 10 * currentPage}
            </StyledTableCell>
            <StyledTableCell align="center">{genre.name}</StyledTableCell>
            <StyledTableCell align="center">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tooltip
                  title={t(adminMessages.listGenreTableActionsEdit.key)}
                  arrow
                >
                  <IconButton onClick={() => navigate(`edit/${genre.id}`)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={t(adminMessages.listGenreTableActionsDelete.key)}
                  arrow
                >
                  <IconButton
                    onClick={handleDeleteDialogOpen.bind(null, genre)}
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
    deleteErrorMessage = t(errorMessages.deleteGenreErrorBooksExist.key);
  } else {
    deleteErrorMessage = t(errorMessages.deleteGenreError.key);
  }

  return (
    <>
      {isDeletingError && <ErrorMessage message={deleteErrorMessage} />}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        closeHandler={handleDeleteDialogClose}
        title={`${t(
          adminMessages.deleteGenreAlertDialogTitle.key,
        )} (${genreToDelete?.name})`}
        contentText={t(adminMessages.deleteGenreAlertDialogContentText.key)}
        cancelButtonText={t(
          adminMessages.deleteGenreAlertDialogCancelButton.key,
        )}
        agreeButton={
          <Button
            onClick={handleDeleteGenre}
            autoFocus
            variant="contained"
            color="error"
          >
            {t(adminMessages.deleteGenreAlertDialogDeleteButton.key)}
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

export default AdminGenresTable;
