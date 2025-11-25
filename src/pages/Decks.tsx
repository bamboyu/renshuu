import { useState } from "react";
import DeckCard from "../components/Deck/DeckCard";

const Decks = () => {
  const [decks, setDecks] = useState([
    // test valuie
    { _id: "1", name: "Hiragana", cards: 46 },
    { _id: "2", name: "Katakana", cards: 46 },
    { _id: "3", name: "JLPT N5 Vocabulary", cards: 100 },
  ]);

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
