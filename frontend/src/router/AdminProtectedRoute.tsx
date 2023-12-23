import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../store/AuthContext/AuthContext";
import { usersApi } from "../config/api/users/users";
import { AUTHORITIES } from "../constants/authorities";

const AdminProtectedRoute: React.FC<PropsWithChildren> = (props) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      usersApi
        .getUserData()
        .then((user) => {
          if (user.authority === AUTHORITIES.ADMIN) {
            setIsAdmin(true);
          } else {
            navigate("/");
          }
        })
        .catch(() => {
          navigate("/");
        });
    } else {
      navigate("/login");
    }
  }, [isAuthenticated]);

  if (isAdmin) {
    return props.children;
  }

  return null;
};

export default AdminProtectedRoute;
