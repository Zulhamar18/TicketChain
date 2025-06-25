// src/components/LoginWithPi.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginWithPi = () => {
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Deteksi Pi Browser saat komponen mount
  useEffect(() => {
    if (window?.Pi?.authenticate) {
      setIsPiBrowser(true);
    }
  }, []);

  const handleLogin = async () => {
    if (!window?.Pi) {
      setError('Pi Network not found. Please open in Pi Browser.');
      return;
    }

    setLoading(true);
    try {
      const scopes = ['username', 'payments'];
      const authResult = await window.Pi.authenticate(scopes);

      const token = authResult.accessToken;

      // Panggil endpoint Pi untuk ambil data user
      const response = await axios.get('https://api.minepi.com/v2/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUserData({
        username: response.data.username,
        wallet: response.data.wallet?.address,
      });

      setError('');
    } catch (err) {
      setError('Login gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login with Pi Network</h2>

      {!isPiBrowser && (
        <p style={styles.warning}>Silakan buka di Pi Browser untuk login.</p>
      )}

      {isPiBrowser && (
        <button onClick={handleLogin} style={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Login dengan Pi'}
        </button>
      )}

      {userData && (
        <div style={styles.result}>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Wallet:</strong> {userData.wallet}</p>
        </div>
      )}

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '12px',
    textAlign: 'center',
    fontFamily: 'Arial',
    backgroundColor: '#f9f9f9',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: '#8236F3'
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#8236F3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  warning: {
    color: 'red',
    fontStyle: 'italic',
    marginBottom: '1rem',
  },
  result: {
    marginTop: '1.5rem',
    textAlign: 'left',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 0 4px rgba(0,0,0,0.1)'
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  }
};

export default LoginWithPi;

