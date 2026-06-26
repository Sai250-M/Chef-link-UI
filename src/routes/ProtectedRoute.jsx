import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ROUTES } from "../constants/routes";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner fullPage />;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const roleRoute = {
      ROLE_CHEF: ROUTES.CHEF_DASHBOARD,
      ROLE_HELPER: ROUTES.HELPER_DASHBOARD,
      ROLE_RESTAURANT: ROUTES.RESTAURANT_DASHBOARD,
      ROLE_ADMIN: ROUTES.ADMIN_DASHBOARD,
    };
    return <Navigate to={roleRoute[user.role] ?? ROUTES.HOME} replace />;
  }

  return children;
};
