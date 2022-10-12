import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { token, user } = useSelector((store) => store.user);

  if (!token) {
    return <Navigate to="/" />;
  }
  if (token) {
    if (user) {
      let priorityRole = 99;
      for (let i = 0; i < user.hasRoles.length; i++) {
        var roleId = user.hasRoles[i].roleId;
        if (roleId < priorityRole) {
          priorityRole = roleId;
        }
      }
      if (role !== priorityRole) {
        return <Navigate to="/unauthorized" />;
      }
    }
  }
  return children;
};

export default ProtectedRoute;
