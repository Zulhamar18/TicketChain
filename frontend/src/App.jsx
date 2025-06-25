import React, { useState } from "react";
import axios from "axios";

// Komponen umum
import Navbar from "./components/Navbar";
import CryptoBanner from "./components/CryptoBanner";
import LandingMenu from "./components/LandingMenu";

// Komponen kategori tiket
import FootballTicketFlow from "./components/FootballTicketFlow";
import SportEventFlow from "./components/SportEventFlow";
import FlightsTicketFlow from "./components/FlightsTicketFlow";
import FlightSearchForm from "./components/FlightSearchForm";
import TrainTicketFlow from "./components/TrainTicketFlow";

import "./index.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [flightSearchData, setFlightSearchData] = useState(null);

  const isPiBrowser = () => {
    const ua = navigator.userAgent || navigator.vendor;
    return ua.includes("PiBrowser");
  };

  const handleLoginWithPi = async () => {
    if (!isPiBrowser()) {
      setLoginError("⚠️ Login hanya bisa dilakukan melalui Pi Browser.");
      return;
    }

    try {
      const scopes = ["username", "payments"];
      const authRes = await window.Pi.authenticate(scopes, (payment) => {
        console.log("Incomplete payment found:", payment);
      });

      const accessToken = authRes.accessToken;
      const response = await axios.get("https://api.minepi.com/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setUserInfo(response.data);
      setLoginError("");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("⚠️ Gagal login dengan Pi. Coba lagi.");
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setFlightSearchData(null);
  };

  const handleFlightSearch = (data) => {
    setFlightSearchData(data);
  };

  const renderCategoryFlow = () => {
    switch (selectedCategory) {
      case "football":
        return <FootballTicketFlow auth={userInfo} />;
      case "sport":
        return <SportEventFlow auth={userInfo} />;
      case "flight":
        return !flightSearchData
          ? <FlightSearchForm onSearch={handleFlightSearch} />
          : <FlightsTicketFlow auth={userInfo} searchData={flightSearchData} />;
      case "train":
        return <TrainTicketFlow auth={userInfo} />;
      default:
        return null;
    }
  };

  return (
    <div className="app font-sans text-gray-800 bg-white min-h-screen flex flex-col">
      {/* Header Section */}
      <Navbar user={userInfo} onLogin={handleLoginWithPi} />
      <CryptoBanner />

      {/* Error Message */}
      {!userInfo && loginError && (
        <div className="text-center text-red-600 font-semibold mt-2">
          {loginError}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        {selectedCategory ? (
          <>
            <button
              onClick={handleBack}
              className="mb-4 px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
            >
              ← Kembali
            </button>
            {renderCategoryFlow()}
          </>
        ) : (
          <LandingMenu onSelectCategory={setSelectedCategory} />
        )}
      </main>

      {/* Optional Footer */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} TicketChain – Powered by Blockchain
      </footer>
    </div>
  );
}

export default App;
