import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "6rem",
        bgcolor: "primary.dark",
        mt: "3rem",
        boxShadow: "3px -5px 24px 0px rgba(66, 68, 90, 1)",
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
          Wszelkie prawa zastrzeżone &copy; {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
