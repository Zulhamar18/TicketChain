import React from 'react';

const LandingMenu = ({ onSelectCategory }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Choose Your Ticket Category</h2>
      <div style={styles.menuGrid}>
        <button style={styles.button} onClick={() => onSelectCategory('flight')}>✈️ Flights</button>
        <button style={styles.button} onClick={() => onSelectCategory('sport')}>🏟️ Sports Events</button>
        <button style={styles.button} onClick={() => onSelectCategory('football')}>⚽ Football Matches</button>
        <button style={styles.button} onClick={() => onSelectCategory('train')}>🚆 Train Tickets</button>
      </div>
    </div>
  );
};

// styling tetap sama
const styles = {
  container: { textAlign: 'center', marginTop: '40px' },
  title: { fontSize: '1.8rem', marginBottom: '20px', color: '#1e293b' },
  menuGrid: { display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' },
  button: {
    padding: '15px 30px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#2563eb',
    color: '#fff',
    transition: 'background 0.3s',
  },
};

export default LandingMenu;
