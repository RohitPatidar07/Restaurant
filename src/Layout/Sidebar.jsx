import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

const menuItems = [
  { name: "Staff Management", path: "/", icon: "fa-solid fa-user-gear" },
  { name: "Table & Plug Setup", path: "/table-plug-setup", icon: "fa-solid fa-cart-shopping" },
  { name: "Printer Setup", path: "/printer-setup", icon: "fa-solid fa-print" },
  { name: "Business Settings", path: "/business-settings", icon: "fa-solid fa-briefcase" },
  { name: "Reports", path: "/reports", icon: "fa-solid fa-user" },
  { name: "Device Monitor", path: "/device-monitor", icon: "fa-solid fa-chart-bar" },
];


  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
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
                <i className={item.icon}></i>
                <span className="menu-text">{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
