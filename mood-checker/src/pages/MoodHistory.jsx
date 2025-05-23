import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../css/MoodHistory.css";

const moodLevels = {
  happy: { level: 5, emoji: "😄" },
  calm: { level: 4, emoji: "🙂" },
  neutral: { level: 3, emoji: "😐" },
  stressed: { level: 2, emoji: "😟" },
  sad: { level: 1, emoji: "😢" },
};

const defaultMood = { level: 3, emoji: "🤔" };

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { avgLevel, emoji } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="label">{label}</p>
        <p className="intro">
          {emoji} Mood Level: {avgLevel.toFixed(1)}
        </p>
      </div>
    );
  }
  return null;
};

export default function MoodHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartArr, setChartArr] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/mood/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch mood history");

        const data = await res.json();
        setHistory(data);

        const grouped = data.reduce((acc, entry) => {
          const date = new Date(entry.createdAt).toLocaleDateString();

          const moodKey = entry.mood.toLowerCase();
          const moodData = moodLevels[moodKey] || defaultMood;

          if (!acc[date]) acc[date] = { totalLevel: 0, count: 0 };

          acc[date].totalLevel += moodData.level;
          acc[date].count += 1;

          return acc;
        }, {});

        const processedChartArr = Object.entries(grouped)
          .map(([date, { totalLevel, count }]) => {
            const avgLevel = totalLevel / count;

            let closestMood = defaultMood;
            let minDiff = Infinity;
            Object.values(moodLevels).forEach((mood) => {
              const diff = Math.abs(mood.level - avgLevel);
              if (diff < minDiff) {
                minDiff = diff;
                closestMood = mood;
              }
            });

            return { date, avgLevel, emoji: closestMood.emoji };
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setChartArr(processedChartArr);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <p className="loading-text">Loading mood history...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="mood-history-wrapper">
      <div className="card mood-history-list-container">
        <h2 className="page-title">Mood History</h2>
        {history.length === 0 ? (
          <p>No mood entries found.</p>
        ) : (
          <ul className="mood-history-list">
            {history.map((entry) => (
              <li key={entry._id} className="mood-history-item">
                <span className="mood-emoji">
                  {moodLevels[entry.mood.toLowerCase()]?.emoji || "🤔"}
                </span>{" "}
                <strong>{entry.mood}</strong> –{" "}
                {new Date(entry.createdAt).toLocaleString()}
                {entry.note && <p className="mood-note">Note: {entry.note}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card mood-history-chart-container">
        <h2 className="page-title">Mood Trend</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartArr} margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              allowDecimals={false}
              label={{ value: "Mood Level", angle: -90, position: "insideLeft" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="avgLevel"
              stroke="#6b46c1"
              strokeWidth={4}
              dot={{ r: 6, stroke: "#6b46c1", strokeWidth: 2, fill: "white" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
