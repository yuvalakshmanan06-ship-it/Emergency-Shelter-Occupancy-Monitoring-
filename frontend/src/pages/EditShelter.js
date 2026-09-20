import React, { useState } from "react";

function EditShelter({ shelter, onShelterUpdated }) {
  const [name, setName] = useState(shelter?.name || "");
  const [location, setLocation] = useState(
    shelter?.location || ""
  );
  const [capacity, setCapacity] = useState(
    shelter?.capacity || ""
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || !capacity) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/shelters/${shelter.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            location: location,
            capacity: Number(capacity),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setMessage("Shelter updated successfully!");

        if (onShelterUpdated) {
          onShelterUpdated();
        }
      } else {
        setMessage(
          data.message || "Unable to update shelter."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to Flask backend.");
    }
  };

  if (!shelter) {
    return (
      <div className="page-container">
        <h1>Edit Shelter</h1>
        <p>Please select a shelter to edit.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Edit Shelter</h1>

      <p>Update the shelter information.</p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Shelter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          min="1"
        />

        <button type="submit">
          Update Shelter
        </button>

      </form>

      {message && (
        <p className="message">
          {message}
        </p>
      )}
    </div>
  );
}

export default EditShelter;