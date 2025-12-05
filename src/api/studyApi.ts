import { API_URL } from "../config";

// Function to get next due card
export async function getNextCard(deckID: string, accessToken: string) {
  const res = await fetch(`${API_URL}/api/study/${deckID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to get next card");

  return res.json();
}

// Function to submit SM-2 rating
export async function reviewCard(
  cardID: string,
  rating: number,
  accessToken: string
) {
  const res = await fetch(`${API_URL}/api/study/review/${cardID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ rating }),
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to review card");

  return res.json();
}
