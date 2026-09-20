const API_BASE_URL = "http://127.0.0.1:5000";


// Login user
export const loginUser = async (
  username,
  password
) => {

  const response = await fetch(
    `${API_BASE_URL}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  return await response.json();
};


// Register user
export const registerUser = async (
  name,
  email,
  password,
  role = "user"
) => {

  const response = await fetch(
    `${API_BASE_URL}/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    }
  );

  return await response.json();
};