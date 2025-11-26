export async function loginUser(email: string, password: string) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
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

export async function signupUser(email: string, password: string) {
  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
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

export async function logoutUser() {
  try {
    const res = await fetch("http://localhost:5000/api/auth/logout", {
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

export async function refreshAccessToken() {
  const res = await fetch("http://localhost:5000/api/auth/token", {
    method: "POST",
    credentials: "include",
  });

  return res.json();
}
