// src/utils/fetchSportEvents.js
export async function fetchSportEvents(leagueId = "4328") {
  try {
    const res = await fetch(
      `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${leagueId}`
    );
    const data = await res.json();
    return data.events || [];
  } catch (err) {
    console.error("Fetch sport events error:", err);
    return [];
  }
}
