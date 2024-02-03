import { RouteObject } from "react-router-dom";

import BookDetailPage from "./BookDetailPage";
import ReadBookPage from "./ReadBookPage";

const routes: RouteObject[] = [
  {
    path: "/book/:id",
    element: <BookDetailPage />,
  },
  {
    path: "/book/read/:id",
    element: <ReadBookPage />,
  },
];

export default routes;
