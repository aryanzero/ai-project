import React, { useState } from "react";
import { getMoodSuggestion } from "../openai";
import "../css/Mood.css";

const Mood = () => {
  const [mood, setMood] = useState("");
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // for submission feedback

  const handleCheckMood = async () => {
    if (!mood) return;

    setLoading(true);
    setMessage("");

    try {
      // Get wellness tip from OpenAI
      const suggestion = await getMoodSuggestion(mood);
      setTip(suggestion);

      // Submit mood to backend
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login to save your mood.");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/mood/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mood }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save mood");
      }

      setMessage("Mood saved successfully!");
    } catch (error) {
      setMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="card mood-card">
        <h2 className="page-title">How are you feeling today?</h2>

        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="e.g. happy, stressed, tired..."
          className="input-box"
        />

        <button onClick={handleCheckMood} disabled={loading} className="btn-primary">
          {loading ? "Checking..." : "Get Wellness Tip"}
        </button>

        {tip && (
          <div className="result-box">
            <p>{tip}</p>
          </div>
        )}

        {message && (
          <div className="message-box">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mood;
