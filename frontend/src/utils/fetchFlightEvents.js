// src/utils/fetchFlightEvents.js

export const fetchFlightEvents = async () => {
  return [
    {
      id: 1,
      type: "domestic",
      airline: "Garuda Indonesia",
      route: "Jakarta - Bali",
      date: "2025-07-02",
      price: "12",
    },
    {
      id: 2,
      type: "domestic",
      airline: "Lion Air",
      route: "Jakarta - Surabaya",
      date: "2025-07-03",
      price: "9",
    },
    {
      id: 3,
      type: "international",
      airline: "Emirates",
      route: "Jakarta - Dubai",
      date: "2025-07-05",
      price: "25",
    },
    {
      id: 4,
      type: "international",
      airline: "Singapore Airlines",
      route: "Jakarta - Singapore",
      date: "2025-07-06",
      price: "18",
    },
    {
      id: 5,
      type: "international",
      airline: "Qatar Airways",
      route: "Jakarta - Doha",
      date: "2025-07-07",
      price: "30",
    }
  ];
};
