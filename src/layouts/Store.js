import React from "react";
import { Outlet } from "react-router-dom";

// components

import Sidebar from "../components/Sidebar/Sidebar";
import StoreHeaderStats from "../components/Headers/StoreHeaderStats";
import FooterAdmin from "../components/Footers/FooterAdmin";
import { StoreLinks } from "../utils/links";
import Navbar from "../components/Navbars/Navbar";
import { useSelector } from "react-redux";

export default function Store() {
  const { isDashboardLoading } = useSelector((store) => store.dashboard);

  return (
    <div className="bg-slate-50">
      <Sidebar props={StoreLinks} />
      {/* Header */}
      <div className="relative md:ml-64">
        <Navbar link={"/store/store-dashboard"} />
        {/* <StoreHeaderStats /> */}
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Outlet />
          {!isDashboardLoading && <FooterAdmin />}
        </div>
      </div>
    </div>
  );
}
