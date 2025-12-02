import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCards, updateCard, deleteCard } from "../api/cardApi";

const CardEditPage = () => {
  const { cardID } = useParams<{ cardID: string }>();
  const accessToken = localStorage.getItem("accessToken") || "";
  const navigate = useNavigate();

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch card details
    async function fetchCard() {
      try {
        const cards = await getCards("", accessToken);
        const card = cards.find((c: any) => c._id === cardID);
        if (card) {
          setFront(card.front);
          setBack(card.back);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCard();
  }, [cardID]);

  // Handle update
  const handleUpdate = async () => {
    try {
      await updateCard(cardID!, { front, back }, accessToken);
      alert("Card updated!");
      navigate(-1); // go back to deck edit page
    } catch (err) {
      console.error(err);
      alert("Failed to update card");
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm("Delete this card?")) return;
    try {
      await deleteCard(cardID!, accessToken);
      alert("Card deleted!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to delete card");
    }
  };

  // Rendering
  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-3">Edit Card</h2>

      {/* Front Textarea */}
      <div className="mb-3">
        <label className="form-label text-white">Front</label>
        <textarea
          className="form-control"
          rows={3}
          value={front}
          onChange={(e) => setFront(e.target.value)}
        />
      </div>

      {/* Back Textarea */}
      <div className="mb-3">
        <label className="form-label text-white">Back</label>
        <textarea
          className="form-control"
          rows={3}
          value={back}
          onChange={(e) => setBack(e.target.value)}
        />
      </div>

      {/* Update and delete */}
      <div className="d-flex gap-2">
        <button className="btn btn-primary flex-grow-1" onClick={handleUpdate}>
          Update
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardEditPage;
