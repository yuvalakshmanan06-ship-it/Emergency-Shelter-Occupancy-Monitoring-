import React, { useState } from "react";

function Register({ onRegister, onLogin, message }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Send registration details to App.js
    if (onRegister) {
      onRegister(username, email, password);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0b3d91, #1976d2, #64b5f6)",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "white",
          padding: "40px",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "50px" }}>🏠</div>

          <h1 style={{ color: "#173f73", marginBottom: "8px" }}>
            Create Account
          </h1>

          <p style={{ color: "#718096", marginBottom: "30px" }}>
            Emergency Shelter Occupancy Monitoring
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              color: "#173f73",
              marginBottom: "8px",
            }}
          >
            👤 Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "18px",
              border: "1px solid #ccd6e0",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          {/* Email */}
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              color: "#173f73",
              marginBottom: "8px",
            }}
          >
            📧 Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "18px",
              border: "1px solid #ccd6e0",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          {/* Password */}
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              color: "#173f73",
              marginBottom: "8px",
            }}
          >
            🔒 Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "18px",
              border: "1px solid #ccd6e0",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          {/* Confirm Password */}
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              color: "#173f73",
              marginBottom: "8px",
            }}
          >
            🔐 Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              border: "1px solid #ccd6e0",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          {/* Create Account */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            📝 Create Account
          </button>
        </form>

        {message && (
          <p
            style={{
              textAlign: "center",
              color: "red",
              marginTop: "15px",
            }}
          >
            {message}
          </p>
        )}

        {/* Login */}
        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#718096",
          }}
        >
          Already have an account?{" "}

          <button
            type="button"
            onClick={onLogin}
            style={{
              border: "none",
              background: "transparent",
              color: "#1976d2",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;