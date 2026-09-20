import React from "react";

function Footer() {
  return (
    <footer
      style={{
        background: "#1f3c56",
        color: "white",
        textAlign: "center",
        padding: "20px",
        marginTop: "30px",
      }}
    >
      <p style={{ margin: "5px 0" }}>
        © 2026 Emergency Shelter Occupancy Monitoring
      </p>

      <p style={{ margin: "5px 0", fontSize: "14px" }}>
        Helping people find available emergency shelter beds.
      </p>
    </footer>
  );
}

export default Footer;