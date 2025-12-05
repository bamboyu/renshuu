const userID = localStorage.getItem("userID") || "";
import { API_URL } from "../config";

// Function to get decks from the API
export async function getDecks() {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${API_URL}/api/deck`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch decks");
  return res.json();
}

// Function to create a new deck
export async function createDeck(accessToken: string, name: string) {
  const res = await fetch(`${API_URL}/api/deck`, {
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

// Function to update a deck
export async function updateDeck(
  deckID: string,
  name: string,
  accessToken: string
) {
  const res = await fetch(`${API_URL}/api/deck/${deckID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name }),
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to update deck");
  }
  return res.json();
}

// Function to delete a deck
export async function deleteDeck(deckID: string, accessToken: string) {
  const res = await fetch(`${API_URL}/api/deck/${deckID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to delete deck");
  }
  return res.json();
}
