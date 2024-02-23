import { RouteObject } from "react-router-dom";

import AdminPanel from "./AdminPanel";
import AdminProtectedRoute from "../../router/AdminProtectedRoute";
import AdminBooksList from "../../components/Admin/books/AdminBooksList";
import BookForm from "../../components/Forms/books/BookForm";
import AdminAuthorsList from "../../components/Admin/authors/AdminAuthorsList";
import AuthorForm from "../../components/Forms/authors/AuthorForm";
import AdminGenresList from "../../components/Admin/genres/AdminGenresList";
import GenreForm from "../../components/Forms/genres/GenreForm";

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
      {
        path: "authors",
        element: <AdminAuthorsList />,
      },
      { path: "authors/add", element: <AuthorForm /> },
      { path: "authors/edit/:id", element: <AuthorForm /> },
      {
        path: "genres",
        element: <AdminGenresList />,
      },
      { path: "genres/add", element: <GenreForm /> },
      { path: "genres/edit/:id", element: <GenreForm /> },
    ],
  },
];

export default routes;
