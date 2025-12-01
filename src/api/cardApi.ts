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
export async function createCard(cardData: CardData) {
  const res = await fetch("http://localhost:5000/api/cards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
export async function getCards(deckID: string) {
  const res = await fetch(`http://localhost:5000/api/cards/${deckID}`, {
    method: "GET",
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
  updateData: Partial<CardData>
) {
  const res = await fetch(`http://localhost:5000/api/cards/${cardID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update card");
  }

  return data;
}

// funtion to delete a card
export async function deleteCard(cardID: string) {
  const res = await fetch(`http://localhost:5000/api/cards/${cardID}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete card");
  }

  return data;
}
