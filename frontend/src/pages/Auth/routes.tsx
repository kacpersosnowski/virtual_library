import { RouteObject } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import VerificationEmailSentPage from "./VerificationEmailSentPage";
import FinalizeRegistrationPage from "./FinalizeRegistrationPage";
import ForNotAuthenticatedRoute from "../../router/ForNotAuthenticatedRoute";
import ResetPasswordEmailPage from "./ResetPasswordEmailPage";
import ResetPasswordEmailSentPage from "./ResetPasswordEmailSentPage";
import ResetPasswordPage from "./ResetPasswordPage";

const routes: RouteObject[] = [
  {
    path: "login",
    element: (
      <ForNotAuthenticatedRoute>
        <LoginPage />
      </ForNotAuthenticatedRoute>
    ),
  },
  {
    path: "register",
    element: (
      <ForNotAuthenticatedRoute>
        <RegisterPage />
      </ForNotAuthenticatedRoute>
    ),
  },
  {
    path: "verification-email-sent",
    element: <VerificationEmailSentPage />,
  },
  {
    path: "token/:token",
    element: <FinalizeRegistrationPage />,
  },
  {
    path: "reset-password",
    element: <ResetPasswordEmailPage />,
  },
  {
    path: "reset-password-email-sent",
    element: <ResetPasswordEmailSentPage />,
  },
  {
    path: "reset-password/:token",
    element: <ResetPasswordPage />,
  },
];

export default routes;
