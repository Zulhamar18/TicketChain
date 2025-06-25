import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [destination, setDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(destination);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Tujuan..."
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button type="submit">Cari Tiket</button>
    </form>
  );
};

export default SearchForm;
