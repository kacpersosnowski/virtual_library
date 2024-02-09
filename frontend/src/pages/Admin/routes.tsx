import { RouteObject } from "react-router-dom";

import AdminPanel from "./AdminPanel";
import AddBookForm from "../../components/Forms/books/AddBookForm";
import AdminProtectedRoute from "../../router/AdminProtectedRoute";
import AdminBooksList from "../../components/Admin/AdminBooksList";

const routes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminPanel />
      </AdminProtectedRoute>
    ),
    children: [
      { path: "add-book", element: <AddBookForm /> },
      { path: "books", element: <AdminBooksList /> },
    ],
  },
];

export default routes;
