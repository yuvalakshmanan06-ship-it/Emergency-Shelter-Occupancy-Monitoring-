import React, { useEffect, useState } from "react";
import "../styles/shelter.css";

function Volunteers({ shelters, onUpdated }) {
  const [selectedId, setSelectedId] = useState("");
  const [occupied, setOccupied] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedShelter = shelters.find(
    (shelter) => String(shelter.id) === String(selectedId)
  );

  useEffect(() => {
    if (selectedShelter) {
      setOccupied(selectedShelter.occupied);
    } else {
      setOccupied("");
    }

    setMessage("");
    setMessageType("");
  }, [selectedId, shelters]);

  const getPercentage = () => {
    if (!selectedShelter || selectedShelter.capacity === 0) {
      return 0;
    }

    return Math.round(
      (Number(occupied || 0) / Number(selectedShelter.capacity)) * 100
    );
  };

  const getStatus = () => {
    const percentage = getPercentage();

    if (percentage >= 100) return "FULL";
    if (percentage >= 80) return "HIGH";
    if (percentage >= 50) return "WARNING";

    return "AVAILABLE";
  };

  const getStatusClass = () => {
    const status = getStatus();

    if (status === "FULL") return "status-full";
    if (status === "HIGH") return "status-high";
    if (status === "WARNING") return "status-warning";

    return "status-available";
  };

  const availableBeds = selectedShelter
    ? Math.max(
        Number(selectedShelter.capacity) - Number(occupied || 0),
        0
      )
    : 0;

  const handleUpdate = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!selectedShelter) {
      setMessage("Please select a shelter.");
      setMessageType("error");
      return;
    }

    if (occupied === "") {
      setMessage("Please enter the occupied bed count.");
      setMessageType("error");
      return;
    }

    const occupiedNumber = Number(occupied);

    if (
      Number.isNaN(occupiedNumber) ||
      occupiedNumber < 0 ||
      occupiedNumber > Number(selectedShelter.capacity)
    ) {
      setMessage(
        `Occupied beds must be between 0 and ${selectedShelter.capacity}.`
      );
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://127.0.0.1:5000/shelters/${selectedShelter.id}/occupancy`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            occupied: occupiedNumber,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setMessage("Occupancy updated successfully!");
        setMessageType("success");

        if (onUpdated) {
          await onUpdated();
        }
      } else {
        setMessage(data.message || "Unable to update occupancy.");
        setMessageType("error");
      }
    } catch (error) {
      console.error(error);

      setMessage("Cannot connect to Flask backend.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="volunteer-page">

      {/* ==================================================
          HERO
          ================================================== */}

      <section className="volunteer-hero">

        <div className="volunteer-hero-content">

          <div className="volunteer-badge">
            🙋 VOLUNTEER OCCUPANCY MANAGEMENT
          </div>

          <h1>
            Update Shelter
            <span>Occupancy</span>
          </h1>

          <p>
            Volunteers can update the number of occupied beds
            and help keep emergency shelter information accurate
            in real time.
          </p>

          <div className="volunteer-feature-row">

            <div className="volunteer-feature">
              <div className="volunteer-feature-icon">🏠</div>
              <div>
                <strong>Select Shelter</strong>
                <span>Choose a location</span>
              </div>
            </div>

            <div className="volunteer-feature">
              <div className="volunteer-feature-icon">🛏️</div>
              <div>
                <strong>Update Beds</strong>
                <span>Enter occupancy</span>
              </div>
            </div>

            <div className="volunteer-feature">
              <div className="volunteer-feature-icon">📊</div>
              <div>
                <strong>Live Status</strong>
                <span>Monitor capacity</span>
              </div>
            </div>

          </div>

        </div>


        {/* ==================================================
            CSS-ONLY ILLUSTRATION
            ================================================== */}

        <div className="volunteer-art">

          <div className="volunteer-sun"></div>

          <div className="volunteer-cloud volunteer-cloud-one"></div>
          <div className="volunteer-cloud volunteer-cloud-two"></div>

          <div className="volunteer-signal volunteer-signal-one"></div>
          <div className="volunteer-signal volunteer-signal-two"></div>
          <div className="volunteer-signal volunteer-signal-three"></div>


          {/* SHELTER */}

          <div className="volunteer-building">

            <div className="volunteer-roof"></div>

            <div className="volunteer-building-body">

              <div className="volunteer-building-sign">
                ✚ EMERGENCY
              </div>

              <div className="volunteer-windows">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="volunteer-door">
                +
              </div>

            </div>

          </div>


          {/* VOLUNTEER PERSON */}

          <div className="volunteer-person">

            <div className="person-head"></div>

            <div className="person-body">
              <span></span>
            </div>

            <div className="person-arm person-arm-left"></div>
            <div className="person-arm person-arm-right"></div>

            <div className="person-leg person-leg-left"></div>
            <div className="person-leg person-leg-right"></div>

          </div>


          {/* CLIPBOARD */}

          <div className="volunteer-clipboard">

            <div className="clipboard-top"></div>

            <div className="clipboard-line"></div>
            <div className="clipboard-line"></div>
            <div className="clipboard-line short"></div>

            <div className="clipboard-check">
              ✓
            </div>

          </div>


          {/* GROUND */}

          <div className="volunteer-ground"></div>


          {/* FLOATING CARD */}

          <div className="volunteer-floating-card">

            <div className="volunteer-floating-icon">
              📡
            </div>

            <div>
              <strong>LIVE UPDATE</strong>
              <span>Occupancy monitoring</span>
            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          UPDATE SECTION
          ================================================== */}

      <section className="volunteer-update-section">

        <div className="volunteer-update-card">

          <div className="volunteer-card-heading">

            <div className="volunteer-card-icon">
              📊
            </div>

            <div>
              <span>VOLUNTEER PANEL</span>

              <h2>
                Update Shelter Occupancy
              </h2>

              <p>
                Select a shelter and enter the current number
                of occupied beds.
              </p>
            </div>

          </div>


          <form onSubmit={handleUpdate}>

            {/* SHELTER SELECT */}

            <div className="volunteer-field">

              <label htmlFor="volunteer-shelter">
                🏠 Select Shelter
              </label>

              <div className="volunteer-input-wrapper">

                <span className="volunteer-input-icon">
                  🏠
                </span>

                <select
                  id="volunteer-shelter"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                >
                  <option value="">
                    -- Select a shelter --
                  </option>

                  {shelters.map((shelter) => (
                    <option
                      key={shelter.id}
                      value={shelter.id}
                    >
                      {shelter.name} - {shelter.location}
                    </option>
                  ))}
                </select>

              </div>

            </div>


            {/* OCCUPIED */}

            <div className="volunteer-field">

              <label htmlFor="volunteer-occupied">
                🛏️ Occupied Beds
              </label>

              <div className="volunteer-input-wrapper">

                <span className="volunteer-input-icon">
                  🛏️
                </span>

                <input
                  id="volunteer-occupied"
                  type="number"
                  min="0"
                  max={
                    selectedShelter
                      ? selectedShelter.capacity
                      : undefined
                  }
                  value={occupied}
                  disabled={!selectedShelter}
                  placeholder="Enter occupied beds"
                  onChange={(e) =>
                    setOccupied(e.target.value)
                  }
                />

                {selectedShelter && (
                  <span className="volunteer-input-suffix">
                    / {selectedShelter.capacity}
                  </span>
                )}

              </div>

            </div>


            {/* CURRENT STATUS */}

            {selectedShelter && (
              <div className="volunteer-status-panel">

                <div className="volunteer-status-top">

                  <div>
                    <span className="small-label">
                      CURRENT STATUS
                    </span>

                    <h3>
                      {selectedShelter.name}
                    </h3>

                    <p>
                      📍 {selectedShelter.location}
                    </p>
                  </div>

                  <div
                    className={`volunteer-status-badge ${getStatusClass()}`}
                  >
                    {getStatus()}
                  </div>

                </div>


                <div className="volunteer-stat-grid">

                  <div className="volunteer-stat">
                    <span>CAPACITY</span>
                    <strong>
                      {selectedShelter.capacity}
                    </strong>
                  </div>

                  <div className="volunteer-stat">
                    <span>OCCUPIED</span>
                    <strong>
                      {occupied || 0}
                    </strong>
                  </div>

                  <div className="volunteer-stat">
                    <span>AVAILABLE</span>
                    <strong>
                      {availableBeds}
                    </strong>
                  </div>

                  <div className="volunteer-stat">
                    <span>OCCUPANCY</span>
                    <strong>
                      {getPercentage()}%
                    </strong>
                  </div>

                </div>


                {/* PROGRESS */}

                <div className="volunteer-progress-section">

                  <div className="volunteer-progress-label">

                    <span>
                      Occupancy Level
                    </span>

                    <strong>
                      {getPercentage()}%
                    </strong>

                  </div>

                  <div className="volunteer-progress-track">

                    <div
                      className={`volunteer-progress-bar ${getStatusClass()}`}
                      style={{
                        width: `${Math.min(
                          getPercentage(),
                          100
                        )}%`,
                      }}
                    ></div>

                  </div>

                </div>

              </div>
            )}


            {/* INFORMATION */}

            <div className="volunteer-info-box">

              <div className="volunteer-info-icon">
                💡
              </div>

              <div>

                <strong>
                  Volunteer Instructions
                </strong>

                <p>
                  Enter the latest number of occupied beds.
                  The system automatically calculates available
                  beds and occupancy percentage.
                </p>

              </div>

            </div>


            {/* MESSAGE */}

            {message && (
              <div
                className={
                  messageType === "success"
                    ? "volunteer-message volunteer-success"
                    : "volunteer-message volunteer-error"
                }
              >
                {messageType === "success"
                  ? "✅"
                  : "⚠️"}{" "}
                {message}
              </div>
            )}


            {/* BUTTON */}

            <button
              type="submit"
              className="volunteer-update-button"
              disabled={loading || !selectedShelter}
            >
              {loading
                ? "Updating Occupancy..."
                : "📊 Update Occupancy"}
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}

export default Volunteers;