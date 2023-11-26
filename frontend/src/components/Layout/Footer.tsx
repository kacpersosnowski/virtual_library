import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import mainPageMessages from "../../messages/mainPageMessages";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
        height: "5rem",
        bgcolor: "primary.dark",
        mt: "3rem",
        boxShadow: "3px -5px 24px 0px rgba(66, 68, 90, 1)",
        position: "absolute",
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          paragraph
          sx={{
            color: "#dedede",
            fontSize: "1.4rem",
            pt: "1rem",
          }}
        >
          {t(mainPageMessages.footer.key)} &copy; {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
