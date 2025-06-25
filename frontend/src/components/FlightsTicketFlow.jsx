// FlightsTicketFlow.jsx
import React, { useState } from "react";
import axios from "axios";

const FlightsTicketFlow = ({ auth }) => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.api-ninjas.com/v1/airports?country=${departure}`,
        {
          headers: { "X-Api-Key": "YOUR_API_KEY" },
        }
      );
      // Simulasi hasil pencarian
      setSearchResults([
        {
          id: "F001",
          airline: "Binance Air",
          price: 2.5,
          from: departure,
          to: arrival,
        },
        {
          id: "F002",
          airline: "PiFly",
          price: 1.75,
          from: departure,
          to: arrival,
        },
      ]);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (flight) => {
    if (!window.Pi) {
      alert("Harap buka di Pi Browser untuk membayar.");
      return;
    }

    setPaymentStatus("🔄 Memproses pembayaran...");

    try {
      const paymentData = {
        amount: flight.price.toString(),
        memo: `Pembelian tiket ${flight.airline} (${flight.from} ke ${flight.to})`,
        metadata: { flightId: flight.id },
      };

      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: (paymentId) => {
          console.log("Payment ready for server approval:", paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("Ready to complete on server:", paymentId, txid);
        },
        onCancel: (paymentId) => {
          console.log("User cancelled payment:", paymentId);
          setPaymentStatus("❌ Pembayaran dibatalkan.");
        },
        onError: (err) => {
          console.error("Payment error:", err);
          setPaymentStatus("⚠️ Gagal melakukan pembayaran.");
        },
      });

      setPaymentStatus("✅ Pembayaran sukses! Terima kasih.");
      console.log("Payment result:", payment);
    } catch (error) {
      console.error("Error in payment:", error);
      setPaymentStatus("⚠️ Terjadi kesalahan saat membayar.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 font-bold">Cari Tiket Pesawat</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Kota Asal"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Kota Tujuan"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleSearch} className="btn-order">
          🔍 Cari
        </button>
      </div>

      {loading && <div>⏳ Mencari tiket...</div>}

      <div className="mt-6">
        {searchResults.map((flight) => (
          <div
            key={flight.id}
            className="border p-4 mb-4 rounded-lg shadow-sm bg-white"
          >
            <div className="font-semibold">{flight.airline}</div>
            <div>
              {flight.from} → {flight.to}
            </div>
            <div>💰 {flight.price} π</div>
            <button
              onClick={() => handlePayment(flight)}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              🛒 Beli dengan Pi
            </button>
          </div>
        ))}
      </div>

      {paymentStatus && (
        <div className="mt-4 text-blue-700 font-semibold">{paymentStatus}</div>
      )}
    </div>
  );
};

export default FlightsTicketFlow;
