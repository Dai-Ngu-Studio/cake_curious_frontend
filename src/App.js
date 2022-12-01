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
import ProtectedRoute from "./utils/ProtectedRoute";
import StoreTables from "./views/admin/StoreTables";
import AccountTables from "./views/admin/AccountTables";
import StaffDashboard from "./views/staff/StaffDashboard";
import ReportRecipeTables from "./views/staff/ReportRecipeTables";
import ReportCommentTables from "./views/staff/ReportCommentTables";
import Staff from "./layouts/Staff";
import StoreDashboard from "./views/store/StoreDashboard";
import ProductTables from "./views/store/ProductTables";
import Store from "./layouts/Store";
import Error from "./views/Error";
import OrderTables from "./views/store/OrderTables";
import { ProductForm } from "./views/store/ProductForm";
import StoreDetail from "./views/store/StoreDetail";
import OrderForm from "./views/store/OrderForm";
import AdminRecipeReportForm from "./views/admin/AdminRecipeReportForm";
import StaffReportForm from "./views/staff/StaffReportForm";
import Chat from "./views/store/Chat";
import Register from "./views/auth/Register";
import CouponTables from "./views/store/CouponTables";
import { CouponForm } from "./views/store/CouponForm";
import AdminCommentReportForm from "./views/admin/AdminCommentReportForm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/"
          element={
            <ProtectedRoute role={0}>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="store-tables" element={<StoreTables />} />
          <Route path="account-tables" element={<AccountTables />} />
          <Route
            path="report-tables-comment"
            element={<ReportCommentTables />}
          />
          <Route path="report-tables-recipe" element={<ReportRecipeTables />} />
          <Route
            path="report-recipe/:recipeId"
            element={<AdminRecipeReportForm />}
          />
          <Route
            path="report-comment/:commentId"
            element={<AdminCommentReportForm />}
          />
        </Route>
        <Route
          path="/staff/"
          element={
            <ProtectedRoute role={1}>
              <Staff />
            </ProtectedRoute>
          }
        >
          <Route index element={<StaffDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="staff-dashboard" element={<StaffDashboard />} />
          <Route path="report-tables" element={<ReportRecipeTables />} />
          <Route path="report-form" element={<StaffReportForm />} />
        </Route>
        <Route
          path="/store/"
          element={
            <ProtectedRoute role={2}>
              <Store />
            </ProtectedRoute>
          }
        >
          <Route index element={<StoreDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="store-dashboard" element={<StoreDashboard />} />
          <Route path="store-detail" element={<StoreDetail />} />
          <Route path="product-tables" element={<ProductTables />} />
          <Route path="coupon-tables" element={<CouponTables />} />
          <Route path="coupon-form" element={<CouponForm />} />
          <Route path="coupon-form/:editCouponId" element={<CouponForm />} />
          <Route path="order-tables" element={<OrderTables />} />
          <Route path="product-tables" element={<ProductTables />} />
          <Route path="product-form/:editProductId" element={<ProductForm />} />
          <Route path="product-form" element={<ProductForm />} />
          <Route path="order-form" element={<OrderForm />} />
          <Route path="order-form/:editOrderId" element={<OrderForm />} />
          <Route path="chat" element={<Chat />} />
          <Route path="chat/:userChatId" element={<Chat />} />
        </Route>

        <Route path="/auth/" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route index element={<Landing />} />
        <Route path="/unauthorized" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
