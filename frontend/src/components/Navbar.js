import React from "react";

function Navbar({ username, onLogout }) {
  return (
    <nav
      style={{
        background: "#1f3c56",
        color: "white",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "22px",
        }}
      >
        🏠 Emergency Shelter Monitoring
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <span>
          Welcome, <strong>{username || "User"}</strong>
        </span>

        <button
          onClick={onLogout}
          style={{
            padding: "8px 14px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            background: "white",
            color: "#1f3c56",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;