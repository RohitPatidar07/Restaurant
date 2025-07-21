import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import Login from "./Auth/Login";
import AdminDashboard from "./Component/AdminDashboard/AdminDashboard";
import StaffDashboard from "./Component/StaffDashboard/StaffDashboard";
import UserDashboard from "./Component/UserDashboard/UserDashboard";

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
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="staff" element={<StaffManagement />} />
                      <Route path="users" element={<UserManagement />} />
                      {/* Add more admin routes */}
                    </Routes>
                  </ProtectedRoute>
                } />
                
                {/* Staff Routes */}
                <Route path="/staff/*" element={
                  <ProtectedRoute allowedRoles={["Staff"]}>
                    <Routes>
                      <Route path="dashboard" element={<StaffDashboard />} />
                      <Route path="tasks" element={<StaffTasks />} />
                      {/* Add more staff routes */}
                    </Routes>
                  </ProtectedRoute>
                } />
                
                {/* User Routes */}
                <Route path="/user/*" element={
                  <ProtectedRoute allowedRoles={["User"]}>
                    <Routes>
                      <Route path="dashboard" element={<UserDashboard />} />
                      <Route path="profile" element={<UserProfile />} />
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