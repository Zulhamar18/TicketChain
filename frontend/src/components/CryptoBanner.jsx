import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoBanner = () => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price',
          {
            params: {
              ids: 'bitcoin,ethereum,binancecoin',
              vs_currencies: 'usd',
              include_24hr_change: 'true',
            },
          }
        );

        setPrices({
          btc: response.data.bitcoin,
          eth: response.data.ethereum,
          bnb: response.data.binancecoin,
          pi: { usd: 1.42, usd_24h_change: 0 }, // Static fallback
        });
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderPrice = (label, data) => {
    if (!data) return `${label}: Loading...`;
    const change = data.usd_24h_change.toFixed(2);
    const color = change >= 0 ? '#16a34a' : '#dc2626';
    const arrow = change >= 0 ? '📈' : '📉';

    return (
      <div style={styles.priceItem}>
        <span style={{ color }}>
          {arrow} {label}: ${data.usd.toLocaleString()} ({change}%)
        </span>
      </div>
    );
  };

  return (
    <div style={styles.bannerContainer}>
      <div style={styles.bannerInner}>
        <img src="/logo.jpg" alt="TicketChain Logo" style={styles.logo} />
        <div>
          <h1 style={styles.title}>TicketChain</h1>
          <p style={styles.subtitle}>
            Powered by <strong>Crypto</strong> — Book Your Journey with Blockchain
          </p>
        </div>
      </div>
      <div style={styles.priceContainer}>
        {renderPrice('BTC', prices.btc)}
        {renderPrice('ETH', prices.eth)}
        {renderPrice('BNB', prices.bnb)}
        {renderPrice('PI', prices.pi)}
      </div>
    </div>
  );
};

const styles = {
  bannerContainer: {
    backgroundColor: '#0f172a',
    color: '#fff',
    padding: '20px 10px',
    textAlign: 'center',
    borderBottom: '2px solid #22c55e',
  },
  bannerInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  logo: {
    height: '60px',
  },
  title: {
    fontSize: '2rem',
    margin: 0,
    color: '#3b82f6',
  },
  subtitle: {
    marginTop: '4px',
    fontSize: '1rem',
    fontStyle: 'italic',
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap',
    marginTop: '15px',
    fontSize: '1rem',
  },
  priceItem: {
    fontWeight: 'bold',
    minWidth: '120px',
  },
};

export default CryptoBanner;
