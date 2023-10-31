import { Box, Container, Typography } from "@mui/material";
import React from "react";

type Props = {
  text: string;
};

const BooksHeader: React.FC<Props> = (props) => {
  return (
    <Container maxWidth={"xl"}>
      <Box sx={{ pt: "4rem" }}>
        <Typography
          variant="h4"
          sx={{
            letterSpacing: "0.3rem",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {props.text}
        </Typography>
      </Box>
    </Container>
  );
};

export default BooksHeader;
