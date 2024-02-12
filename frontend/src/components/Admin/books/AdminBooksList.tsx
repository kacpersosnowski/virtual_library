import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import adminMessages from "../../../messages/adminMessages";
import AdminListHeader from "./AdminListHeader";
import AdminBooksTable from "./AdminBooksTable";

const AdminBooksList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
        py: "1rem",
      }}
    >
      <AdminListHeader
        actionButtonText={t(adminMessages.listBookAddBookButton.key)}
        actionButtonClickHandler={() => navigate("add")}
        searchFormId="admin-search-books"
        searchStateKey="booksTable"
      />
      <AdminBooksTable />
    </Box>
  );
};

export default AdminBooksList;
