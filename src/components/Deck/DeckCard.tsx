import { Link, useNavigate } from "react-router-dom";

interface DeckCardProps {
  deck: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  cardCount: number; // number of cards in this deck
}

function DeckCard({ deck, cardCount }: DeckCardProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Navigate to edit deck page
    navigate(`/decks/${deck._id}/edit`);
  };

  return (
    <div
      className="card p-3 text-white mb-3"
      style={{
        backgroundColor: "#1f1f1f",
        borderRadius: "12px",
        border: "1px solid #333",
      }}
    >
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h4>{deck.name}</h4>
        <span className="badge bg-secondary">{cardCount} cards</span>
      </div>

      <div className="d-flex gap-2">
        <Link
          to={`/review/${deck._id}`}
          className="btn btn-outline-primary flex-grow-1"
        >
          Open Deck
        </Link>

        <button className="btn btn-outline-warning" onClick={handleEdit}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default DeckCard;
