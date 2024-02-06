import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { Box, SxProps, Theme } from "@mui/material";
import * as Yup from "yup";

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
};

const AddGenreForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    isLoading,
    isError,
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

  const formik = useFormikLanguage({
    initialValues: { name: "" } as CreateGenreDTO,
    validationSchema: Yup.object({
      name: Yup.string().required(t(validationMessages.fieldRequired.key)),
    }),
    onSubmit: (values) => {
      createGenre(values);
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
        id="name"
        label={t(adminMessages.addGenreFormName.key)}
        formik={formik}
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <ActionButton type="submit">
          {t(adminMessages.addGenreFormSubmitButton.key)}
        </ActionButton>
      )}
      {isError && (
        <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
      )}
    </Box>
  );
};

export default AddGenreForm;
