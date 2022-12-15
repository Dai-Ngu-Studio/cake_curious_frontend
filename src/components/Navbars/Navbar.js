import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AdminLinks, StaffLinks, StoreLinks } from "../../utils/links";

import UserDropdown from "../Dropdowns/UserDropdown";

export default function Navbar() {
  const { user } = useSelector((store) => store.user);
  const location = useLocation();
  let title = "";

  let priorityRole = 99;
  for (let i = 0; i < user.hasRoles.length; i++) {
    var roleId = user.hasRoles[i].roleId;
    if (roleId < priorityRole) {
      priorityRole = roleId;
    }
  }
  if (priorityRole === 0) {
    for (let index = 0; index < AdminLinks.links.length; index++) {
      const element = AdminLinks.links[index];
      if (element.linkTo === location.pathname) {
        title = element.name;
      }
    }
  } else if (priorityRole === 1) {
    for (let index = 0; index < StoreLinks.links.length; index++) {
      const element = StoreLinks.links[index];
      if (element.linkTo === location.pathname) {
        title = element.name;
      }
    }
  } else if (priorityRole === 2) {
    for (let index = 0; index < StaffLinks.links.length; index++) {
      const element = StaffLinks.links[index];
      if (element.linkTo === location.pathname) {
        title = element.name;
      }
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 z-50">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <div className="text-sm uppercase hidden lg:inline-block font-semibold">
            {title}
          </div>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
