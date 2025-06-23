import { Navigate } from "react-router";
import { useAuth } from "../../context/authContext";
import { ROUTES } from "../../routes";

const ProtectedRoute = ({ children, redirectTo = ROUTES.AUTH_LOGIN }) => {
  const { isAuthenticated } = useAuth();

  if(!isAuthenticated) return <Navigate to={redirectTo} replace />;

  return children;
}

export default ProtectedRoute;