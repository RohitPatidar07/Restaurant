import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";



function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const menusidebarcollaps = () => {
    setIsSidebarCollapsed(true);
  };
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };
  const location = useLocation();
  const hideLayout = location.pathname === "/" || location.pathname === "/electricalproducts"  || location.pathname === "/contactus" || location.pathname === "/profilepage" || location.pathname === "/productpage" || location.pathname === "/shoppingcart" || location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/aboutus" || location.pathname === "/privacypolicy" || location.pathname === "/terms" || location.pathname === "/refund" || location.pathname.startsWith("/productpage" );

  return (
    <>
      {/* Home Page (No Layout) */}
      {hideLayout ? (
        <Routes> 
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      ) : (
        // Pages with Layout
        <>
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="main-content">
            <Sidebar
              collapsed={isSidebarCollapsed}
              menuItemClick={menusidebarcollaps}
            />
            <div
              className={`right-side-content ${isSidebarCollapsed ? "collapsed" : ""
                }`}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
