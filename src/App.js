import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import Landing from "./views/Landing";
import Profile from "./views/Profile";
import Dashboard from "./views/admin/Dashboard";
import Settings from "./views/admin/Settings";
import Tables from "./views/admin/Tables";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ultils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* add routes with layouts */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index path="admin/dashboard" element={<Dashboard />} />
          <Route path="admin/settings" element={<Settings />} />
          <Route path="admin/tables" element={<Tables />} />
        </Route>

        <Route element={<Auth />}>
          <Route path="/auth/login" element={<Login />} />
        </Route>
        {/* add routes without layouts */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />

        {/* add redirect for first page */}
        {/* <Route path="*" element={<Admin />} /> */}
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
