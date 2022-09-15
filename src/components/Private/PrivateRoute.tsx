import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") as any);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
