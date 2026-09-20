import React, { useEffect, useState } from "react";
import "./App2.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import AddShelter from "./pages/AddShelter";
import EditShelter from "./pages/EditShelter";
import SheltersDetails from "./pages/SheltersDetails";

import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Volunteers from "./pages/Volunteers";

import Occupancy from "./components/Occupancy";

function App2() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // Fetch shelters
  const fetchShelters = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/shelters"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch shelters");
      }

      const data = await response.json();

      if (
        data.status === "success" &&
        Array.isArray(data.shelters)
      ) {
        setShelters(data.shelters);
        setMessage("");
      } else {
        setMessage("Unable to load shelter data.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to Flask shelter API.");
    } finally {
      setLoading(false);
    }
  };

  // Login
  const handleLogin = async (loginUsername, password) => {
    if (!loginUsername || !password) {
      setMessage("Please enter username and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: loginUsername,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setUsername(loginUsername);
        setLoggedIn(true);
        setMessage("");
        setCurrentPage("dashboard");
      } else {
        setMessage(data.message || "Invalid login.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to Flask backend.");
    }
  };

  // Fetch shelters after login
  useEffect(() => {
    if (loggedIn) {
      fetchShelters();
    }
  }, [loggedIn]);

  // Logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setShelters([]);
    setMessage("");
    setCurrentPage("dashboard");
    setSelectedShelter(null);
    setShowRegister(false);
  };

  // Registration completed
  const handleRegistered = () => {
    setShowRegister(false);
    setMessage("Registration successful. Please login.");
  };

  // Back to login
  const handleBackToLogin = () => {
    setShowRegister(false);
    setMessage("");
  };

  // Shelter added
  const handleShelterAdded = () => {
    fetchShelters();
    setCurrentPage("dashboard");
  };

  // Shelter updated
  const handleShelterUpdated = () => {
    fetchShelters();
    setSelectedShelter(null);
    setCurrentPage("dashboard");
  };

  // Edit shelter
  const handleEditShelter = (shelter) => {
    setSelectedShelter(shelter);
    setCurrentPage("edit");
  };

  // View shelter details
  const handleShelterDetails = (shelter) => {
    setSelectedShelter(shelter);
    setCurrentPage("details");
  };

  // Back to dashboard
  const handleBackToDashboard = () => {
    setSelectedShelter(null);
    setCurrentPage("dashboard");
  };

  // Login/Register screen
  if (!loggedIn) {
    if (showRegister) {
      return (
        <Register
          onRegistered={handleRegistered}
          onBackToLogin={handleBackToLogin}
        />
      );
    }

    return (
      <Login
        onLogin={handleLogin}
        message={message}
        onRegister={() => setShowRegister(true)}
      />
    );
  }

  // Main application
  return (
    <div className="dashboard">

      {/* Top Navbar */}
      <Navbar
        username={username}
        onLogout={handleLogout}
      />

      {/* Navigation Buttons */}
      <div className="navigation-buttons">

        <button
          type="button"
          onClick={() => {
            setCurrentPage("dashboard");
            setSelectedShelter(null);
          }}
        >
          🏠 Dashboard
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentPage("add");
            setSelectedShelter(null);
          }}
        >
          ➕ Add Shelter
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentPage("notifications");
            setSelectedShelter(null);
          }}
        >
          🔔 Notifications
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentPage("profile");
            setSelectedShelter(null);
          }}
        >
          👤 Profile
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentPage("volunteer");
            setSelectedShelter(null);
          }}
        >
          🙋 Volunteer
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentPage("admin");
            setSelectedShelter(null);
          }}
        >
          ⚙️ Admin
        </button>

      </div>

      {/* Loading message */}
      {loading && (
        <p
          style={{
            textAlign: "center",
            margin: "15px",
          }}
        >
          Loading shelter data...
        </p>
      )}

      {/* Dashboard */}
      {currentPage === "dashboard" && (
        <Dashboard
          onEditShelter={handleEditShelter}
          onViewDetails={handleShelterDetails}
        />
      )}

      {/* Add Shelter */}
      {currentPage === "add" && (
        <AddShelter
          onShelterAdded={handleShelterAdded}
        />
      )}

      {/* Edit Shelter */}
      {currentPage === "edit" && (
        <EditShelter
          shelter={selectedShelter}
          onShelterUpdated={handleShelterUpdated}
        />
      )}

      {/* Shelter Details */}
      {currentPage === "details" && (
        <SheltersDetails
          shelter={selectedShelter}
          onBack={handleBackToDashboard}
        />
      )}

      {/* Notifications */}
      {currentPage === "notifications" && (
        <Notifications
          shelters={shelters}
        />
      )}

      {/* Profile */}
      {currentPage === "profile" && (
        <Profile
          username={username}
        />
      )}

      {/* Volunteer */}
      {currentPage === "volunteer" && (
        <Volunteers
          shelters={shelters}
          onUpdated={fetchShelters}
        />
      )}

      {/* Admin */}
      {currentPage === "admin" && (
        <AdminDashboard
          shelters={shelters}
        />
      )}

      {/* Occupancy */}
      {currentPage === "occupancy" && (
        <Occupancy
          shelters={shelters}
          onUpdated={fetchShelters}
        />
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App2;