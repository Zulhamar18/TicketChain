import React, { useState } from 'react';

const FlightSearchForm = ({ onSearch }) => {
  const [origin, setOrigin] = useState('Jakarta (JKTA)');
  const [destination, setDestination] = useState('Singapore (SIN)');
  const [departureDate, setDepartureDate] = useState('2025-06-26');
  const [returnTrip, setReturnTrip] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('Economy');
  const [flightType, setFlightType] = useState('International');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      origin,
      destination,
      departureDate,
      returnTrip,
      passengers,
      flightClass,
      flightType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flight-search-form">
      <h2>Search Flight Tickets</h2>

      <label>
        From:
        <input value={origin} onChange={(e) => setOrigin(e.target.value)} />
      </label>

      <label>
        To:
        <input value={destination} onChange={(e) => setDestination(e.target.value)} />
      </label>

      <label>
        Departure Date:
        <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
      </label>

      <label>
        Round Trip?
        <input type="checkbox" checked={returnTrip} onChange={(e) => setReturnTrip(e.target.checked)} />
      </label>

      <label>
        Passengers:
        <input
          type="number"
          min="1"
          value={passengers}
          onChange={(e) => setPassengers(parseInt(e.target.value))}
        />
      </label>

      <label>
        Flight Class:
        <select value={flightClass} onChange={(e) => setFlightClass(e.target.value)}>
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First">First</option>
        </select>
      </label>

      <label>
        Flight Type:
        <select value={flightType} onChange={(e) => setFlightType(e.target.value)}>
          <option value="Domestic">Domestic</option>
          <option value="International">International</option>
        </select>
      </label>

      <button type="submit">Search</button>
    </form>
  );
};

export default FlightSearchForm;
