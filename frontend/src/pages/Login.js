import React, { useState } from "react";

function Login({ onLogin, message, onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    onLogin(username, password);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f8fc",
      }}
    >
      {/* ================= LEFT SIDE ================= */}

      <div
        style={{
          width: "50%",
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0b3d91, #1976d2, #64b5f6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          color: "white",
        }}
      >
        {/* Decorative Circle */}

        <div
          style={{
            position: "absolute",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.08)",
            top: "-120px",
            left: "-120px",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.08)",
            bottom: "-100px",
            right: "-80px",
          }}
        />

        <div
          style={{
            textAlign: "center",
            padding: "40px",
            zIndex: 2,
            maxWidth: "550px",
          }}
        >
          <div
            style={{
              fontSize: "130px",
              marginBottom: "15px",
            }}
          >
            🏠
          </div>

          <h1
            style={{
              fontSize: "38px",
              margin: "10px 0",
            }}
          >
            Emergency Shelter
          </h1>

          <h2
            style={{
              fontSize: "23px",
              fontWeight: "normal",
              marginBottom: "25px",
            }}
          >
            Occupancy Monitoring
          </h2>

          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.7",
            }}
          >
            Real-time shelter availability and emergency
            <br />
            response monitoring for safer communities.
          </p>

          <div
            style={{
              marginTop: "30px",
              fontSize: "40px",
            }}
          >
            🛡️ &nbsp; 📍 &nbsp; 🚨
          </div>

          <p
            style={{
              marginTop: "25px",
              fontSize: "14px",
              opacity: 0.9,
            }}
          >
            Safe Shelters • Better Information • Stronger Communities
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}

      <div
        style={{
          width: "50%",
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "430px",
          }}
        >
          {/* Header */}

          <h1
            style={{
              color: "#173f73",
              fontSize: "30px",
              marginBottom: "5px",
            }}
          >
            Welcome Back 👋
          </h1>

          <p
            style={{
              color: "#718096",
              marginBottom: "30px",
            }}
          >
            Login to your Emergency Shelter account
          </p>

          {/* ================= FORM ================= */}

          <form onSubmit={handleSubmit}>

            {/* Username */}

            <label
              style={{
                display: "block",
                color: "#173f73",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              👤 Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                marginBottom: "20px",
                boxSizing: "border-box",
                border: "1px solid #ccd6e0",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />

            {/* Password */}

            <label
              style={{
                display: "block",
                color: "#173f73",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              🔒 Password
            </label>

            <div
              style={{
                position: "relative",
                marginBottom: "15px",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 50px 14px 14px",
                  boxSizing: "border-box",
                  border: "1px solid #ccd6e0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  outline: "none",
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Remember + Forgot */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
                fontSize: "14px",
              }}
            >
              <label
                style={{
                  color: "#607d9b",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    marginRight: "7px",
                  }}
                />

                Remember me
              </label>

              <button
                type="button"
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#1976d2",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={() => {
                  alert("Password recovery feature coming soon.");
                }}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}

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
              🔐 Login
            </button>
          </form>

          {/* Message */}

          {message && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "15px",
              }}
            >
              {message}
            </p>
          )}

          {/* Register */}

          <div
            style={{
              textAlign: "center",
              marginTop: "28px",
              color: "#718096",
            }}
          >
            <span>New user? </span>

            <button
              type="button"
              onClick={onRegister}
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
              Register
            </button>
          </div>

          {/* Security Message */}

          <p
            style={{
              textAlign: "center",
              color: "#9aa9b8",
              fontSize: "12px",
              marginTop: "25px",
            }}
          >
            🔒 Your account information is protected
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;