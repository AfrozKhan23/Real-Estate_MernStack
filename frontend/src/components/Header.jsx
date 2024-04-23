import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="header">
      <Link to="/" className="link">
        <span className="header-title">Property.</span>
      </Link>
      <span className="header-nav">
        <span
          className="head-nav"
          onClick={() => scrollToSection("properties")}
        >
          Properties
        </span>
        <span className="head-nav" onClick={() => scrollToSection("about")}>
          About
        </span>
        <span className="head-nav" onClick={() => scrollToSection("footer")}>
          Contact
        </span>
        {isLoggedIn ? (
          <button className="login-btn" onClick={handleLogout}>
            <span>
              <LogoutIcon fontSize="small" className="login-icon" />
            </span>
            <span>Logout</span>
          </button>
        ) : (
          <Link to="/login" className="link">
            <button className="login-btn">
              <span>
                <LoginIcon fontSize="small" className="login-icon" />
              </span>
              <span>Login</span>
            </button>
          </Link>
        )}
      </span>
    </div>
  );
};

export default Header;
