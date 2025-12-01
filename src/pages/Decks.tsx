import { useEffect, useState } from "react";
import DeckCard from "../components/Deck/DeckCard";
import { getDecks, createDeck } from "../api/deckApi";
import { getCardCount } from "../api/cardApi";

interface Deck {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const Decks = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cardCounts, setCardCounts] = useState<Record<string, number>>({});
  const accessToken = localStorage.getItem("accessToken") || "";

  // fetch Decks
  useEffect(() => {
    async function fetchDecks() {
      try {
        const token = accessToken;
        if (!token) return;

        const data = await getDecks(token);
        setDecks(data);

        // Fetch card counts for each deck
        const counts: Record<string, number> = {};
        await Promise.all(
          data.map(async (deck: any) => {
            const count = await getCardCount(deck._id, accessToken);
            counts[deck._id] = count;
          })
        );

        setCardCounts(counts);
      } catch (err) {
        console.error("Error fetching decks:", err);
      }
    }

    fetchDecks();
  }, []);

  async function handleCreateDeck() {
    // Logic to create a new deck
    const name = prompt("Enter deck name:");
    if (!name) return;

    try {
      const token = localStorage.getItem("accessToken");
      const userID = localStorage.getItem("userID");

      if (!token || !userID) return;

      const newDeck = await createDeck(token, name);

      // Add the new deck to state
      setDecks((prev) => [...prev, newDeck]);
    } catch (err) {
      console.error("Error creating deck:", err);
      alert("Failed to create deck.");
    }
  }

  // Render Decks
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">Your Decks</h2>
      </div>
      <div className="row">
        {decks.map((deck) => (
          <div key={deck._id} className="mb-2">
            <DeckCard deck={deck} cardCount={cardCounts[deck._id] || 0} />
          </div>
        ))}
      </div>
      {/* Button to create deck */}
      <button onClick={handleCreateDeck} className="btn btn-primary mt-3">
        + Create Deck
      </button>
    </div>
  );
};

export default Decks;
