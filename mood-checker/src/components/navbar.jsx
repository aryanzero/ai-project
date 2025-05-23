import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.jpeg";
import "../css/Navbar.css";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const showAuthButtons = ["/login", "/signup"].includes(location.pathname);

  return (
    <nav className="navbar">
      <div className="navbar__top">
        <Link to="/" className="navbar__logo" onClick={() => setIsMenuOpen(false)}>
          <img src={logo} alt="MindMate Logo" className="navbar__logo-img" />
        </Link>
        <button className="navbar__toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      <div className={`navbar__links ${isMenuOpen ? "open" : ""}`}>
        {isAuthenticated ? (
          <>
            <Link to="/" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/mood" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Mood</Link>
            <Link to="/history" className="navbar__link" onClick={() => setIsMenuOpen(false)}>History</Link>
            <button onClick={handleLogout} className="navbar__link logout-btn">Logout</button>
          </>
        ) : (
          showAuthButtons && (
            <>
              <Link to="/login" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Signup</Link>
            </>
          )
        )}
      </div>
    </nav>
  );
}
