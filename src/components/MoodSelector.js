import React from 'react';

const MOODS = [
  { name: "Feliz", emoji: "😊", color: "bg-[#fff7e6] text-[#e6b800]" },
  { name: "Triste", emoji: "😢", color: "bg-[#e6eaff] text-[#6d8be6]" },
  { name: "Estresado", emoji: "😫", color: "bg-[#ffe9d6] text-[#e6a86d]" },
  { name: "Cansado", emoji: "😴", color: "bg-[#e6d6ff] text-[#a86de6]" }
];

export default function MoodSelector({ selectedMood, onSelect }) {
  return (
    <div className="flex flex-row gap-6 justify-center mb-4">
      {MOODS.map((mood) => (
        <button
          key={mood.name}
          onClick={() => onSelect(mood.name)}
          className={`w-28 h-28 rounded-2xl shadow-lg flex flex-col items-center justify-center transition-all border-2
            ${selectedMood === mood.name ? 'border-[#6d4ba1] scale-105' : 'border-transparent'} ${mood.color}`}
        >
          <span className="text-4xl mb-2">{mood.emoji}</span>
          <span className="text-lg font-medium text-[#6d4ba1]">{mood.name}</span>
        </button>
      ))}
    </div>
  );
}
