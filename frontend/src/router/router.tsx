import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/Layout/RootLayout/RootLayout";
import MainPage from "../pages/MainPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [{ index: true, element: <MainPage /> }],
  },
]);

export default router;
