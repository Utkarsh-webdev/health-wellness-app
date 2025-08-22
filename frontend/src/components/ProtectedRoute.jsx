import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const raw = localStorage.getItem("healthSyncUser");
  const user = raw ? JSON.parse(raw) : null;
  return user?.token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
