import React from "react";

function TrainTicketFlow({ auth }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🚆 Train Ticket Booking</h2>
      <p>Coming soon: Book train tickets across countries like Japan, China, Korea, and more.</p>
      <p>User: <strong>{auth?.username}</strong></p>
    </div>
  );
}

export default TrainTicketFlow;
