import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { BookListDTO } from "../../config/api/bookLists/bookLists.types";
import BooksList from "../Books/BooksList/BooksList";
import bookListsMessages from "../../messages/bookListsMessages";
import UserBookListHeader from "./UserBookListHeader";
import ActionButton from "../UI/ActionButton";

type Props = {
  lists: BookListDTO[];
  readonlyMode?: boolean;
};

const UserBookLists: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {props.lists.map((bookList, index) => {
        return bookList.books.length > 0 ? (
          <>
            <BooksList
              key={index}
              books={bookList.books}
              isLoading={false}
              isError={false}
              sx={index === 0 ? { mt: "1rem" } : {}}
              headerSx={{ pt: 0 }}
              headerComponent={
                <UserBookListHeader
                  text={bookList.name}
                  listId={bookList.id}
                  sx={{ pt: 0, mt: props.readonlyMode && "2rem" }}
                  isEditable={props.readonlyMode ? false : index !== 0}
                />
              }
              listSx={{ mb: 0 }}
              displayFooter={!props.readonlyMode}
              footerText={t(bookListsMessages.manageBooksButton.key)}
              footerButtonSx={{
                zIndex: 10,
                width: "auto",
                px: "1rem",
                fontSize: "1rem",
              }}
              footerOnClick={() => navigate(bookList.id)}
            />
          </>
        ) : (
          <>
            <UserBookListHeader
              key={index}
              text={bookList.name}
              listId={bookList.id}
              sx={{ pt: 0 }}
              isEditable={props.readonlyMode ? false : index !== 0}
            />
            <Box>
              <Typography variant="h5" sx={{ mt: "1rem" }}>
                {t(bookListsMessages.noBooks.key)}
              </Typography>
            </Box>
            <ActionButton
              onClick={() => navigate(bookList.id)}
              sx={{
                zIndex: 10,
                width: "auto",
                px: "1rem",
                fontSize: "1rem",
                py: "10px",
                mt: "1.2rem",
                mb: "2.5rem",
              }}
            >
              {t(bookListsMessages.manageBooksButton.key)}
            </ActionButton>
          </>
        );
      })}
    </>
  );
};

export default UserBookLists;
