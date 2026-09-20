import React from "react";

function ShelterDetails({ shelter, onBack }) {
  if (!shelter) {
    return (
      <div className="page-container">
        <h1>Shelter Details</h1>
        <p>No shelter selected.</p>

        <button onClick={onBack}>
          ← Back
        </button>
      </div>
    );
  }

  const capacity = Number(shelter.capacity || 0);
  const occupied = Number(shelter.occupied || 0);
  const available = Math.max(capacity - occupied, 0);

  const percentage =
    capacity > 0
      ? Math.round((occupied / capacity) * 100)
      : 0;

  return (
    <div className="page-container">

      <button
        onClick={onBack}
        style={{
          padding: "8px 15px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h1>🏠 Shelter Details</h1>

      <div className="profile-card">

        <h2>{shelter.name}</h2>

        <p>
          <strong>📍 Location:</strong>{" "}
          {shelter.location}
        </p>

        <p>
          <strong>🏠 Capacity:</strong>{" "}
          {capacity}
        </p>

        <p>
          <strong>👥 Occupied:</strong>{" "}
          {occupied}
        </p>

        <p>
          <strong>🛏️ Available Beds:</strong>{" "}
          {available}
        </p>

        <p>
          <strong>📊 Occupancy:</strong>{" "}
          {percentage}%
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {shelter.status || "Available"}
        </p>

        <div
          style={{
            marginTop: "20px",
            width: "100%",
            height: "15px",
            background: "#ddd",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min(percentage, 100)}%`,
              height: "100%",
              background: "#4caf50",
            }}
          ></div>
        </div>

      </div>

    </div>
  );
}

export default ShelterDetails;