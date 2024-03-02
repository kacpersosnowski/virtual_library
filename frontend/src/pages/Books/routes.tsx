import { RouteObject } from "react-router-dom";

import BookDetailPage from "./BookDetailPage";
import ReadBookPage from "./ReadBookPage";
import BookCategoryListsPage from "./BookCategoryListsPage";

const routes: RouteObject[] = [
  {
    path: "/book/:id",
    element: <BookDetailPage />,
  },
  {
    path: "/book/read/:id",
    element: <ReadBookPage />,
  },
  {
    path: "/books-by-category",
    element: <BookCategoryListsPage />,
  },
];

export default routes;
