import React, { useState } from 'react';

const MoodSelector = ({ onSelectMood }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { emoji: '🙂', label: 'Happy' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '🙁', label: 'Sad' },
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.label);
    onSelectMood(mood.label);
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold mb-6">How are you feeling today?</h1>
      <div className="flex space-x-8">
        {moods.map((mood) => (
          <button
            key={mood.label}
            className={`text-6xl transition-transform transform hover:scale-125 ${
              selectedMood === mood.label ? 'drop-shadow-lg scale-125' : ''
            }`}
            onClick={() => handleMoodSelect(mood)}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
