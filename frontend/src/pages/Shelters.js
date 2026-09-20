import React, { useEffect, useState } from "react";

function Shelters({ onShelterDeleted, onShelterUpdated }) {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editCapacity, setEditCapacity] = useState("");

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

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load shelters");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchShelters();
  }, []);

  // EDIT BUTTON
  const startEdit = (shelter) => {
    setEditingId(shelter.id);
    setEditName(shelter.name);
    setEditLocation(shelter.location);
    setEditCapacity(shelter.capacity);
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditLocation("");
    setEditCapacity("");
  };

  // SAVE EDIT
  const saveEdit = (id) => {
    if (!editName || !editLocation || !editCapacity) {
      alert("Please enter all fields");
      return;
    }

    fetch(`http://127.0.0.1:5000/shelters/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editName,
        location: editLocation,
        capacity: Number(editCapacity),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Shelter updated successfully");

          setEditingId(null);

          fetchShelters();

          if (onShelterUpdated) {
            onShelterUpdated();
          }
        } else {
          alert(data.message || "Failed to update shelter");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Unable to update shelter");
      });
  };

  // DELETE
  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete " + name + "?"
    );

    if (!confirmDelete) {
      return;
    }

    fetch(`http://127.0.0.1:5000/shelters/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Shelter deleted successfully");

          setShelters((currentShelters) =>
            currentShelters.filter(
              (shelter) => shelter.id !== id
            )
          );

          if (onShelterDeleted) {
            onShelterDeleted();
          }
        } else {
          alert(data.message || "Failed to delete shelter");
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Unable to delete shelter");
      });
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Shelters</h1>
        <h2>Loading shelters...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Shelters</h1>
        <h2 style={{ color: "red" }}>{error}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shelters</h1>

      {shelters.length === 0 ? (
        <p>No shelters available.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Shelter Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Occupied</th>
              <th>Available</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {shelters.map((shelter) => (
              <tr key={shelter.id}>
                {editingId === shelter.id ? (
                  <>
                    <td>{shelter.id}</td>

                    <td>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) =>
                          setEditName(e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        value={editLocation}
                        onChange={(e) =>
                          setEditLocation(e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        min="1"
                        value={editCapacity}
                        onChange={(e) =>
                          setEditCapacity(e.target.value)
                        }
                      />
                    </td>

                    <td>{shelter.occupied}</td>

                    <td>
                      {Number(editCapacity || 0) -
                        Number(shelter.occupied || 0)}
                    </td>

                    <td>{shelter.status}</td>

                    <td>
                      <button
                        onClick={() =>
                          saveEdit(shelter.id)
                        }
                        style={{
                          marginRight: "5px",
                          backgroundColor: "green",
                          color: "white",
                          border: "none",
                          padding: "7px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelEdit}
                        style={{
                          backgroundColor: "gray",
                          color: "white",
                          border: "none",
                          padding: "7px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{shelter.id}</td>
                    <td>{shelter.name}</td>
                    <td>{shelter.location}</td>
                    <td>{shelter.capacity}</td>
                    <td>{shelter.occupied}</td>
                    <td>{shelter.available}</td>
                    <td>{shelter.status}</td>

                    <td>
                      <button
                        onClick={() => startEdit(shelter)}
                        style={{
                          marginRight: "5px",
                          backgroundColor: "blue",
                          color: "white",
                          border: "none",
                          padding: "7px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            shelter.id,
                            shelter.name
                          )
                        }
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          padding: "7px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Shelters;