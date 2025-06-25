import React, { useState } from "react";
import LeagueSelector from "./LeagueSelector";
import MatchSelector from "./MatchSelector";
import TicketPayment from "./TicketPayment";

const FootballTicketFlow = () => {
  const [league, setLeague] = useState("");
  const [matchId, setMatchId] = useState("");
  const [ticketPrice, setTicketPrice] = useState(3.14); // Contoh harga tetap

  return (
    <div className="app-header">
      <h2>Beli Tiket Pertandingan Sepak Bola</h2>
      <LeagueSelector onSelectLeague={setLeague} />
      {league && <MatchSelector league={league} onSelectMatch={setMatchId} />}
      {matchId && <TicketPayment matchId={matchId} price={ticketPrice} />}
    </div>
  );
};

export default FootballTicketFlow;
