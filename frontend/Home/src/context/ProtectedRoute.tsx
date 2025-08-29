// import React, { useContext } from "react";
// import { userContext } from "./ContextProvider";
// import { Navigate, useLocation } from "react-router-dom";

// type UserRole = "admin" | "landlord" | "apartments" | "user";

// type ProtectedRouteProps = {
//   children: React.ReactNode;
//   roles?: UserRole[]; // optional: if omitted, only checks authentication
// };

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
//   const location = useLocation();
//   const { role, authenticated } = useContext(userContext);

//   if (!authenticated) {
//     // send them to login and remember where they came from
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   if (roles && !roles.includes(role)) {
//     return <Navigate to="/UnAuthorized_Access" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: Array<"Tenant" | "Landlord">;
}) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/UnAuthorized_Access" replace />;
  }
  return <>{children}</>;
}
