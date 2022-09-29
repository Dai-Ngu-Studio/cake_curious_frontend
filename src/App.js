import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import Landing from "./views/Landing";
import Profile from "./views/Profile";
import AdminDashboard from "./views/admin/AdminDashboard";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./assets/styles/tailwind.css";
import Login from "./views/auth/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ultils/ProtectedRoute";
import StoreTables from "./views/admin/StoreTables";
import AccountTables from "./views/admin/AccountTables";
import StaffDashboard from "./views/staff/StaffDashboard";
import ReportTables from "./views/staff/ReportTables";
import Staff from "./layouts/Staff";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* add routes with layouts */}
        <Route
          path="/admin/"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="store-tables" element={<StoreTables />} />
          <Route path="account-tables" element={<AccountTables />} />
        </Route>
        <Route
          path="/staff/"
          element={
            <ProtectedRoute>
              <Staff />
            </ProtectedRoute>
          }
        >
          <Route index element={<StaffDashboard />} />
          <Route path="staff-dashboard" element={<StaffDashboard />} />
          <Route path="report-tables" element={<ReportTables />} />
        </Route>

        <Route element={<Auth />}>
          <Route path="/auth/login" element={<Login />} />
        </Route>
        {/* add routes without layouts */}
        <Route index path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />

        {/* add redirect for first page */}
        {/* <Route path="*" element={<Admin />} /> */}
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
