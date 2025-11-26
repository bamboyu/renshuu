import { useEffect, useState } from "react";
import DeckCard from "../components/Deck/DeckCard";
import { getDecks } from "../api/deckApi";

interface Deck {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const Decks = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

  //fetch Decks
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">Your Decks</h2>
      </div>
      <div className="row">
        {decks.map((deck) => (
          <div key={deck._id} col-md-4 col-sm-6 mb-4>
            <DeckCard deck={deck} />
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-3">+ Create Deck</button>
    </div>
  );
};

export default Decks;
