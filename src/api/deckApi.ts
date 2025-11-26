export async function getDecks(accessToken: string) {
  const res = await fetch("http://localhost:5000/api/decks", {
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
