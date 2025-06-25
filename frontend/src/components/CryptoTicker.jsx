// CryptoTicker.jsx
import React, { useEffect, useState } from 'react';

const coins = [
  { id: 'binancecoin', symbol: 'BNB' },
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', symbol: 'ETH' },
  { id: 'pi-network', symbol: 'PI' }, // bisa diganti atau hapus jika tidak tersedia
];

export default function CryptoTicker() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    fetchPrices();

    const interval = setInterval(fetchPrices, 10000); // update tiap 10 detik
    return () => clearInterval(interval);
  }, []);

  const fetchPrices = async () => {
    try {
      const ids = coins.map(c => c.id).join(',');
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      const data = await res.json();
      setPrices(data);
    } catch (err) {
      console.error('Gagal ambil harga crypto:', err);
    }
  };

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      padding: '10px',
      backgroundColor: '#f1f1f1',
      overflowX: 'auto',
      fontWeight: 'bold',
      fontSize: '14px'
    }}>
      {coins.map((coin) => (
        <div key={coin.id}>
          {coin.symbol}: ${prices[coin.id]?.usd || '...'}
        </div>
      ))}
    </div>
  );
}
