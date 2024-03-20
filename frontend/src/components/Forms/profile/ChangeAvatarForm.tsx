import { useTranslation } from "react-i18next";
import { ChangeEvent, useState } from "react";
import { FormikProps, FormikValues } from "formik";
import { Badge, Box, Button, IconButton, Input, Tooltip } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

import ColoredAvatar from "../../Layout/common/ColoredAvatar";
import profileMessages from "../../../messages/profileMessages";

type Props = {
  id: string;
  formik: FormikProps<FormikValues>;
  username: string;
};

const ChangeAvatarForm: React.FC<Props> = (props) => {
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const { t } = useTranslation();

  const { id, formik, username } = props;

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    formik.setFieldValue(id, file);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewAvatar(null);
    }
  };

  const handleClearPreview = () => {
    setPreviewAvatar(null);
    formik.setFieldValue(id, null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Badge
        badgeContent={
          <Tooltip
            title={t(profileMessages.profileFormPictureDeleteTooltip.key)}
            arrow
          >
            <IconButton onClick={handleClearPreview}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        }
        color="default"
      >
        {!previewAvatar && (
          <ColoredAvatar
            sx={{ width: "12rem", height: "12rem", fontSize: "6rem" }}
            baseName={username.toUpperCase()}
          />
        )}
        {previewAvatar && (
          <Box
            component="img"
            src={previewAvatar}
            alt={previewAvatar}
            width="12rem"
            height="12rem"
            borderRadius="6rem"
            style={{ objectFit: "fill" }}
          />
        )}
      </Badge>
      <Box>
        <Input
          type="file"
          inputProps={{ accept: "image/*" }}
          style={{ display: "none" }}
          id={id}
          onChange={handleAvatarChange}
          value=""
        />
        <Box component="label" htmlFor={id}>
          <Button variant="outlined" component="span">
            {t(profileMessages.profileFormPictureButton.key)}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangeAvatarForm;
