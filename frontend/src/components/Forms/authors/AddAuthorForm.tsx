import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { Box, SxProps, Theme } from "@mui/material";
import * as Yup from "yup";

import {
  Author,
  CreateAuthorDTO,
} from "../../../config/api/authors/authors.types";
import useFormikLanguage from "../../../hooks/useFormikLanguage";
import Input from "../common/Input";
import ActionButton from "../../UI/ActionButton";
import authorsApi from "../../../config/api/authors/authors";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import { queryClient } from "../../../config/api";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";
import validationMessages from "../../../messages/validationMessages";
import adminMessages from "../../../messages/adminMessages";
import errorMessages from "../../../messages/errorMessages";

type Props = {
  sx?: SxProps<Theme>;
  closePopover?: () => void;
  addChosenAuthor?: (author: Author) => void;
};

const AddAuthorForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    isLoading,
    isError,
    mutate: createAuthor,
  } = useMutation({
    mutationFn: authorsApi.createAuthor,
    onSuccess: (author) => {
      formik.handleReset(null);
      queryClient.invalidateQueries("authors");
      dispatch(
        snackbarActions.show(t(adminMessages.addAuthorFormSuccessMessage.key)),
      );
      if (props.addChosenAuthor) {
        props.addChosenAuthor(author);
      }
      if (props.closePopover) {
        props.closePopover();
      }
    },
  });

  const formik = useFormikLanguage({
    initialValues: { firstName: "", lastName: "" } as CreateAuthorDTO,
    validationSchema: Yup.object({
      firstName: Yup.string().required(t(validationMessages.fieldRequired.key)),
      lastName: Yup.string().required(t(validationMessages.fieldRequired.key)),
    }),
    onSubmit: (values) => {
      createAuthor(values);
    },
  });

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...props.sx,
      }}
      onSubmit={formik.handleSubmit}
    >
      <Input
        id="firstName"
        label={t(adminMessages.addAuthorFormFirstName.key)}
        formik={formik}
      />
      <Input
        id="lastName"
        label={t(adminMessages.addAuthorFormLastName.key)}
        formik={formik}
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <ActionButton type="submit">
          {t(adminMessages.addAuthorFormSubmitButton.key)}
        </ActionButton>
      )}
      {isError && (
        <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
      )}
    </Box>
  );
};

export default AddAuthorForm;
