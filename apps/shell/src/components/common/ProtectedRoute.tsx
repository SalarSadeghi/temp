import { useAuthStore } from "@superapp/shared-store";
import React from "react";
import { Navigate } from "react-router-dom";
// import { getTokenFromLocalStorage } from "@utils/index";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuthStore();
  // const token = getTokenFromLocalStorage();
  // also check the token’s validity later; for example expired tokens
  

  if (!token) {
    // Redirect to login if there is no token
    return <Navigate to="/auth/login" replace />;
  }
  // If token exists, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
