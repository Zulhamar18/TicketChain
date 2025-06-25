import React from "react";

const EventSelector = ({ selectedSport, onSelectEvent }) => {
  const eventsBySport = {
    SepakBola: ["SEA Games", "Olimpiade", "Piala Dunia"],
    Basket: ["SEA Games", "Asian Games", "Olimpiade"],
    Voli: ["Proliga", "SEA Games", "Olimpiade"],
  };

  const events = eventsBySport[selectedSport] || [];

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Pilih Event untuk {selectedSport}</h3>
      <ul className="space-y-2">
        {events.map((event, index) => (
          <li key={index}>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={() => onSelectEvent({ name: event })}
            >
              {event}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventSelector;
