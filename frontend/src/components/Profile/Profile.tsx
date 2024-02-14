import { Box, SxProps, Theme, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import useFetchUserData from "../../hooks/useFetchUserData";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import { LANGUAGES } from "../../constants/languages";
import errorMessages from "../../messages/errorMessages";
import ColoredAvatar from "../Layout/common/ColoredAvatar";

type Props = {
  variant: "drawer" | "navbar";
  toggleDrawerHandler?: () => void;
  sx?: SxProps<Theme>;
};

const Profile: React.FC<Props> = (props) => {
  const { i18n, t } = useTranslation();
  const { user, isLoading, error } = useFetchUserData();

  useEffect(() => {
    if (user) {
      for (const language of LANGUAGES) {
        if (language.backendCode === user.language) {
          i18n.changeLanguage(language.code);
        }
      }
    }
  }, [user]);

  if (error) {
    return <ErrorMessage message={t(errorMessages.userDataError.key)} />;
  }

  if (isLoading) {
    return <LoadingSpinner color="secondary" boxSx={{ marginY: 0 }} />;
  }

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        display:
          props.variant === "navbar" ? { xs: "none", md: "flex" } : "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        flexWrap: "wrap",
        ...props.sx,
      }}
    >
      <ColoredAvatar
        baseName={user.email.toUpperCase()}
        tooltipTitle={props.variant === "navbar" ? user.email : ""}
        onClick={props.toggleDrawerHandler}
        sx={{ cursor: props.variant === "navbar" ? "pointer" : "default" }}
      />
      {props.variant === "drawer" && (
        <Tooltip title={user.email.length > 25 ? user.email : ""} arrow>
          <Typography>
            {user.email.slice(0, 25) + (user.email.length > 25 ? "..." : "")}
          </Typography>
        </Tooltip>
      )}
    </Box>
  );
};

export default Profile;
