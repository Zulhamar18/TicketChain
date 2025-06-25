import React from "react";

const TicketPayment = ({ match }) => {
  if (!match) return null;

  const handlePayment = () => {
    alert(`Pembayaran berhasil untuk pertandingan ${match.teams} pada ${match.date}`);
    // Di sini kamu bisa integrasi dengan metode pembayaran atau smart contract
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-md">
      <h3 className="text-lg font-bold mb-2">Detail Tiket</h3>
      <p><strong>Pertandingan:</strong> {match.teams}</p>
      <p><strong>Tanggal:</strong> {match.date}</p>
      <p><strong>Stadion:</strong> {match.stadium}</p>
      <button
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={handlePayment}
      >
        Bayar Tiket
      </button>
    </div>
  );
};

export default TicketPayment;
