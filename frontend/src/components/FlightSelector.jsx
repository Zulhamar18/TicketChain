import React from "react";

const flights = [
  { id: 1, from: "Jakarta", to: "Singapore", price: 120 },
  { id: 2, from: "Bali", to: "Kuala Lumpur", price: 90 },
  { id: 3, from: "Surabaya", to: "Bangkok", price: 140 },
];

const FlightSelector = ({ onSelect }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Select a Flight</h3>
      <ul className="space-y-2">
        {flights.map((flight) => (
          <li
            key={flight.id}
            className="p-3 border rounded hover:bg-blue-50 cursor-pointer"
            onClick={() => onSelect(flight)}
          >
            ✈️ {flight.from} → {flight.to} – ${flight.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightSelector;
