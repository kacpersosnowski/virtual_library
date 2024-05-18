import { RouteObject } from "react-router-dom";

import UsersPage from "./UsersPage";

const routes: RouteObject[] = [
  {
    path: "/users",
    element: <UsersPage />,
  },
];

export default routes;
