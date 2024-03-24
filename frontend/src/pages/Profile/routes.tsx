import { RouteObject } from "react-router-dom";

import ProfilePage from "./ProfilePage";

const routes: RouteObject[] = [
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];

export default routes;
