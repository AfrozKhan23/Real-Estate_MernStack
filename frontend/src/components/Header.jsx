import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const isInAdminPanel = location.pathname.startsWith("/admin");

  useEffect(() => {
    const isLoggedInFromStorage = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(isLoggedInFromStorage === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="header">
      <Link to="/" className="link">
        <span className="header-title">Property.</span>
      </Link>
      <span className="header-nav">
        <Link to="/" className="link">
          <span
            className="head-nav"
            onClick={() => scrollToSection("properties")}
          >
            Properties
          </span>
        </Link>
        <Link to="/" className="link">
          <span className="head-nav" onClick={() => scrollToSection("about")}>
            About
          </span>
        </Link>
        <span className="head-nav" onClick={() => scrollToSection("footer")}>
          Contact
        </span>
        {isLoggedIn && isInAdminPanel ? (
          <button className="login-btn" onClick={handleLogout}>
            <span>
              <LogoutIcon fontSize="small" className="login-icon" />
            </span>
            <span>Logout</span>
          </button>
        ) : isLoggedIn ? (
          <button className="login-btn" onClick={handleLoginClick}>
            <span>
              <LoginIcon fontSize="small" className="login-icon" />
            </span>
            <span>Dashboard</span>
          </button>
        ) : (
          <button className="login-btn" onClick={handleLoginClick}>
            <span>
              <LoginIcon fontSize="small" className="login-icon" />
            </span>
            <span>Dashboard</span>
          </button>
        )}
      </span>
    </div>
  );
};

export default Header;
