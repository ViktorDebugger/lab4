import { Navigate } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/lab4" />;
};

export default PrivateRoute;
