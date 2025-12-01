export interface CardData {
  deckID: string;
  front: string;
  back: string;
  image?: string;
  sound?: string;
  tag?: "New" | "Learning" | "Relearning" | "Young" | "Mature";
  interval?: number;
}

// function to create a new card
export async function createCard(cardData: CardData, accessToken: string) {
  const res = await fetch("http://localhost:5000/api/card", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(cardData),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create card");
  }

  return data;
}

// function to get cards by deckID
export async function getCards(deckID: string, accessToken: string) {
  const res = await fetch(`http://localhost:5000/api/card/${deckID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch cards");
  }

  return data;
}

// function to update a card
export async function updateCard(
  cardID: string,
  updateData: Partial<CardData>,
  accessToken: string
) {
  const res = await fetch(`http://localhost:5000/api/card/${cardID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(updateData),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update card");
  }

  return data;
}

// function to delete a card
export async function deleteCard(cardID: string, accessToken: string) {
  const res = await fetch(`http://localhost:5000/api/card/${cardID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete card");
  }

  return data;
}

// Get count of cards in one deck
export async function getCardCount(deckID: string, accessToken: string) {
  const res = await fetch(`http://localhost:5000/api/card/count/${deckID}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch card count");
  }

  return data.count;
}
