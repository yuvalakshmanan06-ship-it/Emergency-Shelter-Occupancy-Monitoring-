import React, { useEffect, useState } from "react";

function Occupancy({ onOccupancyUpdated }) {
  const [shelters, setShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState("");
  const [occupied, setOccupied] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchShelters = () => {
    fetch("http://127.0.0.1:5000/shelters")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch shelters");
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
          setError("Invalid shelter data");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch shelters");
      });
  };

  useEffect(() => {
    fetchShelters();
  }, []);

  const handleUpdate = () => {
    setMessage("");
    setError("");

    if (!selectedShelter) {
      setError("Please select a shelter");
      return;
    }

    if (occupied === "") {
      setError("Please enter occupied beds");
      return;
    }

    const selected = shelters.find(
      (shelter) =>
        shelter.id === Number(selectedShelter)
    );

    if (!selected) {
      setError("Shelter not found");
      return;
    }

    const occupiedNumber = Number(occupied);

    if (occupiedNumber < 0) {
      setError("Occupied beds cannot be negative");
      return;
    }

    if (occupiedNumber > Number(selected.capacity)) {
      setError(
        `Enter a value between 0 and ${selected.capacity}`
      );
      return;
    }

    fetch(
      `http://127.0.0.1:5000/shelters/${selectedShelter}/occupancy`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          occupied: occupiedNumber,
        }),
      }
    )
      .then((response) => {
        return response.json().then((data) => ({
          ok: response.ok,
          data: data,
        }));
      })
      .then(({ ok, data }) => {
        if (!ok || data.status !== "success") {
          setError(
            data.message ||
              "Unable to update occupancy"
          );
          return;
        }

        setMessage(
          data.alert_type
            ? `Occupancy updated successfully. Alert: ${data.alert_type}`
            : "Occupancy updated successfully"
        );

        setOccupied("");

        fetchShelters();

        if (onOccupancyUpdated) {
          onOccupancyUpdated();
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to update occupancy");
      });
  };

  return (
    <div style={{ padding: "30px" }}>

      <h2>Occupancy Monitoring</h2>

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

      {message && (
        <p
          style={{
            color: "green",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      <label>
        <strong>Select Shelter:</strong>
      </label>

      <br />

      <select
        value={selectedShelter}
        onChange={(e) =>
          setSelectedShelter(e.target.value)
        }
        style={{
          padding: "10px",
          marginTop: "10px",
          width: "300px",
        }}
      >
        <option value="">
          -- Select Shelter --
        </option>

        {shelters.map((shelter) => (
          <option
            key={shelter.id}
            value={shelter.id}
          >
            {shelter.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <label>
        <strong>Occupied Beds:</strong>
      </label>

      <br />

      <input
        type="number"
        min="0"
        value={occupied}
        onChange={(e) =>
          setOccupied(e.target.value)
        }
        placeholder="Enter occupied beds"
        style={{
          padding: "10px",
          marginTop: "10px",
          width: "280px",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleUpdate}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Update Occupancy
      </button>


      <hr />


      <h2>Shelter Occupancy</h2>

      {shelters.map((shelter) => {

        const capacity =
          Number(shelter.capacity) || 0;

        const occupiedBeds =
          Number(shelter.occupied) || 0;

        const available =
          Math.max(
            capacity - occupiedBeds,
            0
          );

        return (
          <div
            key={shelter.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "15px",
              width: "400px",
            }}
          >
            <h3>{shelter.name}</h3>

            <p>
              Capacity: {capacity}
            </p>

            <p>
              Occupied: {occupiedBeds}
            </p>

            <p>
              Available: {available}
            </p>

            <p>
              Status: {shelter.status}
            </p>
          </div>
        );
      })}

    </div>
  );
}

export default Occupancy;