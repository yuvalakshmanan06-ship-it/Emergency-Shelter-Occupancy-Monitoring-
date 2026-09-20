import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <div
      style={{
        width: "100%",
        marginBottom: "20px"
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search shelter by name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontSize: "15px",
          boxSizing: "border-box"
        }}
      />
    </div>
  );
}

export default SearchBar;