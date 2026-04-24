import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isInAdminPanel = location.pathname.startsWith("/admin");

  useEffect(() => {
    const syncLoginState = () => {
      const isLoggedInFromStorage = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(isLoggedInFromStorage === "true");
    };

    syncLoginState();
    window.addEventListener("storage", syncLoginState);
    return () => window.removeEventListener("storage", syncLoginState);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAuthClick = () => {
    navigate(isLoggedIn ? "/admin" : "/login");
  };

  const handleNavClick = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 200);
      return;
    }

    scrollToSection(sectionId);
  };

  return (
    <header className="header">
      <Link to="/" className="link">
        <span className="header-title">Property.</span>
      </Link>
      <nav className="header-nav">
        <button
          type="button"
          className="head-nav"
          onClick={() => handleNavClick("properties")}
        >
          Properties
        </button>
        <button
          type="button"
          className="head-nav"
          onClick={() => handleNavClick("about")}
        >
          About
        </button>
        <button
          type="button"
          className="head-nav"
          onClick={() => handleNavClick("footer")}
        >
          Contact
        </button>
        {isLoggedIn && isInAdminPanel ? (
          <button className="login-btn logout-btn" onClick={handleLogout}>
            <LogoutIcon fontSize="small" className="login-icon" />
            <span>Logout</span>
          </button>
        ) : isLoggedIn ? (
          <button className="login-btn" onClick={handleAuthClick}>
            <DashboardRoundedIcon fontSize="small" className="login-icon" />
            <span>Dashboard</span>
          </button>
        ) : (
          <button className="login-btn" onClick={handleAuthClick}>
            <LoginIcon fontSize="small" className="login-icon" />
            <span>Login</span>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
