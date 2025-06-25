import React from "react";

const TicketList = ({ tickets }) => {
  return (
    <div className="ticket-list">
      {tickets.length === 0 ? (
        <p>Tidak ada tiket ditemukan.</p>
      ) : (
        tickets.map((ticket, index) => (
          <div key={index} className="ticket-card">
            <h3>{ticket.destination}</h3>
            <p>Harga: {ticket.price} BNB</p>
            <p>Maskapai: {ticket.airline}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TicketList;
