// src/components/FlightSearch.jsx

import { useState, useEffect } from "react";
import { fetchFlightEvents } from "../utils/fetchFlightEvents";

export default function FlightSearch() {
  const [flightType, setFlightType] = useState("domestic");
  const [allFlights, setAllFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedAirline, setSelectedAirline] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    fetchFlightEvents().then((data) => {
      setAllFlights(data);
    });
  }, []);

  useEffect(() => {
    const filtered = allFlights.filter(f => f.type === flightType);
    setFilteredFlights(filtered);
    setSelectedAirline("");
    setSelectedRoute(null);
  }, [flightType, allFlights]);

  const airlines = [...new Set(filteredFlights.map(f => f.airline))];
  const routes = selectedAirline
    ? filteredFlights.filter(f => f.airline === selectedAirline)
    : [];

  return (
    <div className="bg-white shadow p-6 rounded-xl my-6">
      <h2 className="text-xl font-semibold mb-4">✈️ Buy Flight Tickets with $PI</h2>

      {/* 1. Pilih jenis penerbangan */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Type</label>
        <select
          value={flightType}
          onChange={(e) => setFlightType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="domestic">🇮🇩 Domestic</option>
          <option value="international">🌍 International</option>
        </select>
      </div>

      {/* 2. Pilih maskapai */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Airline</label>
        <select
          value={selectedAirline}
          onChange={(e) => setSelectedAirline(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Airline --</option>
          {airlines.map((airline, idx) => (
            <option key={idx} value={airline}>
              {airline}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Pilih rute penerbangan */}
      {selectedAirline && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Flight Route</label>
          <select
            onChange={(e) =>
              setSelectedRoute(routes.find((r) => r.id === parseInt(e.target.value)))
            }
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Route --</option>
            {routes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.route} — {r.date}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 4. Harga dan tombol bayar */}
      {selectedRoute && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-lg font-medium">Price: {selectedRoute.price} $PI</p>
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Pay with $PI
          </button>
        </div>
      )}
    </div>
  );
}
