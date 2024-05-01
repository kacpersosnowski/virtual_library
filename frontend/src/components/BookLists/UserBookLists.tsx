import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

import { BookListDTO } from "../../config/api/bookLists/bookLists.types";
import BooksList from "../Books/BooksList/BooksList";
import bookListsMessages from "../../messages/bookListsMessages";
import UserBookListHeader from "./UserBookListHeader";

type Props = {
  lists: BookListDTO[];
};

const UserBookLists: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <>
      {props.lists.map((bookList, index) => {
        return bookList.books.length > 0 ? (
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
                sx={{ pt: 0 }}
              />
            }
          />
        ) : (
          <>
            <UserBookListHeader
              key={index}
              text={bookList.name}
              listId={bookList.id}
              sx={{ pt: 0 }}
            />
            <Box>
              <Typography variant="h5">
                {t(bookListsMessages.noBooks.key)}
              </Typography>
            </Box>
          </>
        );
      })}
    </>
  );
};

export default UserBookLists;
