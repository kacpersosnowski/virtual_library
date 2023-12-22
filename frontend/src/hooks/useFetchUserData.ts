import { useQuery } from "react-query";

import { usersApi } from "../config/api/users/users";

const useFetchUserData = () => {
  const resultData = useQuery({
    queryKey: ["me"],
    queryFn: usersApi.getUserData,
  });

  return resultData;
};

export default useFetchUserData;
