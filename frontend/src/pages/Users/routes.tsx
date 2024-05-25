import { RouteObject } from "react-router-dom";

import UsersPage from "./UsersPage";
import UserDetailsPage from "./UserDetailsPage";

const routes: RouteObject[] = [
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/users/:id",
    element: <UserDetailsPage />,
  },
];

export default routes;
