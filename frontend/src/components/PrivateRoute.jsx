import { Navigate } from "react-router-dom";
import { clearAuth, isTokenExpired } from "../utils/auth";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    clearAuth();
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
