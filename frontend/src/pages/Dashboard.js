import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";

function Dashboard({ onEditShelter, onViewDetails }) {
  const [shelters, setShelters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchShelters = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:5000/shelters");

      if (!response.ok) {
        throw new Error("Failed to fetch shelter data");
      }

      const data = await response.json();

      if (data.status === "success") {
        setShelters(data.shelters);
        setError("");
      } else {
        setError("Unable to load shelter data.");
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to Flask backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShelters();
  }, []);

  const getPercentage = (occupied, capacity) => {
    if (!capacity) return 0;
    return Math.round((occupied / capacity) * 100);
  };

  const getStatus = (percentage) => {
    if (percentage === 100) return "FULL";
    if (percentage >= 80) return "HIGH";
    if (percentage >= 50) return "WARNING";
    return "AVAILABLE";
  };

  const getStatusClass = (percentage) => {
    if (percentage === 100) return "status-full";
    if (percentage >= 80) return "status-high";
    if (percentage >= 50) return "status-warning";
    return "status-available";
  };

  const getProgressClass = (percentage) => {
    if (percentage === 100) return "progress-full";
    if (percentage >= 80) return "progress-high";
    if (percentage >= 50) return "progress-warning";
    return "progress-normal";
  };

  const formatUpdatedTime = (updatedAt) => {
    if (!updatedAt) return "Not available";

    const date = new Date(updatedAt.replace(" ", "T"));

    if (isNaN(date.getTime())) {
      return updatedAt;
    }

    return date.toLocaleString();
  };

  const totalShelters = shelters.length;

  const totalCapacity = shelters.reduce(
    (total, shelter) => total + Number(shelter.capacity || 0),
    0
  );

  const totalOccupied = shelters.reduce(
    (total, shelter) => total + Number(shelter.occupied || 0),
    0
  );

  const totalAvailable = totalCapacity - totalOccupied;

  const overallPercentage =
    totalCapacity > 0
      ? Math.round((totalOccupied / totalCapacity) * 100)
      : 0;

  const filteredShelters = shelters.filter((shelter) => {
    const searchText = search.toLowerCase();

    return (
      shelter.name.toLowerCase().includes(searchText) ||
      shelter.location.toLowerCase().includes(searchText)
    );
  });

  const alertShelters = shelters.filter((shelter) => {
    const percentage = getPercentage(
      shelter.occupied,
      shelter.capacity
    );

    return percentage >= 50;
  });

  if (loading) {
    return (
      <div className="modern-dashboard">
        <div className="dashboard-loading">
          Loading emergency shelter information...
        </div>
      </div>
    );
  }

  return (
    <div className="modern-dashboard">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="dashboard-hero">

        <div className="hero-content">

          <div className="hero-badge">
            🛡️ EMERGENCY MANAGEMENT SYSTEM
          </div>

          <h1>
            Emergency Shelter
            <br />
            <span>Occupancy Monitoring</span>
          </h1>

          <p>
            Monitor shelter capacity, occupancy and availability
            from one centralized dashboard.
          </p>

          <div className="hero-live">
            <span className="live-dot"></span>
            LIVE MONITORING
          </div>

          <div className="hero-subtitle">
            📡 Real-time shelter information
          </div>

        </div>

        {/* CODE-BASED EMERGENCY SHELTER VISUAL */}

        <div className="hero-visual">

          <div className="shelter-illustration">

            <div className="illustration-sky">
              <div className="cloud cloud-one"></div>
              <div className="cloud cloud-two"></div>

              <div className="signal signal-one">◌</div>
              <div className="signal signal-two">◌</div>
              <div className="signal signal-three">◌</div>
            </div>

            <div className="shelter-building">

              <div className="building-roof"></div>

              <div className="building-body">

                <div className="shelter-sign">
                  🛡️
                  <span>SHELTER</span>
                </div>

                <div className="building-windows">
                  <div className="window"></div>
                  <div className="window"></div>
                  <div className="window"></div>
                </div>

                <div className="building-door">
                  <span>+</span>
                </div>

              </div>

            </div>

            <div className="illustration-ground"></div>

            <div className="monitor-card">

              <div className="monitor-icon">
                📊
              </div>

              <div>
                <strong>LIVE DATA</strong>
                <span>{totalShelters} Shelters Connected</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <section className="summary-grid">

        <div className="summary-card">
          <div className="summary-icon shelter-icon">
            🏠
          </div>

          <div>
            <h3>Total Shelters</h3>
            <p className="summary-value">{totalShelters}</p>
            <div className="summary-description">
              Registered shelters
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon capacity-icon">
            🛏️
          </div>

          <div>
            <h3>Total Capacity</h3>
            <p className="summary-value">{totalCapacity}</p>
            <div className="summary-description">
              Total beds
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon occupied-icon">
            👥
          </div>

          <div>
            <h3>Occupied Beds</h3>
            <p className="summary-value">{totalOccupied}</p>
            <div className="summary-description">
              Currently occupied
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon available-icon">
            ✓
          </div>

          <div>
            <h3>Available Beds</h3>
            <p className="summary-value">{totalAvailable}</p>
            <div className="summary-description">
              Currently available
            </div>
          </div>
        </div>

      </section>

      {/* =====================================================
          OVERALL OCCUPANCY
      ===================================================== */}

      <section className="occupancy-panel">

        <div className="section-heading">
          <div>
            <span className="section-label">
              SYSTEM OVERVIEW
            </span>

            <h2>Overall Occupancy</h2>

            <p>
              Current occupancy across all registered shelters
            </p>
          </div>

          <div className="big-percentage">
            {overallPercentage}%
          </div>
        </div>

        <div className="overall-progress">
          <div
            className={`overall-progress-bar ${getProgressClass(
              overallPercentage
            )}`}
            style={{
              width: `${Math.min(overallPercentage, 100)}%`
            }}
          ></div>
        </div>

        <div className="occupancy-info">
          <span>
            <strong>{totalOccupied}</strong> occupied
          </span>

          <span>
            <strong>{totalAvailable}</strong> available
          </span>

          <span>
            <strong>{totalCapacity}</strong> total capacity
          </span>
        </div>

      </section>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <section className="search-section">

        <div className="section-label">
          FIND A SHELTER
        </div>

        <h2>Search Emergency Shelters</h2>

        <p>
          Search by shelter name or location.
        </p>

        <div className="search-wrapper">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search shelter or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </section>

      {/* =====================================================
          SHELTER NETWORK
      ===================================================== */}

      <section className="shelter-network">

        <div className="network-heading">

          <div>
            <div className="section-label">
              SHELTER NETWORK
            </div>

            <h2>Available Shelters</h2>
          </div>

          <div className="shelter-count">
            {filteredShelters.length} shelters
          </div>

        </div>

        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        {filteredShelters.length === 0 ? (
          <div className="no-data">
            No shelters found.
          </div>
        ) : (

          <div className="shelter-grid">

            {filteredShelters.map((shelter) => {

              const percentage = getPercentage(
                shelter.occupied,
                shelter.capacity
              );

              const available =
                Number(shelter.capacity) -
                Number(shelter.occupied);

              const status = getStatus(percentage);

              return (

                <div
                  className="shelter-card"
                  key={shelter.id}
                >

                  <div className="shelter-card-header">

                    <div className="shelter-title-area">

                      <div className="mini-shelter-icon">
                        🏠
                      </div>

                      <div>
                        <span
                          className={`shelter-status ${getStatusClass(
                            percentage
                          )}`}
                        >
                          {status}
                        </span>

                        <h3>{shelter.name}</h3>

                        <p className="shelter-location">
                          📍 {shelter.location}
                        </p>
                      </div>

                    </div>

                  </div>

                  <div className="shelter-percentage">
                    {percentage}% occupancy
                  </div>

                  <div className="shelter-progress">
                    <div
                      className={`shelter-progress-bar ${getProgressClass(
                        percentage
                      )}`}
                      style={{
                        width: `${Math.min(
                          percentage,
                          100
                        )}%`
                      }}
                    ></div>
                  </div>

                  <div className="shelter-capacity-text">
                    {shelter.occupied}/{shelter.capacity}
                  </div>

                  <div className="shelter-stats">

                    <div className="shelter-stat">
                      <span>🛏️</span>
                      <strong>
                        {shelter.capacity}
                      </strong>
                      <small>Capacity</small>
                    </div>

                    <div className="shelter-stat">
                      <span>👥</span>
                      <strong>
                        {shelter.occupied}
                      </strong>
                      <small>Occupied</small>
                    </div>

                    <div className="shelter-stat">
                      <span>✓</span>
                      <strong>
                        {available}
                      </strong>
                      <small>Available</small>
                    </div>

                  </div>

                  <div className="last-updated">
                    🕐 Last checked:
                    {" "}
                    {formatUpdatedTime(
                      shelter.updated_at
                    )}
                  </div>

                  {/* IMPORTANT:
                      BOTH VIEW DETAILS AND EDIT SHELTER
                      BUTTONS ARE HERE
                  */}

                  <div className="shelter-actions">

                    <button
                      className="view-button"
                      onClick={() =>
                        onViewDetails &&
                        onViewDetails(shelter)
                      }
                    >
                      👁️ View Details
                    </button>

                    <button
                      className="edit-button"
                      onClick={() =>
                        onEditShelter &&
                        onEditShelter(shelter)
                      }
                    >
                      ✏️ Edit Shelter
                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </section>

      {/* =====================================================
          ALERTS
      ===================================================== */}

      <section className="alerts-section">

        <div className="section-label">
          MONITORING
        </div>

        <h2>🚨 Shelter Alerts</h2>

        {alertShelters.length === 0 ? (

          <div className="no-alert">
            ✅ All shelters are operating within normal occupancy.
          </div>

        ) : (

          <div className="alerts-grid">

            {alertShelters.map((shelter) => {

              const percentage = getPercentage(
                shelter.occupied,
                shelter.capacity
              );

              return (

                <div
                  className={`alert-card ${getStatusClass(
                    percentage
                  )}`}
                  key={shelter.id}
                >

                  <div className="alert-icon">
                    ⚠️
                  </div>

                  <div>
                    <h3>{shelter.name}</h3>

                    <p>
                      Occupancy is currently{" "}
                      <strong>{percentage}%</strong>
                    </p>

                    <span>
                      {getStatus(percentage)}
                    </span>
                  </div>

                </div>

              );

            })}

          </div>

        )}

      </section>

      {/* =====================================================
          EMERGENCY CONTACTS
      ===================================================== */}

      <section className="contacts-section">

        <div className="section-label">
          EMERGENCY SUPPORT
        </div>

        <h2>Emergency Contacts</h2>

        <p>
          Important emergency numbers
        </p>

        <div className="contacts-grid">

          <div className="contact-card">
            <div className="contact-icon">
              🚑
            </div>
            <div>
              <h3>Ambulance</h3>
              <strong>108</strong>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              👮
            </div>
            <div>
              <h3>Police</h3>
              <strong>100</strong>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              🚒
            </div>
            <div>
              <h3>Fire & Rescue</h3>
              <strong>101</strong>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              🆘
            </div>
            <div>
              <h3>Emergency</h3>
              <strong>112</strong>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;