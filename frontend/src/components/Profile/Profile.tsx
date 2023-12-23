import { Box, Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../../store/AuthContext/AuthContext";
import authMessages from "../../messages/authMessages";
import useFetchUserData from "../../hooks/useFetchUserData";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import { LANGUAGES } from "../../constants/languages";

type Props = {
  variant: "drawer" | "navbar";
};

const Profile: React.FC<Props> = (props) => {
  const { logout } = useContext(AuthContext);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
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

  if (isError) {
    return <ErrorMessage message="Failed to load user data. Try again later" />;
  }

  if (isLoading) {
    return <LoadingSpinner color="secondary" boxSx={{ marginY: 0 }} />;
  }

  const logoutHandler = () => {
    logout();
    localStorage.removeItem("email");
    navigate("/");
  };

  const buttonTextColor = props.variant === "navbar" ? "white" : "black";
  const buttonBgColor =
    props.variant === "navbar" ? "primary.dark" : "primary.main";

  return (
    <Box
      sx={{
        display:
          props.variant === "navbar"
            ? { xs: "none", md: "flex" }
            : { xs: "flex", md: "none" },
        alignItems: "center",
        justifyContent: "center",
        flexDirection: props.variant === "navbar" ? "row" : "column",
      }}
    >
      <Box sx={{ margin: 0, textAlign: "center" }}>Witaj {user.email}!</Box>
      <Button
        sx={{ color: buttonTextColor, bgcolor: buttonBgColor, ml: "15px" }}
        onClick={logoutHandler}
      >
        {t(authMessages.logoutButton.key)}
      </Button>
    </Box>
  );
};

export default Profile;
