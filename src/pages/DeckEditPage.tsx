import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCards } from "../api/cardApi";

interface Card {
  _id: string;
  front: string;
  back: string;
  tag?: string;
}

const DeckEditPage = () => {
  const { deckID } = useParams<{ deckID: string }>();
  const accessToken = localStorage.getItem("accessToken") || "";

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all cards in this deck
  const fetchCards = async () => {
    try {
      setLoading(true);
      const data = await getCards(deckID!, accessToken);
      setCards(data);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load cards");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [deckID]);

  // Rendering
  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-3">Edit Deck Cards</h2>

      {cards.map((card) => (
        // Each card links to its edit page
        <Link
          to={`/decks/edit-card/${card._id}`}
          key={card._id}
          className="card p-3 mb-2 text-white text-decoration-none"
          style={{ backgroundColor: "#1f1f1f" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Front:</strong> {card.front} <br />
              <strong>Back:</strong> {card.back}
            </div>
            <div>
              <span className="badge bg-secondary">{card.tag || "New"}</span>
            </div>
          </div>
        </Link>
      ))}

      {/* Add New Card Button */}
      <div className="mt-4">
        <Link to={`/decks/add-card`} className="btn btn-outline-primary w-100">
          Add New Card
        </Link>
      </div>
    </div>
  );
};

export default DeckEditPage;
