import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCards, createCard, updateCard, deleteCard } from "../api/cardApi";
import { updateDeck, deleteDeck } from "../api/deckApi";

interface Card {
  _id: string;
  front: string;
  back: string;
}

const DeckEditPage = () => {
  const { deckID } = useParams<{ deckID: string }>();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken") || "";

  const [cards, setCards] = useState<Card[]>([]);
  const [deckName, setDeckName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");

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

  // Update a card
  const handleUpdateCard = async (
    cardID: string,
    front: string,
    back: string
  ) => {
    try {
      const updated = await updateCard(cardID, { front, back }, accessToken);
      setCards((prev) => prev.map((c) => (c._id === cardID ? updated : c)));
    } catch (err: any) {
      console.error(err);
      alert("Failed to update card");
    }
  };

  // Delete a card
  const handleDeleteCard = async (cardID: string) => {
    if (!window.confirm("Delete this card?")) return;

    try {
      await deleteCard(cardID, accessToken);
      setCards((prev) => prev.filter((c) => c._id !== cardID));
    } catch (err: any) {
      console.error(err);
      alert("Failed to delete card");
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-3">Edit Deck</h2>

      {/* Deck Actions */}
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

      {/* Existing Cards */}
      <div>
        <h5 className="text-white mb-2">Cards</h5>
        {cards.map((card) => (
          <div
            key={card._id}
            className="card p-3 mb-2 text-white"
            style={{ backgroundColor: "#1f1f1f" }}
          >
            <input
              type="text"
              className="form-control mb-2"
              value={card.front}
              onChange={(e) =>
                setCards((prev) =>
                  prev.map((c) =>
                    c._id === card._id ? { ...c, front: e.target.value } : c
                  )
                )
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              value={card.back}
              onChange={(e) =>
                setCards((prev) =>
                  prev.map((c) =>
                    c._id === card._id ? { ...c, back: e.target.value } : c
                  )
                )
              }
            />
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary flex-grow-1"
                onClick={() =>
                  handleUpdateCard(card._id, card.front, card.back)
                }
              >
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteCard(card._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Card */}
      <div className="mt-4">
        <Link
          to={`/decks/add-card`}
          className="btn btn-outline-primary flex-grow-1"
        >
          Add card
        </Link>
      </div>
    </div>
  );
};

export default DeckEditPage;
