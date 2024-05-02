import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Box,
  Checkbox,
  Pagination,
  SxProps,
  Theme,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import SearchForm from "../common/SearchForm";
import { RootState } from "../../../store/redux";
import { searchActions } from "../../../store/redux/slices/search-slice";
import { booksApi } from "../../../config/api/books/books";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage";
import errorMessages from "../../../messages/errorMessages";
import BookItemCompressed from "../../Books/BookItemCompressed";
import { BookListDTO } from "../../../config/api/bookLists/bookLists.types";
import BookItemDisabled from "../../Books/BookItemDisabled";
import ActionButton from "../../UI/ActionButton";
import bookListsApi from "../../../config/api/bookLists/bookLists";
import { queryClient } from "../../../config/api";
import { snackbarActions } from "../../../store/redux/slices/snackbar-slice";
import bookListsMessages from "../../../messages/bookListsMessages";

type Props = {
  list: BookListDTO;
  containerSx?: SxProps<Theme>;
};

const AddBookToListForm: React.FC<Props> = (props) => {
  const searchText = useSelector(
    (state: RootState) => state.search.searchText.booksForList,
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [booksToAdd, setBooksToAdd] = useState([] as string[]);
  const [addCheckboxes, setAddCheckboxes] = useState<{
    [key: string]: boolean;
  }>({});
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    data: booksResponse,
    isLoading: isFetchingLoading,
    isError: isFetchingError,
  } = useQuery({
    queryKey: ["books", { page: currentPage, search: searchText }],
    queryFn: () =>
      booksApi.getAllBooksWithParams({ page: currentPage, search: searchText }),
  });
  const {
    mutate: addBooks,
    isLoading: isAddingLoading,
    isError: isAddingError,
  } = useMutation({
    mutationFn: bookListsApi.addBooksToList,
    onSuccess: () => {
      queryClient.invalidateQueries(["bookList", props.list.id]);
      dispatch(
        snackbarActions.show(
          t(bookListsMessages.addBooksToListSuccessMessage.key),
        ),
      );
      resetState();
    },
    onError: () => {
      resetState();
    },
  });

  const resetState = () => {
    setBooksToAdd([]);
    setAddCheckboxes({});
  };

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(
      searchActions.setSearchText({
        stateKey: "booksForList",
        searchText: event.target.value,
      }),
    );
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [searchText]);

  const books = booksResponse?.content;
  const totalPages = booksResponse
    ? Math.ceil(booksResponse.totalElements / 10)
    : 0;

  const listBookIds = props?.list?.books?.map((book) => book.id);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value - 1);
  };

  const handleCheckboxChange = (
    bookId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAddCheckboxes({
      ...addCheckboxes,
      [bookId]: event.target.checked,
    });
    if (event.target.checked) {
      setBooksToAdd([...booksToAdd, bookId]);
    } else {
      const bookIdIndex = booksToAdd.indexOf(bookId);
      if (bookIdIndex > -1) {
        const newBooksToAdd = [...booksToAdd];
        newBooksToAdd.splice(bookIdIndex, 1);
        setBooksToAdd(newBooksToAdd);
      }
    }
  };

  const toggleCheckBox = (bookId: string) => {
    const checkBoxChecked = addCheckboxes[bookId];
    if (checkBoxChecked) {
      setAddCheckboxes({
        ...addCheckboxes,
        [bookId]: false,
      });
      const bookIdIndex = booksToAdd.indexOf(bookId);
      if (bookIdIndex > -1) {
        const newBooksToAdd = [...booksToAdd];
        newBooksToAdd.splice(bookIdIndex, 1);
        setBooksToAdd(newBooksToAdd);
      }
    } else {
      setAddCheckboxes({
        ...addCheckboxes,
        [bookId]: true,
      });
      setBooksToAdd([...booksToAdd, bookId]);
    }
  };

  let content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
          mt: "2rem",
        }}
      >
        {books?.map((book) => {
          const doesBookExistInList =
            listBookIds && listBookIds.includes(book.id);
          return (
            <Badge
              key={book.id}
              badgeContent={
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  color="primary"
                  checked={
                    addCheckboxes[book.id] === undefined
                      ? false
                      : addCheckboxes[book.id]
                  }
                  onChange={handleCheckboxChange.bind(null, book.id)}
                  disabled={doesBookExistInList}
                />
              }
            >
              {doesBookExistInList ? (
                <BookItemDisabled book={book} />
              ) : (
                <BookItemCompressed
                  book={book}
                  key={book.id}
                  onClick={toggleCheckBox.bind(null, book.id)}
                />
              )}
            </Badge>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "1rem",
        }}
      >
        {totalPages > 1 && (
          <Pagination
            color="secondary"
            count={totalPages}
            siblingCount={2}
            page={currentPage + 1}
            onChange={handlePageChange}
            disabled={totalPages <= 1}
          />
        )}
      </Box>
    </>
  );

  if (isFetchingLoading) {
    content = <LoadingSpinner />;
  }

  if (isFetchingError || isAddingError) {
    content = (
      <ErrorMessage message={t(errorMessages.somethingWentWrongError.key)} />
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: 2,
          justifyContent: "center",
          ...props.containerSx,
        }}
      >
        {isAddingLoading && <LoadingSpinner />}
        {!isAddingLoading && (
          <ActionButton
            onClick={() => {
              addBooks({
                bookIdList: booksToAdd,
                listId: props.list.id,
              });
            }}
          >
            {t(bookListsMessages.addChosenBooksToListButton.key)}
          </ActionButton>
        )}
        <SearchForm
          id="add-books-to-list-search"
          inputSx={{ width: { xs: "12.5rem", md: "18rem" } }}
          placeholder={t(bookListsMessages.searchBooksPlaceholder.key)}
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </Box>
      {content}
    </>
  );
};

export default AddBookToListForm;
