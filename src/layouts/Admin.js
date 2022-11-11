import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// components

import Sidebar from "../components/Sidebar/Sidebar";
import FooterAdmin from "../components/Footers/FooterAdmin";
import { AdminLinks } from "../utils/links";
import Navbar from "../components/Navbars/Navbar";
import AdminHeaderStats from "../components/Headers/AdminHeaderStats";

export default function Admin() {
  const { isDashboardLoading } = useSelector((store) => store.dashboard);

  return (
    <div className="bg-slate-50">
      <Sidebar props={AdminLinks} />
      <div className="relative md:ml-64">
        <Navbar link={"/admin/admin-dashboard"} />
        {/* Header */}
        {/* <AdminHeaderStats/> */}
        <div className="px-4 md:px-10 mx-auto w-full">
          <Outlet />
          {!isDashboardLoading && <FooterAdmin />}
        </div>
      </div>
    </div>
  );
}
