// frontend/src/components/SportEventSearch.jsx
import React, { useEffect, useState } from "react";
import { fetchSportEvents } from "../utils/fetchSportEvents";
import "./EventStyle.css";

const SportEventSearch = () => {
  const [events, setEvents] = useState([]);
  const [leagueId, setLeagueId] = useState("4328"); // Premier League

  useEffect(() => {
    async function loadEvents() {
      const data = await fetchSportEvents(leagueId);
      setEvents(data);
    }
    loadEvents();
  }, [leagueId]);

  return (
    <div className="sport-event-container">
      <h2>Upcoming Sport Events</h2>

      <select
        value={leagueId}
        onChange={(e) => setLeagueId(e.target.value)}
        className="league-select"
      >
        <option value="4328">Premier League</option>
        <option value="4331">La Liga</option>
        <option value="4332">Serie A</option>
        <option value="4334">Bundesliga</option>
        <option value="4335">Championship</option>
      </select>

      <div className="event-list">
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <div key={event.idEvent} className="event-card">
              <h3>{event.strEvent}</h3>
              <p>{event.dateEvent} at {event.strTime}</p>
              <p>{event.strVenue}</p>
              <button className="buy-button">Buy Ticket</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SportEventSearch;
