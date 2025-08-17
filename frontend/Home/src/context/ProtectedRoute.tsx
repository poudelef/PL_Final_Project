import React, { useContext } from "react";
import { userContext } from "./ContextProvider";
import { Navigate, useLocation } from "react-router-dom";

type UserRole = "admin" | "landlord" | "apartments" | "user";

type ProtectedRouteProps = {
  children: React.ReactNode;
  roles?: UserRole[]; // optional: if omitted, only checks authentication
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const location = useLocation();
  const { role, authenticated } = useContext(userContext);

  if (!authenticated) {
    // send them to login and remember where they came from
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/UnAuthorized_Access" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
