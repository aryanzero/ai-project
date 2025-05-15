import React, { useState } from "react";
import { getMoodSuggestion } from "../openai";
import "../css/Mood.css"

const Mood = () => {
  const [mood, setMood] = useState("");
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckMood = async () => {
    if (!mood) return;

    setLoading(true);
    const suggestion = await getMoodSuggestion(mood);
    setTip(suggestion);
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

        <button
          onClick={handleCheckMood}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Checking..." : "Get Wellness Tip"}
        </button>

        {tip && (
          <div className="result-box">
            <p>{tip}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mood;
