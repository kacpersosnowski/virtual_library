import { RouteObject } from "react-router-dom";

import AdminPanel from "./AdminPanel";
import AdminProtectedRoute from "../../router/AdminProtectedRoute";
import AdminBooksList from "../../components/Admin/books/AdminBooksList";
import BookForm from "../../components/Forms/books/BookForm";

const routes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminPanel />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: "books",
        element: <AdminBooksList />,
      },
      { path: "books/add", element: <BookForm /> },
      { path: "books/edit/:id", element: <BookForm /> },
    ],
  },
];

export default routes;
