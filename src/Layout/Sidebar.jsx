import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUserGear, 
  faCartShopping, 
  faPrint, 
  faBriefcase, 
  faUser, 
  faChartBar,
  faHome,
  faUsers,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  // Define menu items based on roles
  const adminMenuItems = [
    { name: "Dashboard", path: "/admin/staffmenegement", icon: faHome },
    { name: "Staff Management", path: "/admin/staff", icon: faUserGear },
    { name: "User Management", path: "/admin/users", icon: faUsers },
    { name: "Reports", path: "/admin/reports", icon: faFileAlt },
    { name: "Settings", path: "/admin/settings", icon: faBriefcase },
  ];

  const staffMenuItems = [
    { name: "Dashboard", path: "/staff/tablesmanagement", icon: faHome },
    { name: "Tasks", path: "/staff/tasks", icon: faBriefcase },
    { name: "Reports", path: "/staff/reports", icon: faFileAlt },
  ];

  const userMenuItems = [
    { name: "Dashboard", path: "/user/users", icon: faHome },
    { name: "Profile", path: "/user/profile", icon: faUser },
  ];

  // Get menu items based on role
  const getMenuItems = () => {
    switch(role) {
      case "Admin":
        return adminMenuItems;
      case "Staff":
        return staffMenuItems;
      case "User":
        return userMenuItems;
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar-container shadow-sm ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li 
              key={index} 
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
              data-tooltip={collapsed ? item.name : ""}
            >
              <div
                className="menu-link"
                onClick={() => navigate(item.path)}
              >
                <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                {!collapsed && <span className="menu-text">{item.name}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;