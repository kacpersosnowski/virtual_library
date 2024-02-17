import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AdminList from "../AdminList";
import AdminAuthorsTable from "./AdminAuthorsTable";
import adminMessages from "../../../messages/adminMessages";

const AdminAuthorsList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <AdminList
      actionButtonText={t(adminMessages.listAuthorAddBookButton.key)}
      actionButtonClickHandler={() => navigate("add")}
      searchFormId="admin-search-authors"
      searchStateKey="authorsTable"
      table={<AdminAuthorsTable />}
    />
  );
};

export default AdminAuthorsList;
