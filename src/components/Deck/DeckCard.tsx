import { Link } from "react-router-dom";

// Define the props for DeckCard component
interface DeckCardProps {
  deck: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

// DeckCard component to display individual deck information
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

      <Link to={`/decks/${deck._id}`} className="btn btn-outline-primary w-100">
        Open Deck
      </Link>
    </div>
  );
}

export default DeckCard;
