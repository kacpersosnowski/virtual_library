import { useState } from "react";
import {
  Badge,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import { BookListDTO } from "../../config/api/bookLists/bookLists.types";
import UserBookListHeader from "./UserBookListHeader";
import BookItemCompressed from "../Books/BookItemCompressed";

type Props = {
  bookList: BookListDTO;
};

const UserBookListView: React.FC<Props> = (props) => {
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDeleteMode(event.target.checked);
  };

  return (
    <Box>
      <UserBookListHeader
        listId={props.bookList.id}
        text={props.bookList.name}
      />
      <Box>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isDeleteMode}
                  onChange={handleChange}
                  name="delete-mode"
                  color="error"
                />
              }
              label="Tryb usuwania"
            />
          </FormGroup>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
          mt: "2rem",
        }}
      >
        {props.bookList.books.map((book) => {
          if (!isDeleteMode) {
            return <BookItemCompressed book={book} key={book.id} />;
          } else {
            return (
              <Badge
                key={book.id}
                badgeContent={
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    icon={<DeleteOutlineIcon />}
                    checkedIcon={<DeleteIcon />}
                    color="error"
                  />
                }
              >
                <BookItemCompressed book={book} key={book.id} />
              </Badge>
            );
          }
        })}
      </Box>
    </Box>
  );
};

export default UserBookListView;
