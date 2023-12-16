import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import booksBg from "../../assets/books-bg.jpg";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import Card from "../../components/UI/Card/Card";
import authMessages from "../../messages/authMessages";

const VerificationEmailSentPage = () => {
  const { t } = useTranslation();

  return (
    <ImageBackground image={booksBg}>
      <Card>
        <Typography variant="h4" sx={{ mb: "1.5rem" }}>
          {t(authMessages.verificationEmailSent.key)}
        </Typography>
        <Typography variant="h6">
          {t(authMessages.checkEmailHeader.key)}{" "}
          <Box className="primary-link">{localStorage.getItem("email")}</Box>
        </Typography>
        <Typography paragraph sx={{ mt: "2rem" }}>
          {t(authMessages.clickActivationLink.key)}{" "}
          <Link to="/login" className="primary-link">
            {t(authMessages.login.key)}
          </Link>{" "}
          {t(authMessages.ourSitePrompt.key)}
        </Typography>
      </Card>
    </ImageBackground>
  );
};

export default VerificationEmailSentPage;
