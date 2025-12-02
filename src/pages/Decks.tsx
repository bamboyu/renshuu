import { useContext, useEffect, useState } from "react";
import DeckCard from "../components/Deck/DeckCard";
import { getDecks, createDeck } from "../api/deckApi";
import { getCardCount } from "../api/cardApi";
import { AuthContext } from "../context/AuthContext";

interface Deck {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const Decks = () => {
  const { accessToken, isAuthenticated } = useContext(AuthContext);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cardCounts, setCardCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  // fetch Decks
  useEffect(() => {
    async function fetchDecks() {
      // If not authenticated, skip fetching
      if (!isAuthenticated || !accessToken) return;

      try {
        setLoading(true);
        const data = await getDecks();
        setDecks(data);

        // Fetch card counts for each deck
        const counts: Record<string, number> = {};

        // Use Promise.allSettled to prevent one failure from breaking the whole page
        const countPromises = data.map(async (deck: any) => {
          try {
            // Pass the current accessToken from Context
            const count = await getCardCount(deck._id, accessToken);
            counts[deck._id] = count;
          } catch (e) {
            counts[deck._id] = 0; // Default to 0 on error
          }
        });

        await Promise.all(countPromises);
        setCardCounts(counts);
      } catch (err) {
        console.error("Error fetching decks:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDecks();
  }, [isAuthenticated, accessToken]);

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
      {loading && decks.length === 0 ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="row">
          {decks.map((deck) => (
            <div key={deck._id} className="mb-2">
              <DeckCard deck={deck} cardCount={cardCounts[deck._id] || 0} />
            </div>
          ))}
          {decks.length === 0 && !loading && (
            <div className="text-white-50">No decks found.</div>
          )}
        </div>
      )}
      {/* Button to create deck */}
      <button onClick={handleCreateDeck} className="btn btn-primary mt-3">
        + Create Deck
      </button>
    </div>
  );
};

export default Decks;
