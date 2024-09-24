import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../utils/LocalStorage";

const Root = () => {
  const navigate = useNavigate();
  const token = getLocalStorage("token");
  useEffect(() => {
    if (!token) {
      navigate("/auth/login", { replace: true });
    }else{
      navigate("/user/dashboard", { replace: true });
    }
  }, [token,  navigate]);

  return null;
};

export default Root;
