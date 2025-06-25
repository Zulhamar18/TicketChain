import React from "react";

const EventPayment = ({ selectedEvent }) => {
  if (!selectedEvent) return <p>Please select an event to proceed to payment.</p>;

  const handlePayment = () => {
    alert(`Payment initiated for event: ${selectedEvent.name}`);
    // Integrasi smart contract payment bisa ditambahkan di sini
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h3 className="text-xl font-bold mb-2">Event Selected:</h3>
      <p><strong>Name:</strong> {selectedEvent.name}</p>
      <p><strong>Date:</strong> {selectedEvent.date}</p>
      <p><strong>Location:</strong> {selectedEvent.location}</p>
      <button
        onClick={handlePayment}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Pay with Crypto
      </button>
    </div>
  );
};

export default EventPayment;
