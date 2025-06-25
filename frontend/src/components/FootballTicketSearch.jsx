import React, { useEffect, useState } from "react";
import { fetchFootballEvents } from "../utils/fetchFootballEvents";
import "../styles/FootballTicketStyle.css";

const FootballTicketSearch = ({ auth }) => {
  const [events, setEvents] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchFootballEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  // Saat liga dipilih
  useEffect(() => {
    setSelectedMatch(null); // Reset pertandingan saat liga berubah
    if (selectedLeague) {
      setFilteredMatches(events.filter((e) => e.league === selectedLeague));
    } else {
      setFilteredMatches([]);
    }
  }, [selectedLeague, events]);

  const handleBuy = async () => {
    if (!selectedMatch) return;

    try {
      const paymentData = {
        amount: selectedMatch.price,
        memo: `Ticket Purchase: ${selectedMatch.teams}`,
        metadata: { eventId: selectedMatch.id },
      };

      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: (paymentId) => {
          console.log("Ready for approval:", paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("Completed:", paymentId, txid);
        },
        onCancel: (paymentId) => {
          console.warn("Cancelled:", paymentId);
        },
        onError: (error, payment) => {
          console.error("Error:", error);
        },
      });

      console.log("Payment successful:", payment);
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  return (
    <div className="football-ticket-container">
      <h2>🎟️ Buy Football Match Tickets with $PI</h2>

      {/* Step 1: Select League */}
      <label style={{ fontWeight: "bold" }}>Select League:</label>
      <select
        value={selectedLeague}
        onChange={(e) => setSelectedLeague(e.target.value)}
      >
        <option value="">-- Choose a League --</option>
        <option value="Liga Inggris">Premier League</option>
        <option value="Liga Champions">Champions League</option>
        <option value="Serie A Italia">Serie A</option>
        <option value="Liga Arab Saudi">Saudi Pro League</option>
      </select>

      {/* Step 2: Select Match */}
      {filteredMatches.length > 0 && (
        <>
          <label style={{ fontWeight: "bold", marginTop: "1rem", display: "block" }}>
            Select Match:
          </label>
          <select
            value={selectedMatch?.id || ""}
            onChange={(e) => {
              const match = filteredMatches.find((m) => m.id === parseInt(e.target.value));
              setSelectedMatch(match);
            }}
          >
            <option value="">-- Choose a Match --</option>
            {filteredMatches.map((match) => (
              <option key={match.id} value={match.id}>
                {match.teams}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Step 3: Show Ticket Info */}
      {selectedMatch && (
        <div className="ticket-card" style={{ marginTop: "1rem" }}>
          <h3>{selectedMatch.teams}</h3>
          <p><strong>League:</strong> {selectedMatch.league}</p>
          <p><strong>Date:</strong> {selectedMatch.date}</p>
          <p><strong>Location:</strong> {selectedMatch.location}</p>
          <p><strong>Price:</strong> {selectedMatch.price} $PI</p>

          <button
            className="buy-button"
            onClick={handleBuy}
            disabled={!auth}
            style={{ marginTop: "0.5rem" }}
          >
            Buy with $PI
          </button>
        </div>
      )}
    </div>
  );
};

export default FootballTicketSearch;
