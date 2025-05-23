import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import moodImg from "../assets/mood-history.jpg"; // Add a relevant mood history image
import recImg from "../assets/recommendations.jpg"; // Add a visual for recommendations
import "../css/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
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

        {/* Interactive Feature Cards */}
        <div className="interactive-grid">
          <div className="interactive-card">
            <img src={moodImg} alt="Mood History" />
            <div className="interactive-info">
              <h3>Visual Mood History</h3>
              <p>Track your emotional journey and discover patterns over time.</p>
              <Link to="/history" className="secondary-button">
                View History →
              </Link>
            </div>
          </div>

          <div className="interactive-card">
            <img src={recImg} alt="Recommendations" />
            <div className="interactive-info">
              <h3>Smart Recommendations</h3>
              <p>Movies and books matched to your collective mood trends.</p>
              <Link to="/recommendations" className="secondary-button">
                Explore Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
