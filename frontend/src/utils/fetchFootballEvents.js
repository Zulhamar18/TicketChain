// src/utils/fetchFootballEvents.js
export const fetchFootballEvents = (league) => {
  const dummyData = {
    "Premier League": [
      {
        id: 1,
        teams: "Manchester United vs Liverpool",
        date: "2025-07-10",
        stadium: "Old Trafford",
      },
      {
        id: 2,
        teams: "Arsenal vs Chelsea",
        date: "2025-07-12",
        stadium: "Emirates Stadium",
      },
    ],
    "La Liga": [
      {
        id: 3,
        teams: "Real Madrid vs Barcelona",
        date: "2025-07-15",
        stadium: "Santiago Bernabéu",
      },
      {
        id: 4,
        teams: "Atletico Madrid vs Sevilla",
        date: "2025-07-18",
        stadium: "Wanda Metropolitano",
      },
    ],
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyData[league] || []);
    }, 500); // Simulasi delay
  });
};