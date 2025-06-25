import React from "react";

const flightClasses = [
  { id: 1, name: "Economy" },
  { id: 2, name: "Business" },
  { id: 3, name: "First Class" },
];

const FlightClassSelector = ({ onSelect }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Select Flight Class</h3>
      <ul className="space-y-2">
        {flightClasses.map((cls) => (
          <li
            key={cls.id}
            className="p-3 border rounded hover:bg-blue-50 cursor-pointer"
            onClick={() => onSelect(cls)}
          >
            ✈️ {cls.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightClassSelector;
