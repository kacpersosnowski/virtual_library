import { Box, Container, SxProps, Theme, Typography } from "@mui/material";
import React from "react";

type Props = {
  text: string;
  sx?: SxProps<Theme>;
};

const BooksHeader: React.FC<Props> = (props) => {
  return (
    <Container maxWidth={"xl"} sx={{ position: "relative", zIndex: 5 }}>
      <Box sx={{ pt: "4rem", ...props.sx }}>
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
