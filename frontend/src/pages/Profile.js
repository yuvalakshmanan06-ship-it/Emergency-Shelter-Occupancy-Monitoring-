import React from "react";

function Profile({ username }) {
  const currentUsername = username || "User";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f8fb",
        padding: "30px 15px 50px"
      }}
    >

      {/* HERO SECTION */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 30px",
          padding: "35px",
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, #eeeaff, #ffffff)",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "30px",
          flexWrap: "wrap"
        }}
      >

        {/* LEFT SIDE */}
        <div
          style={{
            flex: "1 1 500px"
          }}
        >

          <div
            style={{
              fontSize: "65px",
              marginBottom: "10px"
            }}
          >
            👤
          </div>

          <h1
            style={{
              margin: "0 0 12px",
              color: "#163b63",
              fontSize: "40px"
            }}
          >
            My Profile
          </h1>

          <p
            style={{
              fontSize: "19px",
              color: "#52708d",
              lineHeight: "1.6"
            }}
          >
            View your account information and
            emergency shelter monitoring details.
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "20px"
            }}
          >

            <div
              style={{
                padding: "10px 15px",
                background: "#e5f3ff",
                borderRadius: "10px",
                color: "#15558a",
                fontWeight: "bold"
              }}
            >
              👤 User Account
            </div>

            <div
              style={{
                padding: "10px 15px",
                background: "#e7f8ed",
                borderRadius: "10px",
                color: "#19734a",
                fontWeight: "bold"
              }}
            >
              🟢 Active
            </div>

          </div>

        </div>

        {/* CODE-ONLY PROFILE ILLUSTRATION */}
        <div
          style={{
            flex: "1 1 350px",
            height: "280px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "20px",
            background:
              "linear-gradient(180deg, #dff3ff 0%, #f5fbff 60%, #e8edf2 100%)"
          }}
        >

          {/* CLOUD */}
          <div
            style={{
              position: "absolute",
              top: "25px",
              left: "25px",
              fontSize: "45px"
            }}
          >
            ☁️
          </div>

          {/* CLOUD */}
          <div
            style={{
              position: "absolute",
              top: "45px",
              right: "25px",
              fontSize: "40px"
            }}
          >
            ☁️
          </div>

          {/* USER CIRCLE */}
          <div
            style={{
              position: "absolute",
              top: "45px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#d9ecff",
              border: "5px solid #4b83b5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "65px"
            }}
          >
            👤
          </div>

          {/* PROFILE CARD */}
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "220px",
              padding: "12px",
              background: "white",
              borderRadius: "12px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.15)",
              textAlign: "center"
            }}
          >

            <strong
              style={{
                color: "#1f3c56"
              }}
            >
              {currentUsername}
            </strong>

            <div
              style={{
                fontSize: "13px",
                color: "#66788a",
                marginTop: "5px"
              }}
            >
              Emergency Shelter User
            </div>

            <div
              style={{
                marginTop: "8px",
                color: "#198754",
                fontSize: "13px",
                fontWeight: "bold"
              }}
            >
              ● Account Active
            </div>

          </div>

        </div>

      </div>

      {/* PROFILE INFORMATION */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)"
        }}
      >

        <h2
          style={{
            color: "#1f3c56",
            marginBottom: "25px"
          }}
        >
          👤 Account Information
        </h2>

        {/* USERNAME */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px",
            marginBottom: "12px",
            background: "#f7faff",
            borderRadius: "10px",
            border: "1px solid #e0e8f0",
            gap: "15px",
            flexWrap: "wrap"
          }}
        >
          <div>
            <strong>Username</strong>
            <p
              style={{
                margin: "5px 0 0",
                color: "#607080"
              }}
            >
              Your registered username
            </p>
          </div>

          <strong
            style={{
              color: "#1f3c56"
            }}
          >
            {currentUsername}
          </strong>
        </div>

        {/* ROLE */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px",
            marginBottom: "12px",
            background: "#f7faff",
            borderRadius: "10px",
            border: "1px solid #e0e8f0",
            gap: "15px",
            flexWrap: "wrap"
          }}
        >
          <div>
            <strong>Role</strong>
            <p
              style={{
                margin: "5px 0 0",
                color: "#607080"
              }}
            >
              Your account role
            </p>
          </div>

          <span
            style={{
              background: "#e5f3ff",
              color: "#15558a",
              padding: "7px 15px",
              borderRadius: "20px",
              fontWeight: "bold"
            }}
          >
            User
          </span>
        </div>

        {/* STATUS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px",
            background: "#f7faff",
            borderRadius: "10px",
            border: "1px solid #e0e8f0",
            gap: "15px",
            flexWrap: "wrap"
          }}
        >
          <div>
            <strong>Account Status</strong>
            <p
              style={{
                margin: "5px 0 0",
                color: "#607080"
              }}
            >
              Current account status
            </p>
          </div>

          <span
            style={{
              background: "#e7f8ed",
              color: "#198754",
              padding: "7px 15px",
              borderRadius: "20px",
              fontWeight: "bold"
            }}
          >
            🟢 Active
          </span>
        </div>

      </div>

      {/* PROFILE FEATURES */}
      <div
        style={{
          maxWidth: "800px",
          margin: "25px auto 0",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px"
        }}
      >

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow:
              "0 3px 12px rgba(0,0,0,0.08)"
          }}
        >
          <div style={{ fontSize: "35px" }}>
            🏠
          </div>

          <h3>Shelter Monitoring</h3>

          <p
            style={{
              color: "#607080"
            }}
          >
            View available shelter information.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow:
              "0 3px 12px rgba(0,0,0,0.08)"
          }}
        >
          <div style={{ fontSize: "35px" }}>
            🔔
          </div>

          <h3>Notifications</h3>

          <p
            style={{
              color: "#607080"
            }}
          >
            Monitor important shelter alerts.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow:
              "0 3px 12px rgba(0,0,0,0.08)"
          }}
        >
          <div style={{ fontSize: "35px" }}>
            🙋
          </div>

          <h3>Volunteer</h3>

          <p
            style={{
              color: "#607080"
            }}
          >
            Help update shelter occupancy.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Profile;