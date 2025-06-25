// components/SportEventFlow.jsx

import React, { useState } from 'react';
import SportSelector from './SportSelector';
import EventSelector from './EventSelector';
import EventPayment from './EventPayment';

const SportEventFlow = () => {
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
    setSelectedEvent(null);
    setIsPaid(false);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setIsPaid(false);
  };

  const handlePayment = () => {
    // Simulasikan pembayaran berhasil
    setIsPaid(true);
  };

  return (
    <div className="app">
      <h2 className="text-2xl font-bold mb-4">🎖️ Tiket Event Olahraga</h2>

      {!selectedSport && (
        <SportSelector onSelect={handleSportSelect} />
      )}

      {selectedSport && !selectedEvent && (
        <EventSelector sport={selectedSport} onSelect={handleEventSelect} />
      )}

      {selectedEvent && !isPaid && (
        <EventPayment event={selectedEvent} onPay={handlePayment} />
      )}

      {isPaid && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-xl text-green-800 font-semibold">
          ✅ Pembayaran Berhasil! Tiket untuk {selectedEvent.name} telah dikirim ke email Anda.
        </div>
      )}
    </div>
  );
};

export default SportEventFlow;
