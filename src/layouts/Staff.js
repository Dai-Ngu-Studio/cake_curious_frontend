import React from "react";
import { Outlet } from "react-router-dom";

// components

import Sidebar from "../components/Sidebar/Sidebar";
// import HeaderStats from "../components/Headers/StoreHeaderStats";
import FooterAdmin from "../components/Footers/FooterAdmin";
import { StaffLinks } from "../utils/links";
import Navbar from "../components/Navbars/Navbar";
import { useSelector } from "react-redux";

export default function Staff() {
  const { isDashboardLoading } = useSelector((store) => store.dashboard);

  return (
    <div className="bg-slate-50">
      <Sidebar props={StaffLinks} />
      <div className="relative md:ml-64">
        <Navbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="px-4 md:px-10 mx-auto w-full">
          <Outlet />
          {/* {!isDashboardLoading && <FooterAdmin />} */}
        </div>
      </div>
    </div>
  );
}
