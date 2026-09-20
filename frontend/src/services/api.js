const API_BASE_URL = "http://127.0.0.1:5000";


// Get all shelters
export const getShelters = async () => {
  const response = await fetch(
    `${API_BASE_URL}/shelters`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch shelters");
  }

  return await response.json();
};


// Add a new shelter
export const addShelter = async (
  name,
  location,
  capacity
) => {
  const response = await fetch(
    `${API_BASE_URL}/shelters`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        location,
        capacity,
      }),
    }
  );

  return await response.json();
};


// Edit shelter
export const updateShelter = async (
  shelterId,
  name,
  location,
  capacity
) => {
  const response = await fetch(
    `${API_BASE_URL}/shelters/${shelterId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        location,
        capacity,
      }),
    }
  );

  return await response.json();
};


// Update occupancy
export const updateOccupancy = async (
  shelterId,
  occupied
) => {
  const response = await fetch(
    `${API_BASE_URL}/shelters/${shelterId}/occupancy`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        occupied,
      }),
    }
  );

  return await response.json();
};


// Check Flask server
export const checkServer = async () => {
  const response = await fetch(
    `${API_BASE_URL}/health`
  );

  return await response.json();
};