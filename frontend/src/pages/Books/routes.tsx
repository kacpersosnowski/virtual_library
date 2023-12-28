import { RouteObject } from "react-router-dom";
import BookDetailPage from "./BookDetailPage";

const routes: RouteObject[] = [
  {
    path: "/book/:id",
    element: <BookDetailPage />,
  },
];

export default routes;
