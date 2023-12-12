import { RouteObject } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import VerificationEmailSentPage from "./VerificationEmailSentPage";

const routes: RouteObject[] = [
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  {
    path: "verification-email-sent",
    element: <VerificationEmailSentPage />,
  },
];

export default routes;
