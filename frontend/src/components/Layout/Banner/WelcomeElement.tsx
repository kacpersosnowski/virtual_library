import { Box, Typography } from "@mui/material";
import ActionButton from "../ActionButton";

const WelcomeElement = () => {
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
        Witaj!
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius,
        odio et bibendum dapibus, eros enim consectetur lectus, ac consequat
        diam augue nec velit. Aenean tellus tortor, aliquam quis tellus et,
        malesuada elementum dui. Aliquam gravida est sed auctor suscipit. Nulla
        id molestie sapien. Donec mattis pulvinar bibendum. Vivamus a
        consectetur nisi. In et diam a turpis lobortis pharetra. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
      </Typography>
      <ActionButton
        sx={{ mt: "1.2rem", width: "15rem", p: "10px 0", fontSize: "1.3rem" }}
      >
        Dołącz do nas
      </ActionButton>
    </Box>
  );
};

export default WelcomeElement;
