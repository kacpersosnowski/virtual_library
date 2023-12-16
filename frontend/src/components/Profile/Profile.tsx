import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../../store/AuthContext/AuthContext";
import authMessages from "../../messages/authMessages";

type Props = {
  variant: "drawer" | "navbar";
};

const Profile: React.FC<Props> = (props) => {
  const { logout } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      <Box sx={{ margin: 0, textAlign: "center" }}>
        Witaj {localStorage.getItem("email")}!
      </Box>
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