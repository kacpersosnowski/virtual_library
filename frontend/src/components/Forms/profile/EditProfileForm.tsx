import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import * as Yup from "yup";

import useFormikLanguage from "../../../hooks/useFormikLanguage";
import validationMessages from "../../../messages/validationMessages";
import Input from "../common/Input";
import ActionButton from "../../UI/ActionButton";
import ChangeAvatarForm from "./ChangeAvatarForm";
import profileMessages from "../../../messages/profileMessages";

const EditProfileForm = () => {
  const { t } = useTranslation();

  const formik = useFormikLanguage({
    initialValues: {
      profilePicture: null as File,
      username: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(t(validationMessages.fieldRequired.key)),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onSubmit={formik.handleSubmit}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <ChangeAvatarForm id="profilePicture" formik={formik} />
        <Box>
          <Input
            id="username"
            label={t(profileMessages.profileFormUsername.key)}
            formik={formik}
            sx={{ width: { xs: "100%", md: "80%" } }}
          />
          <Input
            id="firstName"
            label={t(profileMessages.profileFormFirstName.key)}
            formik={formik}
            sx={{ width: { xs: "100%", md: "80%" } }}
          />
          <Input
            id="lastName"
            label={t(profileMessages.profileFormLastName.key)}
            formik={formik}
            sx={{ width: { xs: "100%", md: "80%" } }}
          />
        </Box>
      </Box>
      <ActionButton type="submit" sx={{ mt: "1.5rem" }}>
        {t(profileMessages.profileFormSubmitButton.key)}
      </ActionButton>
    </Box>
  );
};

export default EditProfileForm;
