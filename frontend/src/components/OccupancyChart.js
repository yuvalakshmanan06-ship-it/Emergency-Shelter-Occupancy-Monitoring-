import React, { useEffect, useState } from "react";

function OccupancyChart({ search = "" }) {
  const [shelters, setShelters] = useState([]);
  const [error, setError] = useState("");

  const fetchShelters = () => {
    fetch("http://127.0.0.1:5000/shelters")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch shelter data");
        }

        return response.json();
      })
      .then((data) => {
        if (
          data.status === "success" &&
          Array.isArray(data.shelters)
        ) {
          setShelters(data.shelters);
          setError("");
        } else {
          setShelters([]);
          setError("Invalid shelter data");
        }
      })
      .catch((err) => {
        console.error(err);
        setShelters([]);
        setError("Failed to fetch shelter data");
      });
  };

  useEffect(() => {
    fetchShelters();
  }, []);

  const filteredShelters = shelters.filter((shelter) => {
    const name = shelter.name
      ? shelter.name.toLowerCase()
      : "";

    const location = shelter.location
      ? shelter.location.toLowerCase()
      : "";

    const searchText = search
      ? search.toLowerCase()
      : "";

    return (
      name.includes(searchText) ||
      location.includes(searchText)
    );
  });

  const getBarColor = (percentage) => {
    if (percentage >= 80) {
      return "#dc3545";
    }

    if (percentage >= 50) {
      return "#ffc107";
    }

    return "#28a745";
  };

  const getStatus = (percentage) => {
    if (percentage >= 100) {
      return "FULL";
    }

    if (percentage >= 80) {
      return "HIGH OCCUPANCY";
    }

    if (percentage >= 50) {
      return "WARNING";
    }

    if (percentage > 0) {
      return "NORMAL";
    }

    return "EMPTY";
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h2>Occupancy Chart</h2>

      {error && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>
      )}

      {!error && filteredShelters.length === 0 && (
        <p>No shelters found.</p>
      )}

      {filteredShelters.map((shelter) => {
        const capacity = Number(shelter.capacity) || 0;
        const occupied = Number(shelter.occupied) || 0;

        const available = Math.max(
          capacity - occupied,
          0
        );

        const percentage =
          capacity > 0
            ? (occupied / capacity) * 100
            : 0;

        const displayPercentage = Math.min(
          percentage,
          100
        );

        return (
          <div
            key={shelter.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              maxWidth: "600px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{shelter.name}</h3>

            <p>
              <strong>Location:</strong>{" "}
              {shelter.location}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span>
                Occupied: <strong>{occupied}</strong>
              </span>

              <span>
                Available: <strong>{available}</strong>
              </span>

              <span>
                Capacity: <strong>{capacity}</strong>
              </span>
            </div>

            {/* Progress Bar */}
            <div
              style={{
                width: "100%",
                height: "35px",
                backgroundColor: "#e9ecef",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #ccc",
              }}
            >
              <div
                style={{
                  width: `${displayPercentage}%`,
                  height: "100%",
                  backgroundColor: getBarColor(
                    percentage
                  ),
                  transition: "width 0.5s ease",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    lineHeight: "35px",
                  }}
                >
                  {percentage.toFixed(0)}%
                </div>
              </div>
            </div>

            <p>
              <strong>Status:</strong>{" "}
              {getStatus(percentage)}
            </p>

            <p>
              <strong>Database Status:</strong>{" "}
              {shelter.status}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default OccupancyChart;