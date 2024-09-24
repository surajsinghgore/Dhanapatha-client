import { Outlet, Navigate } from "react-router-dom";
import { getLocalStorage } from "../utils/LocalStorage";

const AuthProtected = () => {
  const token = getLocalStorage("token");

  // If token exists, navigate to the dashboard
  if (token) {
    return <Navigate to="/user/dashboard" replace />;  // Ensure you return the Navigate component
  }

  // Otherwise, render the Outlet for nested routes
  return <Outlet />;
};

export default AuthProtected;
