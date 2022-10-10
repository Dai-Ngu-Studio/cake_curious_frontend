import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token, user } = useSelector((store) => store.user);

  // if (token) {
  //   if (user) {
  //     // for (let index = 0; index < user.hasRoles.length; index++) {
  //     //   const element = user.hasRoles[index];
  //     //   // if (element.roleId === 0) {
  //     //   //   return <Navigate to="/admin/admin-dashboard" />;
  //     //   // } else if (element.roleId === 1) {
  //     //   //   console.log(element.roleId);
  //     //   //   console.log("hi");
  //     //   //   return <Navigate to="/staff/staff-dashboard" />;
  //     //   // } else if (element.roleId === 2) {
  //     //   //   return <Navigate to="/store/store-dashboard" />;
  //     //   // }
  //     //   //return <Navigate to="/staff/staff-dashboard" />;
  //     // }
  //     return <Navigate to="/staff/staff-dashboard" />;
  //   }
  // }
  if (!token) {
    return <Navigate to="/" />;
  } else {
    if (user) {
      return children;
    }
  }
};

export default ProtectedRoute;
