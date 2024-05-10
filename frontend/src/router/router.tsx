import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/Layout/RootLayout/RootLayout";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";

import authRoutes from "../pages/Auth/routes";
import adminRoutes from "../pages/Admin/routes";
import booksRoutes from "../pages/Books/routes";
import profileRoutes from "../pages/Profile/routes";
import bookListsRoutes from "../pages/BookLists/routes";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      ...authRoutes,
      ...adminRoutes,
      ...booksRoutes,
      ...profileRoutes,
      ...bookListsRoutes,
    ],
  },
]);

export default router;
