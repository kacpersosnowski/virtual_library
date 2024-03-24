import { useQuery } from "react-query";
import { useState } from "react";

import { usersApi } from "../config/api/users/users";
import { UserData } from "../config/api/users/users.types";
import { isAxiosError } from "axios";

const useFetchUserData = () => {
  const [user, setUser] = useState<UserData>(null);
  const [error, setError] = useState(null);

  const { isLoading } = useQuery({
    queryFn: usersApi.getUserData,
    queryKey: ["user"],
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response.status !== 403) {
        setError(error);
      }
    },
  });

  return { user, isLoading: isLoading, error };
};

export default useFetchUserData;
