export interface CardData {
  deckID: string;
  front: string;
  back: string;
  image?: File | null;
  sound?: File | null;
  tag?: "New" | "Learning" | "Relearning" | "Young" | "Mature";
  interval?: number;
}

// function to create a new card
export async function createCard(cardData: CardData, accessToken: string) {
  const formData = new FormData();

  // append all fields
  formData.append("deckID", cardData.deckID);
  formData.append("front", cardData.front);
  formData.append("back", cardData.back);

  // image file
  if (cardData.image) {
    formData.append("image", cardData.image);
  }

  // sound file
  if (cardData.sound) {
    formData.append("sound", cardData.sound);
  }

  // tag
  if (cardData.tag) {
    formData.append("tag", cardData.tag);
  }

  const res = await fetch("http://localhost:5000/api/card", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`, // keep token header
    },
    body: formData, // send as FormData
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

// Function to get a single card by cardID
export async function getCard(cardID: string, accessToken: string) {
  const res = await fetch(`http://localhost:5000/api/card/single/${cardID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch card");
  }

  return data;
}

// function to update a card
export async function updateCard(
  cardID: string,
  updateData: Partial<CardData>,
  accessToken: string
) {
  const formData = new FormData();

  // Only append fields that exist (partial update)
  if (updateData.front !== undefined)
    formData.append("front", updateData.front);
  if (updateData.back !== undefined) formData.append("back", updateData.back);

  // append files only if selected
  if (updateData.image instanceof File) {
    formData.append("image", updateData.image);
  }

  if (updateData.sound instanceof File) {
    formData.append("sound", updateData.sound);
  }

  if (updateData.tag) {
    formData.append("tag", updateData.tag);
  }

  const res = await fetch(`http://localhost:5000/api/card/${cardID}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
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
