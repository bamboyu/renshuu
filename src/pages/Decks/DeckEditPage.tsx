import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCards } from "../../api/cardApi";
import { updateDeck, deleteDeck } from "../../api/deckApi";

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

  // Calculate Stats
  const stats = useMemo(() => {
    const counts = {
      New: 0,
      Learning: 0,
      Young: 0,
      Mature: 0,
    };

    cards.forEach((card) => {
      // If tag is missing or invalid, count as 'New'
      const tag = (card.tag || "New") as keyof typeof counts;

      // Increment count if key exists
      if (counts[tag] !== undefined) {
        counts[tag]++;
      } else {
        // Fallback for unexpected tags
        counts.New++;
      }
    });

    return counts;
  }, [cards]);

  useEffect(() => {
    fetchCards();
  }, [deckID]);

  // Update deck name
  const handleUpdateDeck = async () => {
    if (!deckName.trim()) {
      alert("Deck name cannot be empty");
      return;
    }

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

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh", color: "white" }}
      >
        Loading...
      </div>
    );
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

      {/* Stats */}
      <h5 className="text-white mb-3">Statistics</h5>
      <div className="row g-2 mb-4">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="col-6 col-md-auto"
            style={{ minWidth: "120px" }}
          >
            <div
              className={`card text-white border-${getTagColor(key)}`}
              style={{ backgroundColor: "#2b2b2b" }}
            >
              <div className="card-body p-2 text-center">
                <span className={`badge bg-${getTagColor(key)} mb-1`}>
                  {key}
                </span>
                <h4 className="m-0">{value}</h4>
              </div>
            </div>
          </div>
        ))}

        {/* Total Count */}
        <div className="col-6 col-md-auto" style={{ minWidth: "120px" }}>
          <div
            className="card text-white border-light"
            style={{ backgroundColor: "#2b2b2b" }}
          >
            <div className="card-body p-2 text-center">
              <span className="badge bg-light text-dark mb-1">Total</span>
              <h4 className="m-0">{cards.length}</h4>
            </div>
          </div>
        </div>
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
        <Link
          to={`/decks/add-card?deckID=${deckID}`}
          className="btn btn-outline-primary w-100"
        >
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
    case "Young":
      return "primary";
    case "Mature":
      return "success";
    default:
      return "secondary";
  }
}

export default DeckEditPage;
