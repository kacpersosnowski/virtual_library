import { RouteObject } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import VerificationEmailSentPage from "./VerificationEmailSentPage";
import FinalizeRegistrationPage from "./FinalizeRegistrationPage";
import ForNotAuthenticatedRoute from "../../router/ForNotAuthenticatedRoute";

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
];

export default routes;
