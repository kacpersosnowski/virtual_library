import { useEffect, useState } from "react";

import { usersApi } from "../config/api/users/users";
import { UserData } from "../config/api/users/users.types";

const useFetchUserData = () => {
  const [user, setUser] = useState<UserData>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    usersApi
      .getUserData()
      .then((user) => {
        setUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status !== 403) {
          setError(error);
        }
        setIsLoading(false);
      });
  }, []);

  return { user, isLoading, error };
};

export default useFetchUserData;
