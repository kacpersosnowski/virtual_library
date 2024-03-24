import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ActionButton from "../../UI/ActionButton";
import mainPageMessages from "../../../messages/mainPageMessages";
import { AuthContext } from "../../../store/AuthContext/AuthContext";

const WelcomeElement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: { xs: "100%", md: "75%" },
        padding: "20px",
        textAlign: "center",
        ml: "auto",
        mr: "auto",
      }}
    >
      <Typography variant="h2" sx={{ color: "white" }}>
        {t(mainPageMessages.bannerHeader.key)}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "white",
          textAlign: "justify",
          mt: "10px",
          fontSize: "1.1rem",
        }}
      >
        {t(mainPageMessages.bannerText.key)}
      </Typography>
      {!isAuthenticated && (
        <ActionButton
          sx={{ mt: "1.2rem", width: "15rem", p: "10px 0", fontSize: "1.3rem" }}
          onClick={() => {
            navigate("/register");
          }}
        >
          {t(mainPageMessages.buttonsJoinUs.key)}
        </ActionButton>
      )}
    </Box>
  );
};

export default WelcomeElement;
