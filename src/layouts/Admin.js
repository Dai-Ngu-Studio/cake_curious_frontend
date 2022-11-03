import React from "react";
import { Outlet } from "react-router-dom";

// components

import Sidebar from "../components/Sidebar/Sidebar";
import HeaderStats from "../components/Headers/HeaderStats";
import FooterAdmin from "../components/Footers/FooterAdmin";
import { AdminLinks } from "../ultils/links";
import Navbar from "../components/Navbars/Navbar";

export default function Admin() {
  return (
    <div className="bg-slate-50">
      <Sidebar props={AdminLinks} />
      <div className="relative md:ml-64">
        <Navbar link={"/admin/admin-dashboard"} />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full">
          <Outlet />
          <FooterAdmin />
        </div>
      </div>
    </div>
  );
}
