import {
  Box,
  Button,
  Container,
  IconButton,
  SxProps,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import bookListsMessages from "../../messages/bookListsMessages";
import Input from "../Forms/common/Input";
import useFormikLanguage from "../../hooks/useFormikLanguage";
import validationMessages from "../../messages/validationMessages";
import ActionButton from "../UI/ActionButton";
import bookListsApi from "../../config/api/bookLists/bookLists";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import errorMessages from "../../messages/errorMessages";
import { snackbarActions } from "../../store/redux/slices/snackbar-slice";
import AlertDialog from "../Layout/common/AlertDialog";
import { queryClient } from "../../config/api";

type Props = {
  text: string;
  listId: string;
  isEditable?: boolean;
  deleteCallback?: () => void;
  sx?: SxProps<Theme>;
};

const UserBookListHeader: React.FC<Props> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [listName, setListName] = useState(props.text);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    mutate: changeName,
    isLoading: isChangingNameLoading,
    isError: isChangingNameError,
  } = useMutation({
    mutationFn: bookListsApi.changeBookListName,
    onSuccess: () => {
      setListName(formik.values.listName);
      setEditMode(false);
      dispatch(
        snackbarActions.show(t(bookListsMessages.changeNameSuccessMessage.key)),
      );
    },
  });
  const {
    mutate: deleteList,
    isLoading: isDeletingListLoading,
    isError: isDeletingListError,
  } = useMutation({
    mutationFn: bookListsApi.deleteBookList,
    onSuccess: () => {
      queryClient.invalidateQueries(["bookLists"]);
      handleDeleteDialogClose();
      dispatch(
        snackbarActions.show(t(bookListsMessages.deleteListSuccessMessage.key)),
      );
      if (props?.deleteCallback) {
        props.deleteCallback();
      }
    },
    onError: () => {
      handleDeleteDialogClose();
    },
  });

  const formik = useFormikLanguage({
    initialValues: { listName: props.text },
    validationSchema: Yup.object({
      listName: Yup.string().required(t(validationMessages.fieldRequired.key)),
    }),
    onSubmit: (values) => {
      changeName({ listId: props.listId, newName: values.listName });
    },
  });

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteList = () => {
    deleteList(props.listId);
  };

  const editNameForm = (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Input
          id="listName"
          label={t(bookListsMessages.listNameInputLabel.key)}
          formik={formik}
        />
      </Box>
      <Box>
        {!isChangingNameLoading && (
          <ActionButton type="submit" sx={{ mr: "0.4rem" }}>
            {t(bookListsMessages.changeNameButton.key)}
          </ActionButton>
        )}
        {isChangingNameLoading && <LoadingSpinner />}
        <ActionButton
          type="button"
          variant="outlined"
          color="primary"
          onClick={() => setEditMode(false)}
        >
          {t(bookListsMessages.changeNameCancelButton.key)}
        </ActionButton>
      </Box>
    </Box>
  );

  const nameText = (
    <Typography
      variant="h4"
      sx={{
        letterSpacing: "0.3rem",
        textAlign: { xs: "center", md: "left" },
      }}
    >
      {listName}
    </Typography>
  );

  return (
    <Container maxWidth={"xl"} sx={{ position: "relative", zIndex: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          mb: { xs: "1rem", md: "0" },
          ...props.sx,
        }}
      >
        {editMode ? editNameForm : nameText}
        {!editMode &&
          (props.isEditable === undefined || props.isEditable === true) && (
            <Box>
              <Tooltip title={t(bookListsMessages.editName.key)} arrow>
                <IconButton onClick={() => setEditMode(true)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t(bookListsMessages.deleteList.key)} arrow>
                <IconButton
                  color="error"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        {isDeletingListLoading && <LoadingSpinner />}
      </Box>
      {(isChangingNameError || isDeletingListError) && (
        <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
      )}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        closeHandler={handleDeleteDialogClose}
        title={t(bookListsMessages.deleteListDialogTitle.key)}
        contentText={t(bookListsMessages.deleteListDialogContentText.key)}
        cancelButtonText={t(bookListsMessages.deleteListCancelButtonText.key)}
        agreeButton={
          <Button
            onClick={handleDeleteList}
            autoFocus
            variant="contained"
            color="error"
          >
            {t(bookListsMessages.deleteListDeleteButtonText.key)}
          </Button>
        }
      />
    </Container>
  );
};

export default UserBookListHeader;
