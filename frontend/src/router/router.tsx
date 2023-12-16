import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/Layout/RootLayout/RootLayout";
import MainPage from "../pages/MainPage";

import authRoutes from "../pages/Auth/routes";
import adminRoutes from "../pages/Admin/routes";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> },
      ...authRoutes,
      ...adminRoutes,
    ],
  },
]);

export default router;
