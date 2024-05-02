import { RouteObject } from "react-router-dom";

import BookListsPage from "./BookListsPage";
import BookListDetailsPage from "./BookListDetailsPage";
import ProtectedRoute from "../../router/ProtectedRoute";
import AddBookListPage from "./AddBookListPage";

const routes: RouteObject[] = [
  {
    path: "/book-lists",
    element: (
      <ProtectedRoute>
        <BookListsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/book-lists/:id",
    element: (
      <ProtectedRoute>
        <BookListDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/book-lists/add",
    element: (
      <ProtectedRoute>
        <AddBookListPage />
      </ProtectedRoute>
    ),
  },
];

export default routes;
