import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Login from "./Auth/Login";
import StaffManagement from "./Component/AdminDashboard/StaffManagement/StaffManagement";
import TablesManagement from "./Component/StaffDashboard/TablesManagement/TablesManagement";
import BusinessSettings from "./Component/AdminDashboard/BusinessSettings/BusinessSettings";
import DeviceMonitor from "./Component/AdminDashboard/DeviceMonitor/DeviceMonitor";
import PrinterSetup from "./Component/AdminDashboard/PrinterSetup/PrinterSetup";
import ReportsAnalytics from "./Component/AdminDashboard/ReportsAnalytics/ReportsAnalytics";
import TablePlugSetup from "./Component/AdminDashboard/TablePlugSetup/TablePlugSetup";
import AlertsNotifications from "./Component/StaffDashboard/AlertsNotifications/AlertsNotifications";
import BillingPayment from "./Component/StaffDashboard/BillingPayment/BillingPayment";
import KOTQueue from "./Component/StaffDashboard/KOTQueue/KOTQueue";
import OrdersManagement from "./Component/StaffDashboard/OrdersManagement/OrdersManagement";
import ReservationsManagement from "./Component/StaffDashboard/ReservationsManagement/ReservationsManagement";
import MyReservations from "./Component/UserDashboard/MyReservations/MyReservations";
import MyBilling from "./Component/UserDashboard/MyBilling/MyBilling";
import SessionTracker from "./Component/UserDashboard/SessionTracker/SessionTracker";
import BookTable from "./Component/UserDashboard/BookTable/BookTable";
import SessionHistory from "./Component/UserDashboard/SessionHistory/SessionHistory";


function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const role = localStorage.getItem("role");

  const menusidebarcollaps = () => {
    setIsSidebarCollapsed(true);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const location = useLocation();

  // Pages that don't need layout (auth pages)
  const hideLayout = location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  // Protected route component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <>
      {hideLayout ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Add other auth routes here */}
        </Routes>
      ) : (
        <>
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="main-content">
            <Sidebar
              collapsed={isSidebarCollapsed}
              menuItemClick={menusidebarcollaps}
            />
            <div className={`right-side-content ${isSidebarCollapsed ? "collapsed" : ""}`}>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/*" element={
                  <ProtectedRoute allowedRoles={["Admin"]}>
                    <Routes>
                      <Route path="staffmanagement" element={<StaffManagement />} />
                      <Route path="businesssettings" element={<BusinessSettings />} />
                      <Route path="devicemonitor" element={<DeviceMonitor />} />
                      <Route path="printersetup" element={<PrinterSetup />} />
                      <Route path="reportanalytics" element={<ReportsAnalytics />} />
                      <Route path="tableplugsetup" element={<TablePlugSetup />} />

                      {/* Add more admin routes */}
                    </Routes>
                  </ProtectedRoute>
                } />

                {/* Staff Routes */}
                <Route path="/staff/*" element={
                  <ProtectedRoute allowedRoles={["Staff"]}>
                    <Routes>
                      <Route path="tablesmanagement" element={<TablesManagement />} />
                      <Route path="ordermanagement" element={<OrdersManagement />} />
                      <Route path="kotqueue" element={<KOTQueue />} />
                      <Route path="reservationsmanagement" element={<ReservationsManagement />} />
                      <Route path="billingpayment" element={<BillingPayment />} />
                      <Route path="alertsnotifications" element={<AlertsNotifications />} />

                      {/* Add more staff routes */}
                    </Routes>
                  </ProtectedRoute>
                } />

                {/* User Routes */}
                <Route path="/user/*" element={
                  <ProtectedRoute allowedRoles={["User"]}>
                    <Routes>
                      <Route path="mybilling" element={<MyBilling />} />
                      <Route path="myreservations" element={<MyReservations />} />
                      <Route path="sessiontracker" element={<SessionTracker />} />
                      <Route path="myreservations" element={<MyReservations />} />
                      <Route path="booktable" element={<BookTable />} />
                        <Route path="sessionhistory" element={<SessionHistory />} />


                      {/* Add more user routes */}
                    </Routes>
                  </ProtectedRoute>
                } />

                {/* Redirect to appropriate dashboard based on role */}
                <Route path="/" element={
                  role === "Admin" ? <Navigate to="/admin/dashboard" /> :
                    role === "Staff" ? <Navigate to="/staff/dashboard" /> :
                      role === "User" ? <Navigate to="/user/dashboard" /> :
                        <Navigate to="/login" />
                } />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;