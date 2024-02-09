import {
  Avatar,
  Box,
  SxProps,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import useFetchUserData from "../../hooks/useFetchUserData";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import { LANGUAGES } from "../../constants/languages";
import errorMessages from "../../messages/errorMessages";

type Props = {
  variant: "drawer" | "navbar";
  toggleDrawerHandler?: () => void;
  sx?: SxProps<Theme>;
};

const Profile: React.FC<Props> = (props) => {
  const { i18n, t } = useTranslation();
  const { data: user, isLoading, isError } = useFetchUserData();

  useEffect(() => {
    if (user) {
      for (const language of LANGUAGES) {
        if (language.backendCode === user.language) {
          i18n.changeLanguage(language.code);
        }
      }
    }
  }, [user]);

  const stringToColor = (string: string) => {
    let hash = 0;
    let i: number;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        cursor: props.variant === "navbar" ? "pointer" : "default",
      },
      children: name[0],
    };
  };

  if (isError) {
    return <ErrorMessage message={t(errorMessages.userDataError.key)} />;
  }

  if (isLoading) {
    return <LoadingSpinner color="secondary" boxSx={{ marginY: 0 }} />;
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
      <Tooltip
        title={props.variant === "navbar" ? user.email : ""}
        arrow
        onClick={props.toggleDrawerHandler}
      >
        <Avatar {...stringAvatar(user.email.toUpperCase())} />
      </Tooltip>
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
