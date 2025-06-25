import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Navbar = () => {
  const [username, setUsername] = useState(null);

  const handlePiLogin = async () => {
    if (!window.Pi) {
      alert("Pi Network belum terpasang di browser.");
      return;
    }

    try {
      const scopes = ["username", "payments"];
      const authResult = await window.Pi.authenticate(scopes, (auth) => {
        console.log("Auth callback:", auth);
      });

      console.log("Auth Result:", authResult);
      setUsername(authResult.user.username);
    } catch (error) {
      console.error("Login gagal:", error);
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <img src="/logo.jpg" alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">TicketChain</h1>
        <ul className="navbar-links">
          <li><Link to="/flights">Flights</Link></li>
          <li><Link to="/trains">Trains</Link></li>
          <li><Link to="/buses">Buses</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        {username ? (
          <span className="navbar-user">👤 {username}</span>
        ) : (
          <button className="navbar-login" onClick={handlePiLogin}>
            Login Pi
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
