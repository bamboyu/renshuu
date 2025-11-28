import { useEffect, useState } from "react";
import DeckCard from "../components/Deck/DeckCard";
import { getDecks, createDeck } from "../api/deckApi";
import { refreshAccessToken } from "../api/authApi";

interface Deck {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const Decks = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

  // fetch Decks
  useEffect(() => {
    async function fetchDecks() {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const data = await getDecks(token);
        setDecks(data);
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
            <DeckCard deck={deck} />
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
