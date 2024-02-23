import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import * as Yup from "yup";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  isPopover?: boolean;
  addChosenAuthor?: (author: Author) => void;
  initialValues?: CreateAuthorDTO;
};

const AddEditAuthorForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isLoading: isCreatingLoading,
    isError: isCreatingError,
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
  const {
    isLoading: isUpdatingLoading,
    isError: isUpdatingError,
    mutate: updateAuthor,
  } = useMutation({
    mutationFn: authorsApi.updateAuthor,
    onSuccess: () => {
      dispatch(
        snackbarActions.show(
          t(adminMessages.updateAuthorFormSuccessMessage.key),
        ),
      );
    },
  });

  const initialValues =
    props.initialValues || ({ firstName: "", lastName: "" } as CreateAuthorDTO);

  const formik = useFormikLanguage({
    initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required(t(validationMessages.fieldRequired.key)),
      lastName: Yup.string().required(t(validationMessages.fieldRequired.key)),
    }),
    onSubmit: (values) => {
      if (!props.initialValues) {
        createAuthor(values);
      } else {
        updateAuthor({ id, author: values });
      }
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
      {!props.isPopover && (
        <>
          <Box sx={{ width: "100%", textAlign: "left", mb: "0.5rem" }}>
            <ActionButton onClick={() => navigate("/admin/authors")}>
              <ArrowBackIcon />
              {t(adminMessages.addAuthorFormBackToList.key)}
            </ActionButton>
          </Box>
          <Typography variant="h4" sx={{ mb: "1rem" }}>
            {props.initialValues
              ? t(adminMessages.updateAuthorFormHeader.key)
              : t(adminMessages.addAuthorFormHeader.key)}
          </Typography>
        </>
      )}
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
      {(isCreatingLoading || isUpdatingLoading) && <LoadingSpinner />}
      {!isCreatingLoading && !isUpdatingLoading && (
        <ActionButton type="submit">
          {props.initialValues
            ? t(adminMessages.updateAuthorFormSubmitButton.key)
            : t(adminMessages.addAuthorFormSubmitButton.key)}
        </ActionButton>
      )}
      {(isCreatingError || isUpdatingError) && (
        <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
      )}
    </Box>
  );
};

export default AddEditAuthorForm;
