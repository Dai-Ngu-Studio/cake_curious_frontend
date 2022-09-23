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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* add routes with layouts */}
        <Route index element={<Admin />} />
        <Route path="/" element={<Admin />}>
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="admin/settings" element={<Settings />} />
          <Route path="admin/tables" element={<Tables />} />
        </Route>
        <Route path="/auth/" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* add routes without layouts */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />

        {/* add redirect for first page */}
        <Route path="*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
