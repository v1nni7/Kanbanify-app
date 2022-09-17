import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = JSON.parse(localStorage.getItem("user") as any);

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
