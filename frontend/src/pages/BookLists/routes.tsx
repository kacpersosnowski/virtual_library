import { RouteObject } from "react-router-dom";

import BookListsPage from "./BookListsPage";
import ProtectedRoute from "../../router/ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/book-lists",
    element: (
      <ProtectedRoute>
        <BookListsPage />
      </ProtectedRoute>
    ),
  },
];

export default routes;
