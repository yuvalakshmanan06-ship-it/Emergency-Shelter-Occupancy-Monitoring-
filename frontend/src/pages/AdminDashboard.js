import React from "react";

function AdminDashboard({ shelters = [] }) {
  const totalShelters = shelters.length;

  const totalCapacity = shelters.reduce(
    (sum, shelter) => sum + Number(shelter.capacity || 0),
    0
  );

  const totalOccupied = shelters.reduce(
    (sum, shelter) => sum + Number(shelter.occupied || 0),
    0
  );

  const totalAvailable = totalCapacity - totalOccupied;

  const overallOccupancy =
    totalCapacity > 0
      ? Math.round((totalOccupied / totalCapacity) * 100)
      : 0;

  const getStatus = (shelter) => {
    const capacity = Number(shelter.capacity || 0);
    const occupied = Number(shelter.occupied || 0);

    if (capacity === 0) return "EMPTY";

    const percentage = (occupied / capacity) * 100;

    if (percentage === 0) return "EMPTY";
    if (percentage >= 100) return "FULL";
    if (percentage >= 80) return "HIGH";
    if (percentage >= 50) return "WARNING";

    return "PARTIALLY OCCUPIED";
  };

  const getStatusColor = (status) => {
    if (status === "FULL") return "#dc3545";
    if (status === "HIGH") return "#e67e22";
    if (status === "WARNING") return "#f0ad4e";
    if (status === "PARTIALLY OCCUPIED") return "#1976d2";
    return "#198754";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f8fb",
        padding: "30px 15px 50px",
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
            "linear-gradient(135deg, #eee8ff, #ffffff)",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >

        {/* LEFT SIDE */}
        <div style={{ flex: "1 1 500px" }}>

          <div
            style={{
              fontSize: "65px",
              marginBottom: "10px",
            }}
          >
            ⚙️
          </div>

          <h1
            style={{
              margin: "0 0 12px",
              color: "#3b286d",
              fontSize: "40px",
            }}
          >
            Admin Dashboard
          </h1>

          <p
            style={{
              fontSize: "19px",
              color: "#665a80",
              lineHeight: "1.6",
            }}
          >
            Manage emergency shelter information,
            monitor occupancy and view the overall
            shelter status.
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >

            <div
              style={{
                padding: "10px 15px",
                background: "#eee8ff",
                borderRadius: "10px",
                color: "#573c9b",
                fontWeight: "bold",
              }}
            >
              ⚙️ Administration
            </div>

            <div
              style={{
                padding: "10px 15px",
                background: "#e5f3ff",
                borderRadius: "10px",
                color: "#15558a",
                fontWeight: "bold",
              }}
            >
              📊 Shelter Monitoring
            </div>

          </div>
        </div>


        {/* CODE-ONLY ADMIN ILLUSTRATION */}
        <div
          style={{
            flex: "1 1 350px",
            height: "280px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "20px",
            background:
              "linear-gradient(180deg, #e8ddff 0%, #f7f4ff 60%, #e9edf5 100%)",
          }}
        >

          {/* CLOUDS */}
          <div
            style={{
              position: "absolute",
              top: "25px",
              left: "25px",
              fontSize: "45px",
            }}
          >
            ☁️
          </div>

          <div
            style={{
              position: "absolute",
              top: "45px",
              right: "25px",
              fontSize: "40px",
            }}
          >
            ☁️
          </div>


          {/* ADMIN PERSON */}
          <div
            style={{
              position: "absolute",
              bottom: "25px",
              left: "55px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "65px",
              }}
            >
              🧑‍💼
            </div>

            <div
              style={{
                background: "#573c9b",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              ADMIN
            </div>
          </div>


          {/* DASHBOARD SCREEN */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "45px",
              width: "180px",
              height: "120px",
              background: "#ffffff",
              border: "5px solid #5d4a91",
              borderRadius: "10px",
              boxShadow:
                "0 5px 10px rgba(0,0,0,0.15)",
            }}
          >

            <div
              style={{
                height: "20px",
                background: "#5d4a91",
                borderRadius: "4px 4px 0 0",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "8px",
                padding: "12px",
              }}
            >

              <div
                style={{
                  width: "40px",
                  height: "30px",
                  background: "#e5f3ff",
                  borderRadius: "5px",
                }}
              />

              <div
                style={{
                  width: "40px",
                  height: "30px",
                  background: "#e8f8f0",
                  borderRadius: "5px",
                }}
              />

              <div
                style={{
                  width: "40px",
                  height: "30px",
                  background: "#fff3cd",
                  borderRadius: "5px",
                }}
              />

            </div>

            <div
              style={{
                margin: "0 12px",
                height: "8px",
                background: "#d8d8d8",
                borderRadius: "5px",
              }}
            />

            <div
              style={{
                margin: "10px 12px",
                height: "8px",
                width: "70%",
                background: "#d8d8d8",
                borderRadius: "5px",
              }}
            />

          </div>

        </div>
      </div>


      {/* SUMMARY CARDS */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 30px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "18px",
        }}
      >

        {/* TOTAL SHELTERS */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "40px" }}>
            🏠
          </div>

          <h3>Total Shelters</h3>

          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#3b286d",
            }}
          >
            {totalShelters}
          </div>
        </div>


        {/* CAPACITY */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "40px" }}>
            🛏️
          </div>

          <h3>Total Capacity</h3>

          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#1976d2",
            }}
          >
            {totalCapacity}
          </div>
        </div>


        {/* OCCUPIED */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "40px" }}>
            👥
          </div>

          <h3>Occupied Beds</h3>

          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#e67e22",
            }}
          >
            {totalOccupied}
          </div>
        </div>


        {/* AVAILABLE */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "40px" }}>
            ✅
          </div>

          <h3>Available Beds</h3>

          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#198754",
            }}
          >
            {totalAvailable}
          </div>
        </div>

      </div>


      {/* OVERALL OCCUPANCY */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 30px",
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >

        <h2
          style={{
            color: "#3b286d",
            marginBottom: "10px",
          }}
        >
          📊 Overall Occupancy
        </h2>

        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "12px",
          }}
        >
          {overallOccupancy}%
        </div>

        <div
          style={{
            width: "100%",
            height: "18px",
            background: "#e9ecef",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${overallOccupancy}%`,
              height: "100%",
              background: "#573c9b",
              borderRadius: "10px",
              transition: "width 0.4s",
            }}
          />
        </div>

      </div>


      {/* SHELTER STATUS */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >

        <h2
          style={{
            color: "#3b286d",
            marginBottom: "25px",
          }}
        >
          🏠 Shelter Status Overview
        </h2>


        {shelters.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#607080",
            }}
          >
            No shelters available.
          </p>
        ) : (
          shelters.map((shelter) => {

            const capacity =
              Number(shelter.capacity || 0);

            const occupied =
              Number(shelter.occupied || 0);

            const available =
              Math.max(capacity - occupied, 0);

            const percentage =
              capacity > 0
                ? Math.round(
                    (occupied / capacity) * 100
                  )
                : 0;

            const status =
              getStatus(shelter);

            return (
              <div
                key={shelter.id}
                style={{
                  border:
                    "1px solid #e1e6eb",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "18px",
                  background: "#fafcff",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    gap: "15px",
                    flexWrap: "wrap",
                  }}
                >

                  <div>

                    <h3
                      style={{
                        margin: "0 0 8px",
                        color: "#1f3c56",
                      }}
                    >
                      {shelter.name}
                    </h3>

                    <p
                      style={{
                        margin: "4px 0",
                        color: "#607080",
                      }}
                    >
                      📍 Location:{" "}
                      {shelter.location}
                    </p>

                    <p
                      style={{
                        margin: "4px 0",
                        color: "#607080",
                      }}
                    >
                      🛏️ Capacity:{" "}
                      {capacity}
                    </p>

                    <p
                      style={{
                        margin: "4px 0",
                        color: "#607080",
                      }}
                    >
                      👥 Occupied:{" "}
                      {occupied}
                    </p>

                    <p
                      style={{
                        margin: "4px 0",
                        color: "#607080",
                      }}
                    >
                      ✅ Available:{" "}
                      {available}
                    </p>

                  </div>


                  {/* STATUS */}
                  <div
                    style={{
                      textAlign: "center",
                      minWidth: "130px",
                    }}
                  >

                    <div
                      style={{
                        display: "inline-block",
                        padding: "8px 12px",
                        borderRadius: "20px",
                        background:
                          getStatusColor(status),
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {status}
                    </div>

                    <div
                      style={{
                        marginTop: "12px",
                        fontSize: "25px",
                        fontWeight: "bold",
                        color:
                          getStatusColor(status),
                      }}
                    >
                      {percentage}%
                    </div>

                  </div>

                </div>


                {/* PROGRESS BAR */}
                <div
                  style={{
                    marginTop: "18px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "12px",
                      background: "#e9ecef",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >

                    <div
                      style={{
                        width: `${percentage}%`,
                        height: "100%",
                        background:
                          getStatusColor(status),
                        borderRadius: "10px",
                      }}
                    />

                  </div>
                </div>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}

export default AdminDashboard;