import React from "react";

function Notifications({ shelters = [] }) {

  const getPercentage = (shelter) => {
    const capacity = Number(shelter.capacity || 0);
    const occupied = Number(shelter.occupied || 0);

    if (capacity === 0) {
      return 0;
    }

    return Math.round((occupied / capacity) * 100);
  };

  const getAlertLevel = (percentage) => {
    if (percentage >= 100) {
      return "FULL";
    }

    if (percentage >= 80) {
      return "HIGH";
    }

    if (percentage >= 50) {
      return "WARNING";
    }

    return "NORMAL";
  };

  const alertShelters = shelters.filter(
    (shelter) => getPercentage(shelter) >= 50
  );

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
            "linear-gradient(135deg, #fff5e8, #ffffff)",
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
            🔔
          </div>

          <h1
            style={{
              margin: "0 0 12px",
              color: "#163b63",
              fontSize: "40px"
            }}
          >
            Shelter Notifications
          </h1>

          <p
            style={{
              fontSize: "19px",
              color: "#52708d",
              lineHeight: "1.6"
            }}
          >
            Monitor shelter occupancy and receive
            important alerts when shelter capacity
            requires attention.
          </p>

          {/* INFORMATION BOXES */}
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
              🔔 Occupancy Alerts
            </div>

            <div
              style={{
                padding: "10px 15px",
                background: "#fff0f0",
                borderRadius: "10px",
                color: "#b52b27",
                fontWeight: "bold"
              }}
            >
              🚨 Capacity Warnings
            </div>

          </div>

        </div>

        {/* CODE-ONLY NOTIFICATION ILLUSTRATION */}
        <div
          style={{
            flex: "1 1 350px",
            height: "280px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "20px",
            background:
              "linear-gradient(180deg, #dff3ff 0%, #f5fbff 65%, #e9f1f5 100%)"
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

          {/* SECOND CLOUD */}
          <div
            style={{
              position: "absolute",
              top: "55px",
              right: "25px",
              fontSize: "40px"
            }}
          >
            ☁️
          </div>

          {/* BELL */}
          <div
            style={{
              position: "absolute",
              top: "55px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "85px"
            }}
          >
            🔔
          </div>

          {/* NOTIFICATION SYMBOL */}
          <div
            style={{
              position: "absolute",
              top: "45px",
              left: "55%",
              background: "#e53935",
              color: "white",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "18px",
              border: "3px solid white"
            }}
          >
            !
          </div>

          {/* PERSON */}
          <div
            style={{
              position: "absolute",
              bottom: "35px",
              left: "55px",
              fontSize: "55px"
            }}
          >
            🧑‍💼
          </div>

          {/* PHONE */}
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "90px",
              height: "150px",
              background: "#1f3c56",
              borderRadius: "15px",
              border: "5px solid #314f68",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "#eef7ff",
                width: "65px",
                height: "110px",
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "35px"
              }}
            >
              🔔
            </div>
          </div>

          {/* ALERT SYMBOL */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "45px",
              fontSize: "55px"
            }}
          >
            🚨
          </div>

        </div>

      </div>

      {/* NOTIFICATION SUMMARY */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 30px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px"
        }}
      >

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: "35px" }}>
            🏠
          </div>

          <h3>Total Shelters</h3>

          <h2 style={{ color: "#15558a" }}>
            {shelters.length}
          </h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: "35px" }}>
            🚨
          </div>

          <h3>Active Alerts</h3>

          <h2 style={{ color: "#d32f2f" }}>
            {alertShelters.length}
          </h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: "35px" }}>
            ✅
          </div>

          <h3>Normal Shelters</h3>

          <h2 style={{ color: "#198754" }}>
            {shelters.length - alertShelters.length}
          </h2>
        </div>

      </div>

      {/* NOTIFICATIONS */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >

        <div
          style={{
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
            🔔 Current Notifications
          </h2>

          {shelters.length === 0 ? (
            <p>
              No shelter information available.
            </p>
          ) : alertShelters.length === 0 ? (

            <div
              style={{
                padding: "20px",
                background: "#e8f8ee",
                borderRadius: "10px",
                border:
                  "1px solid #b7e4c7"
              }}
            >
              <h3
                style={{
                  color: "#198754"
                }}
              >
                ✅ All Shelters Normal
              </h3>

              <p>
                No occupancy alerts are currently
                active.
              </p>
            </div>

          ) : (

            alertShelters.map((shelter) => {

              const capacity =
                Number(shelter.capacity || 0);

              const occupied =
                Number(shelter.occupied || 0);

              const available = Math.max(
                capacity - occupied,
                0
              );

              const percentage =
                getPercentage(shelter);

              const alertLevel =
                getAlertLevel(percentage);

              let background = "#fff3cd";
              let border = "#ffe69c";
              let icon = "⚠️";

              if (percentage >= 100) {
                background = "#ffe5e5";
                border = "#ffb3b3";
                icon = "🚨";
              } else if (percentage >= 80) {
                background = "#ffe5e5";
                border = "#ffb3b3";
                icon = "🔴";
              }

              return (
                <div
                  key={shelter.id}
                  style={{
                    padding: "20px",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    background: background,
                    border:
                      `1px solid ${border}`
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap"
                    }}
                  >

                    <h3
                      style={{
                        margin: 0,
                        color: "#1f3c56"
                      }}
                    >
                      {icon} {shelter.name}
                    </h3>

                    <strong>
                      {alertLevel}
                    </strong>

                  </div>

                  <p>
                    <strong>
                      📍 Location:
                    </strong>{" "}
                    {shelter.location}
                  </p>

                  <p>
                    <strong>
                      🛏️ Capacity:
                    </strong>{" "}
                    {capacity}
                  </p>

                  <p>
                    <strong>
                      👥 Occupied:
                    </strong>{" "}
                    {occupied}
                  </p>

                  <p>
                    <strong>
                      🟢 Available:
                    </strong>{" "}
                    {available}
                  </p>

                  <p>
                    <strong>
                      📊 Occupancy:
                    </strong>{" "}
                    {percentage}%
                  </p>

                  {/* PROGRESS BAR */}
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
                        width:
                          `${Math.min(
                            percentage,
                            100
                          )}%`,
                        height: "100%",
                        background:
                          percentage >= 80
                            ? "#e53935"
                            : "#ff9800"
                      }}
                    />
                  </div>

                </div>
              );
            })

          )}

        </div>

        {/* ALERT LEVEL GUIDE */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
            marginTop: "25px"
          }}
        >

          <h2
            style={{
              color: "#1f3c56"
            }}
          >
            📊 Alert Level Guide
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "12px",
              marginTop: "15px"
            }}
          >

            <div
              style={{
                padding: "15px",
                background: "#e8f8ee",
                borderRadius: "8px"
              }}
            >
              🟢 <strong>Normal</strong>
              <br />
              Below 50%
            </div>

            <div
              style={{
                padding: "15px",
                background: "#fff3cd",
                borderRadius: "8px"
              }}
            >
              🟡 <strong>Warning</strong>
              <br />
              50% – 79%
            </div>

            <div
              style={{
                padding: "15px",
                background: "#ffe5e5",
                borderRadius: "8px"
              }}
            >
              🔴 <strong>High</strong>
              <br />
              80% – 99%
            </div>

            <div
              style={{
                padding: "15px",
                background: "#f8d7da",
                borderRadius: "8px"
              }}
            >
              🚨 <strong>Full</strong>
              <br />
              100%
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Notifications;