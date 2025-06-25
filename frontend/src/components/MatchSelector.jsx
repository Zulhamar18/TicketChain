import React, { useEffect, useState } from "react";
import { fetchFootballEvents } from "../utils/fetchFootballEvents";

const MatchSelector = ({ league, onSelectMatch }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (league) {
      fetchFootballEvents(league).then(setMatches);
    }
  }, [league]);

  return (
    <div>
      <h3>Pilih Pertandingan</h3>
      <select onChange={(e) => onSelectMatch(e.target.value)}>
        <option value="">-- Pilih Pertandingan --</option>
        {matches.map((match) => (
          <option key={match.id} value={match.id}>
            {match.home} vs {match.away}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MatchSelector;
