import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import * as Yup from "yup";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useFormikLanguage from "../../../hooks/useFormikLanguage";
import Input from "../common/Input";
import ActionButton from "../../UI/ActionButton";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import { queryClient } from "../../../config/api";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";
import validationMessages from "../../../messages/validationMessages";
import adminMessages from "../../../messages/adminMessages";
import errorMessages from "../../../messages/errorMessages";
import { CreateGenreDTO, Genre } from "../../../config/api/genres/genres.types";
import genresApi from "../../../config/api/genres/genres";

type Props = {
  sx?: SxProps<Theme>;
  closePopover?: () => void;
  addChosenGenre?: (genre: Genre) => void;
  initialValues?: CreateGenreDTO;
  isPopover?: boolean;
};

const AddEditGenreForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading: isCreatingLoading,
    isError: isCreatingError,
    mutate: createGenre,
  } = useMutation({
    mutationFn: genresApi.createGenre,
    onSuccess: (genre) => {
      formik.handleReset(null);
      queryClient.invalidateQueries("genres");
      dispatch(
        snackbarActions.show(t(adminMessages.addGenreFormSuccessMessage.key)),
      );
      if (props.addChosenGenre) {
        props.addChosenGenre(genre);
      }
      if (props.closePopover) {
        props.closePopover();
      }
    },
  });
  const {
    isLoading: isUpdatingLoading,
    isError: isUpdatingError,
    mutate: updateGenre,
  } = useMutation({
    mutationFn: genresApi.updateGenre,
    onSuccess: () => {
      dispatch(
        snackbarActions.show(
          t(adminMessages.updateGenreFormSuccessMessage.key),
        ),
      );
    },
  });

  const initialValues = props.initialValues || ({ name: "" } as CreateGenreDTO);

  const formik = useFormikLanguage({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required(t(validationMessages.fieldRequired.key)),
    }),
    onSubmit: (values) => {
      if (!props.initialValues) {
        createGenre(values);
      } else {
        updateGenre({ id, genre: values });
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
            <ActionButton onClick={() => navigate("/admin/genres")}>
              <ArrowBackIcon />
              {t(adminMessages.addGenreFormBackToList.key)}
            </ActionButton>
          </Box>
          <Typography variant="h4" sx={{ mb: "1rem" }}>
            {props.initialValues
              ? t(adminMessages.updateGenreFormHeader.key)
              : t(adminMessages.addGenreFormHeader.key)}
          </Typography>
        </>
      )}
      <Input
        id="name"
        label={t(adminMessages.addGenreFormName.key)}
        formik={formik}
      />
      {(isCreatingLoading || isUpdatingLoading) && <LoadingSpinner />}
      {!isCreatingLoading && !isUpdatingLoading && (
        <ActionButton type="submit">
          {props.initialValues
            ? t(adminMessages.updateGenreFormSubmitButton.key)
            : t(adminMessages.addGenreFormSubmitButton.key)}
        </ActionButton>
      )}
      {(isCreatingError || isUpdatingError) && (
        <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
      )}
    </Box>
  );
};

export default AddEditGenreForm;
