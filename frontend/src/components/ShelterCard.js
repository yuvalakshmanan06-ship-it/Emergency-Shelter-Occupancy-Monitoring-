import React from "react";

function ShelterCard({ shelter, onEdit, onViewDetails }) {
  if (!shelter) {
    return null;
  }

  const capacity = Number(shelter.capacity || 0);
  const occupied = Number(shelter.occupied || 0);

  const available = Math.max(capacity - occupied, 0);

  const percentage =
    capacity > 0
      ? Math.round((occupied / capacity) * 100)
      : 0;

  let status = "EMPTY";

  if (percentage >= 100) {
    status = "FULL";
  } else if (percentage >= 80) {
    status = "HIGH OCCUPANCY";
  } else if (percentage >= 50) {
    status = "WARNING";
  } else if (percentage > 0) {
    status = "PARTIALLY OCCUPIED";
  }

  return (
    <div
      className="profile-card"
      style={{
        marginBottom: "20px"
      }}
    >
      <h2>🏠 {shelter.name}</h2>

      <p>
        <strong>📍 Location:</strong>{" "}
        {shelter.location}
      </p>

      <p>
        <strong>🛏️ Capacity:</strong>{" "}
        {capacity}
      </p>

      <p>
        <strong>👥 Occupied:</strong>{" "}
        {occupied}
      </p>

      <p>
        <strong>🟢 Available Beds:</strong>{" "}
        {available}
      </p>

      <p>
        <strong>📊 Occupancy:</strong>{" "}
        {percentage}%
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {status}
      </p>

      <div
        style={{
          width: "100%",
          height: "12px",
          background: "#ddd",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "15px"
        }}
      >
        <div
          style={{
            width: `${Math.min(percentage, 100)}%`,
            height: "100%",
            background:
              percentage >= 80
                ? "#f44336"
                : percentage >= 50
                ? "#ff9800"
                : "#4caf50",
            transition: "width 0.3s ease"
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap"
        }}
      >
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(shelter)}
            style={{
              padding: "9px 14px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            👁️ View Details
          </button>
        )}

        {onEdit && (
          <button
            onClick={() => onEdit(shelter)}
            style={{
              padding: "9px 14px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            ✏️ Edit Shelter
          </button>
        )}
      </div>
    </div>
  );
}

export default ShelterCard;