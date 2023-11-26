import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/Layout/RootLayout/RootLayout";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/Auth/LoginPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

export default router;
