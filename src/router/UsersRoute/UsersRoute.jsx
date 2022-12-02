import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { RoleContext } from "../../contexts/ProductProvider";

const UsersRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { role } = useContext(RoleContext);
  const location = useLocation();

  if (user && role === "user") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default UsersRoute;
