import React, { useState } from "react";
import "../styles/shelter.css";

function AddShelter({ onShelterAdded }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!name.trim() || !location.trim() || !capacity) {
      setMessage("Please fill in all the fields.");
      setMessageType("error");
      return;
    }

    if (Number(capacity) <= 0) {
      setMessage("Capacity must be greater than 0.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/shelters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            location: location.trim(),
            capacity: Number(capacity),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setMessage("Emergency shelter added successfully!");
        setMessageType("success");

        setName("");
        setLocation("");
        setCapacity("");

        if (onShelterAdded) {
          setTimeout(() => {
            onShelterAdded();
          }, 800);
        }
      } else {
        setMessage(data.message || "Unable to add shelter.");
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
    <div className="add-shelter-page">

      {/* HERO SECTION */}
      <section className="add-shelter-hero">

        <div className="add-shelter-hero-content">

          <div className="add-shelter-badge">
            🛡️ EMERGENCY SHELTER MANAGEMENT
          </div>

          <h1>
            Add a New
            <span> Emergency Shelter</span>
          </h1>

          <p>
            Register a new shelter and make its capacity available
            for real-time emergency monitoring.
          </p>

          <div className="add-shelter-features">

            <div className="add-feature">
              <div className="add-feature-icon">🏠</div>
              <div>
                <strong>Shelter</strong>
                <span>Register location</span>
              </div>
            </div>

            <div className="add-feature">
              <div className="add-feature-icon">🛏️</div>
              <div>
                <strong>Capacity</strong>
                <span>Track beds</span>
              </div>
            </div>

            <div className="add-feature">
              <div className="add-feature-icon">📊</div>
              <div>
                <strong>Monitoring</strong>
                <span>Live occupancy</span>
              </div>
            </div>

          </div>

        </div>

        {/* CSS ONLY ILLUSTRATION */}
        <div className="add-shelter-art">

          <div className="art-sun"></div>

          <div className="art-cloud art-cloud-one"></div>
          <div className="art-cloud art-cloud-two"></div>

          <div className="art-signal signal-one"></div>
          <div className="art-signal signal-two"></div>
          <div className="art-signal signal-three"></div>

          <div className="art-building">

            <div className="art-roof"></div>

            <div className="art-building-body">

              <div className="art-building-sign">
                ✚ EMERGENCY
              </div>

              <div className="art-windows">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="art-door">
                <span>+</span>
              </div>

            </div>

          </div>

          <div className="art-tree tree-left">
            <div className="tree-top"></div>
            <div className="tree-trunk"></div>
          </div>

          <div className="art-tree tree-right">
            <div className="tree-top"></div>
            <div className="tree-trunk"></div>
          </div>

          <div className="art-ground"></div>

          <div className="art-floating-card">
            <div className="floating-card-icon">➕</div>
            <div>
              <strong>NEW SHELTER</strong>
              <span>Ready to register</span>
            </div>
          </div>

        </div>

      </section>


      {/* FORM SECTION */}
      <section className="add-shelter-form-section">

        <div className="add-shelter-form-card">

          <div className="form-heading">
            <div className="form-heading-icon">
              🏠
            </div>

            <div>
              <span>SHELTER REGISTRATION</span>
              <h2>Shelter Information</h2>
              <p>
                Enter the details below to add the shelter to the system.
              </p>
            </div>
          </div>


          <form onSubmit={handleSubmit}>

            {/* SHELTER NAME */}
            <div className="form-field">

              <label htmlFor="shelter-name">
                🏠 Shelter Name
              </label>

              <div className="input-wrapper">
                <span className="input-icon">🏠</span>

                <input
                  id="shelter-name"
                  type="text"
                  placeholder="Example: Chennai Emergency Relief Center"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

            </div>


            {/* LOCATION */}
            <div className="form-field">

              <label htmlFor="shelter-location">
                📍 Shelter Location
              </label>

              <div className="input-wrapper">
                <span className="input-icon">📍</span>

                <input
                  id="shelter-location"
                  type="text"
                  placeholder="Example: Chennai"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

            </div>


            {/* CAPACITY */}
            <div className="form-field">

              <label htmlFor="shelter-capacity">
                🛏️ Total Capacity
              </label>

              <div className="input-wrapper">
                <span className="input-icon">🛏️</span>

                <input
                  id="shelter-capacity"
                  type="number"
                  min="1"
                  placeholder="Example: 100"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />

                <span className="input-suffix">BEDS</span>
              </div>

            </div>


            {/* INFORMATION BOX */}
            <div className="capacity-info">

              <div className="capacity-info-icon">
                💡
              </div>

              <div>
                <strong>Capacity Information</strong>

                <p>
                  Enter the maximum number of people who can be
                  accommodated in this emergency shelter.
                </p>
              </div>

            </div>


            {/* MESSAGE */}
            {message && (
              <div
                className={
                  messageType === "success"
                    ? "form-message success-message"
                    : "form-message error-message"
                }
              >
                {messageType === "success" ? "✅" : "⚠️"} {message}
              </div>
            )}


            {/* BUTTON */}
            <button
              type="submit"
              className="add-shelter-submit"
              disabled={loading}
            >
              {loading ? (
                "Adding Shelter..."
              ) : (
                <>
                  ➕ Add Emergency Shelter
                </>
              )}
            </button>

          </form>

        </div>

      </section>

    </div>
  );
}

export default AddShelter;