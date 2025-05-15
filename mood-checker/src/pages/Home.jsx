import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg"; // Import the logo from the assets folder
import "../css/Home.css"; // Import the CSS for styling

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        {/* Logo Section */}
        <header className="home-header">
          <img src={logo} alt="MindMate Logo" className="home-logo" />
        </header>

        <h1 className="home-title">
          Welcome to <span className="highlight">MindMate</span>
        </h1>
        <p className="home-subtitle">
          Your trusted AI companion for emotional wellbeing. Check your mood,
          gain insights, and receive personalized mental health support.
        </p>
        <Link to="/mood" className="primary-button">
          Check Your Mood →
        </Link>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Mood Tracking</h3>
            <p>Monitor your emotional patterns over time</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>AI Insights</h3>
            <p>Personalized recommendations based on your input</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Privacy Focused</h3>
            <p>Your data stays secure and confidential</p>
          </div>
        </div>
      </div>
    </div>
  );
}
