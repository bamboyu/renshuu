import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCards } from "../api/cardApi";
import { updateDeck, deleteDeck } from "../api/deckApi";

interface Card {
  _id: string;
  front: string;
  back: string;
  tag?: string; // Card tag
}

const DeckEditPage = () => {
  const { deckID } = useParams<{ deckID: string }>();
  const accessToken = localStorage.getItem("accessToken") || "";
  const navigate = useNavigate();

  const [deckName, setDeckName] = useState("");
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

  // Update deck name
  const handleUpdateDeck = async () => {
    try {
      await updateDeck(deckID!, deckName, accessToken);
      alert("Deck updated!");
    } catch (err: any) {
      console.error(err);
      alert("Failed to update deck");
    }
  };

  // Delete deck
  const handleDeleteDeck = async () => {
    if (!window.confirm("Are you sure you want to delete this deck?")) return;
    try {
      await deleteDeck(deckID!, accessToken);
      alert("Deck deleted!");
      navigate("/decks");
    } catch (err: any) {
      console.error(err);
      alert("Failed to delete deck");
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-3">Edit Deck</h2>

      {/* Deck Name & Actions */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Deck Name"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
        <button className="btn btn-primary me-2" onClick={handleUpdateDeck}>
          Update Deck
        </button>
        <button className="btn btn-danger" onClick={handleDeleteDeck}>
          Delete Deck
        </button>
      </div>

      {/* Cards List */}
      <h5 className="text-white mb-2">Cards</h5>
      {cards.map((card) => (
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
              {/* Card tag badge */}
              <span className={`badge bg-${getTagColor(card.tag)}`}>
                {card.tag || "New"}
              </span>
            </div>
          </div>
        </Link>
      ))}

      {/* Add New Card */}
      <div className="mt-4">
        <Link to={`/decks/add-card`} className="btn btn-outline-primary w-100">
          Add New Card
        </Link>
      </div>
    </div>
  );
};

// Helper function to choose badge color by tag
function getTagColor(tag?: string) {
  switch (tag) {
    case "New":
      return "secondary";
    case "Learning":
      return "warning";
    case "Relearning":
      return "info";
    case "Young":
      return "primary";
    case "Mature":
      return "success";
    default:
      return "secondary";
  }
}

export default DeckEditPage;
