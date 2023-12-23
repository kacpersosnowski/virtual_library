import { RouteObject } from "react-router-dom";

import AdminPanel from "./AdminPanel";
import AddBookForm from "../../components/Forms/books/AddBookForm";
import AdminProtectedRoute from "../../router/AdminProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminPanel />
      </AdminProtectedRoute>
    ),
    children: [{ path: "add-book", element: <AddBookForm /> }],
  },
];

export default routes;
