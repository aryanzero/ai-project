import { Link } from "react-router-dom";
import '../css/Navbar.css'; // Import the CSS file


export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <img src="src/assets/logo.jpeg" alt="MindMate Logo" className="navbar__logo-img" />
      </Link>
      <div className="navbar__links">
        <Link to="/" className="navbar__link navbar__link--active">
          Home
        </Link>
        <Link to="/mood" className="navbar__link">
          Mood
        </Link>
        {/* Add About / Contact links as needed */}
      </div>
    </nav>
  );
}
