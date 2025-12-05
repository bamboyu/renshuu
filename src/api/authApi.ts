import { API_URL } from "../config";

// Function to login user
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

// Function to signup user
export async function signupUser(email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    alert("Signup successful! Please login.");
  } catch (err) {
    console.error(err);
    alert("Signup failed. Check console for details.");
  }
}

// Function to logout user
export async function logoutUser() {
  try {
    const res = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Logout failed");
      return;
    }
  } catch (err) {
    console.error(err);
    alert("Logout failed. Check console for details.");
  }
}

// Function to update user account
export async function updateUser(userData: any, accessToken: string) {
  const res = await fetch(`${API_URL}/api/auth/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Update failed");
  }

  return data;
}
