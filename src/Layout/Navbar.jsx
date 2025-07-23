import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = ({ toggleSidebar }) => {
  // Live clock
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="navbar sticky-top position-sticky  px-4 py-2 d-flex justify-content-between align-items-center shadow-sm">
        {/* Left: Logo & Title */}
        <div className="d-flex align-items-center">
          <Link to="/" className="navbar-brand d-flex flex-column">
            <span className="fw-bold text-warning" style={{ fontSize: '1.5rem' }}>logo</span>
            
          </Link>
          <button
            className="btn btn-outline-light d-lg-none ms-3"
            onClick={toggleSidebar}
          >
            <i className="bi bi-list fs-4"></i>
          </button>
        </div>

        {/* Right: Time & Icon */}
        <div className="d-flex align-items-center gap-4">
          <div className="text-end text-light">
            <div className="small">Current Time</div>
            <div className="fw-bold">{currentTime}</div>
          </div>

          <div className="dropdown">
            <button
              className="btn d-flex align-items-center gap-2 p-0 border-0 bg-transparent text-light"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-bell fs-4 text-warning   rounded-circle p-1 px-2"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm mt-2">
              <li>
                <Link to="#" className="dropdown-item">
                  My Profile
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
              <Link to="/login">
                <button className="dropdown-item">
                  Logout
                </button>
              </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
