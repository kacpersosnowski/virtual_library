import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import adminMessages from "../../../messages/adminMessages";
import AdminBooksTable from "./AdminBooksTable";
import AdminList from "../AdminList";

const AdminBooksList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <AdminList
      actionButtonText={t(adminMessages.listBookAddBookButton.key)}
      actionButtonClickHandler={() => navigate("add")}
      searchFormId="admin-search-books"
      searchStateKey="booksTable"
      table={<AdminBooksTable />}
    />
  );
};

export default AdminBooksList;
