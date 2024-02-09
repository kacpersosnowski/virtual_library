import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import MainNavbar from "../components/Layout/RootLayout/MainNavbar";
import Footer from "../components/Layout/RootLayout/Footer";
import ImageBackground from "../components/Layout/ImageBackground/ImageBackground";
import Card from "../components/UI/Card/Card";
import errorMessages from "../messages/errorMessages";

import booksBg from "../assets/books-bg.jpg";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <Box sx={{ paddingBottom: "5rem" }}>
        <MainNavbar />
        <ImageBackground image={booksBg}>
          <Card>
            <Typography variant="h3">Oops!</Typography>
            <Typography paragraph sx={{ marginY: "2rem", fontSize: "1.3rem" }}>
              {t(errorMessages.pageNotFoundError.key)}{" "}
              <Link to="/" className="primary-link">
                {t(errorMessages.pageNotFoundErrorMainPage.key)}
              </Link>
            </Typography>
          </Card>
        </ImageBackground>
      </Box>
      <Footer />
    </Box>
  );
};

export default ErrorPage;
