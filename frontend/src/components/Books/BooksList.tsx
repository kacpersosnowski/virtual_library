import { Container } from "@mui/material";
import BookItem from "./BookItem";

const BooksList = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: "4rem",
        mb: "4rem",
      }}
    >
      <BookItem priority={4} />
      <BookItem priority={3} />
      <BookItem priority={2} />
      <BookItem priority={1} />
    </Container>
  );
};

export default BooksList;
