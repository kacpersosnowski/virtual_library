import { RouteObject } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import VerificationEmailSentPage from "./VerificationEmailSentPage";
import FinalizeRegistrationPage from "./FinalizeRegistrationPage";

const routes: RouteObject[] = [
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  {
    path: "verification-email-sent",
    element: <VerificationEmailSentPage />,
  },
  {
    path: "token/:token",
    element: <FinalizeRegistrationPage />,
  },
];

export default routes;
