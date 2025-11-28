const userID = localStorage.getItem("userID") || "";

// Function to get decks from the API
export async function getDecks(accessToken: string) {
  const res = await fetch(`http://localhost:5000/api/deck/${userID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch decks");
  }

  return res.json();
}

// Function to create a new deck
export async function createDeck(accessToken: string, name: string) {
  const res = await fetch("http://localhost:5000/api/deck", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name, userID }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to create deck");
  }

  return res.json();
}
