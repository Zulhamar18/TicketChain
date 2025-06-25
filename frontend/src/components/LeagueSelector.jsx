import React from "react";

const LeagueSelector = ({ onSelectLeague }) => {
  const leagues = ["Premier League", "La Liga", "Bundesliga"];
  return (
    <div>
      <h3>Pilih Liga</h3>
      <select onChange={(e) => onSelectLeague(e.target.value)}>
        <option value="">-- Pilih Liga --</option>
        {leagues.map((league) => (
          <option key={league} value={league}>
            {league}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeagueSelector;
