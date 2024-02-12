import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import ActionButton from "../../UI/ActionButton";
import SearchForm from "../../Forms/common/SearchForm";
import { RootState } from "../../../store/redux";
import {
  searchActions,
  searchStateKey,
} from "../../../store/redux/slices/search-slice";

type Props = {
  actionButtonClickHandler: () => void;
  actionButtonText: string;
  searchFormId: string;
  searchStateKey: searchStateKey;
};

const AdminListHeader: React.FC<Props> = (props) => {
  const searchText = useSelector(
    (state: RootState) => state.search.searchText[props.searchStateKey],
  );
  const dispatch = useDispatch();

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(
      searchActions.setSearchText({
        stateKey: props.searchStateKey,
        searchText: event.target.value,
      }),
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "center", md: "space-between" },
        alignItems: "center",
        mb: "1rem",
        flexWrap: "wrap",
        columnGap: 2,
      }}
    >
      <ActionButton onClick={props.actionButtonClickHandler}>
        {props.actionButtonText}
      </ActionButton>
      <SearchForm
        id={props.searchFormId}
        containerSx={{ mr: 0 }}
        value={searchText}
        onChange={handleSearchTextChange}
      />
    </Box>
  );
};

export default AdminListHeader;
