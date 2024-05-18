import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import SearchForm from "../Forms/common/SearchForm";
import { RootState } from "../../store/redux";
import { searchActions } from "../../store/redux/slices/search-slice";

const UsersTableHeader = () => {
  const searchText = useSelector(
    (state: RootState) => state.search.searchText.searchUsers,
  );
  const dispatch = useDispatch();

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(
      searchActions.setSearchText({
        stateKey: "searchUsers",
        searchText: event.target.value,
      }),
    );
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <SearchForm
        id="users-search-form"
        containerSx={{ mr: 0, mb: "0.7rem" }}
        value={searchText}
        onChange={handleSearchTextChange}
      />
    </Box>
  );
};

export default UsersTableHeader;
