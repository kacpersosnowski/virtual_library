import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

import { authApi } from "../../config/api/auth/auth";

const FinalizeRegistrationPage = () => {
  const initialized = useRef(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const { mutate: finalizeRegistration } = useMutation({
    mutationFn: authApi.finalizeRegistration,
    onSuccess: () => {
      navigate("/login", { state: { accountActivated: true } });
    },
    onError: () => {
      navigate("/invalid-url");
    },
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      finalizeRegistration(token);
    }
  }, []);

  return null;
};

export default FinalizeRegistrationPage;
