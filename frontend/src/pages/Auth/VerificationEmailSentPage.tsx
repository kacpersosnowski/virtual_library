import { Box, Typography } from "@mui/material";
import booksBg from "../../assets/books-bg.jpg";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import Card from "../../components/UI/Card/Card";
import { Link } from "react-router-dom";

const VerificationEmailSentPage = () => {
  return (
    <ImageBackground image={booksBg}>
      <Card>
        <Typography variant="h4" sx={{ mb: "1.5rem" }}>
          Verification e-mail has been sent to you.
        </Typography>
        <Typography variant="h6">
          Check your e-mail:{" "}
          <Box className="primary-link">{localStorage.getItem("email")}</Box>
        </Typography>
        <Typography paragraph sx={{ mt: "2rem" }}>
          Click the activation link and{" "}
          <Link to="/login" className="primary-link">
            login
          </Link>{" "}
          to our site.
        </Typography>
      </Card>
    </ImageBackground>
  );
};

export default VerificationEmailSentPage;
