import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../store/AuthContext/AuthContext";
import { usersApi } from "../config/api/users/users";
import { AUTHORITIES } from "../constants/authorities";

const useIsAdmin = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      usersApi
        .getUserData()
        .then((user) => {
          if (user.authority === AUTHORITIES.ADMIN) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        })
        .catch(() => setIsAdmin(false));
    } else {
      setIsAdmin(false);
    }
  }, [isAuthenticated]);

  return isAdmin;
};

export default useIsAdmin;
