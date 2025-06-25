import React from "react";

const sports = [
  { id: 1, name: "Olympiade" },
  { id: 2, name: "SEA Games" },
  { id: 3, name: "Asian Games" },
  { id: 4, name: "World Cup" },
  { id: 5, name: "eSports Championship" },
];

const SportSelector = ({ onSelect }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Select Sport Event</h3>
      <ul className="space-y-2">
        {sports.map((sport) => (
          <li
            key={sport.id}
            className="p-3 border rounded hover:bg-green-50 cursor-pointer"
            onClick={() => onSelect(sport)}
          >
            🏅 {sport.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SportSelector;
