import { Link } from "react-router-dom";

interface DeckCardProps {
  deck: {
    _id: string;
    name: string;
    cards: number;
  };
}

function DeckCard({ deck }: DeckCardProps) {
  return (
    <div
      className="card p-3 text-white"
      style={{
        backgroundColor: "#1f1f1f",
        borderRadius: "12px",
        border: "1px solid #333",
      }}
    >
      <h4>{deck.name}</h4>
      <p className="text-secondary">{deck.cards} cards</p>

      <Link to={`/decks/${deck._id}`} className="btn btn-outline-primary w-100">
        Open Deck
      </Link>
    </div>
  );
}

export default DeckCard;
