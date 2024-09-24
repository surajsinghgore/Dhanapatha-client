import { Outlet, Navigate } from "react-router-dom";
import { getLocalStorage } from "../utils/LocalStorage";

const AuthProtected = () => {
  const token = getLocalStorage("token");

  if (!token) {
    return <Navigate to="/auth/login" replace />;  
  }


  return <Outlet />;
};

export default AuthProtected;
