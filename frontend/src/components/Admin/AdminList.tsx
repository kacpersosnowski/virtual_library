import { Box } from "@mui/material";

import AdminListHeader from "./AdminListHeader";
import { searchStateKey } from "../../store/redux/slices/search-slice";
import React from "react";

type Props = {
  actionButtonClickHandler: () => void;
  actionButtonText: string;
  searchFormId: string;
  searchStateKey: searchStateKey;
  table: JSX.Element;
};

const AdminList: React.FC<Props> = (props) => {
  return (
    <Box
      sx={{
        width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
        py: "1rem",
      }}
    >
      <AdminListHeader
        actionButtonText={props.actionButtonText}
        actionButtonClickHandler={props.actionButtonClickHandler}
        searchFormId={props.searchFormId}
        searchStateKey={props.searchStateKey}
      />
      {props.table}
    </Box>
  );
};

export default AdminList;
