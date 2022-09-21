import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import StoreDashboard from "views/store/Dashboard.js";
import Products from "views/store/Products.js";
import StaffDashboard from "views/staff/Dashboard.js";
import StaffReports from "views/staff/Reports.js";
export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            {/* If isStore */}
            {/* <Route path="/staff/dashboard" exact component={StoreDashboard} />
            <Route path="/staff/tables" exact component={Products} /> */}
            {/* If isStore */}
            {/* <Route path="/staff/dashboard" exact component={StoreDashboard} />
            <Route path="/staff/tables" exact component={StaffReports} /> */}
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
