import React from "react";
import { Outlet } from "react-router-dom";

// components

import Sidebar from "../components/Sidebar/Sidebar";
import HeaderStats from "../components/Headers/HeaderStats";
import FooterAdmin from "../components/Footers/FooterAdmin";
import { StaffLinks } from "../ultils/links";
import Navbar from "../components/Navbars/Navbar";

export default function Staff() {
  return (
    <>
      <Sidebar props={StaffLinks} />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar link={"/staff/staff-dashboard"} />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Outlet />
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
