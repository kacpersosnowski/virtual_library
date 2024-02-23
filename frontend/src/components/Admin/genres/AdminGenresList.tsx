import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AdminList from "../AdminList";
import adminMessages from "../../../messages/adminMessages";
import AdminGenresTable from "./AdminGenresTable";

const AdminGenresList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <AdminList
      actionButtonText={t(adminMessages.listGenreAddGenreButton.key)}
      actionButtonClickHandler={() => navigate("add")}
      searchFormId="admin-search-genres"
      searchStateKey="genresTable"
      table={<AdminGenresTable />}
    />
  );
};

export default AdminGenresList;
