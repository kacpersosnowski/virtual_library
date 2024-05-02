import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Card from "../../components/UI/Card/Card";
import ImageBackground from "../../components/Layout/ImageBackground/ImageBackground";
import bookListsMessages from "../../messages/bookListsMessages";
import bookListsApi from "../../config/api/bookLists/bookLists";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import ErrorMessage from "../../components/UI/ErrorMessage";
import errorMessages from "../../messages/errorMessages";
import UserBookLists from "../../components/BookLists/UserBookLists";
import ActionButton from "../../components/UI/ActionButton";
import AddIcon from "@mui/icons-material/Add";

import booksBg from "../../assets/books-bg3.jpg";

const BookListsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data: bookLists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookLists"],
    queryFn: bookListsApi.getAllBookLists,
  });

  let content = <UserBookLists lists={bookLists} />;

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  if (isError) {
    content = (
      <ErrorMessage message={t(errorMessages.fetchUserBookListsError.key)} />
    );
  }

  return (
    <ImageBackground image={booksBg} containerSx={{ alignItems: "flex-start" }}>
      <Card sx={{ width: { xs: "100%", sm: "70%" }, py: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            px: "4rem",
            mb: "2rem",
          }}
        >
          <ActionButton sx={{ zIndex: 5 }} onClick={() => navigate("add")}>
            <AddIcon />
            {t(bookListsMessages.addListButton.key)}
          </ActionButton>
        </Box>
        <Typography variant="h3" sx={{ mb: "1rem" }}>
          {t(bookListsMessages.listsHeaderTitle.key)}
        </Typography>
        {content}
      </Card>
    </ImageBackground>
  );
};

export default BookListsPage;
