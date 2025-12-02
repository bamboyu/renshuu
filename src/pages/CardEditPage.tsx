import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCard, updateCard, deleteCard } from "../api/cardApi";

const CardEditPage = () => {
  const { cardID } = useParams<{ cardID: string }>();
  const accessToken = localStorage.getItem("accessToken") || "";
  const navigate = useNavigate();

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [sound, setSound] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch card details on mount
  useEffect(() => {
    async function fetchCard() {
      try {
        const card = await getCard(cardID!, accessToken);
        setFront(card.front);
        setBack(card.back);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchCard();
  }, [cardID]);

  // Handle update
  const handleUpdate = async () => {
    try {
      await updateCard(
        cardID!,
        {
          front,
          back,
          image,
          sound,
        },
        accessToken
      );
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

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-3">Edit Card</h2>

      {/* Front */}
      <div className="mb-3">
        <label className="form-label text-white">Front</label>
        <textarea
          className="form-control"
          rows={3}
          value={front}
          onChange={(e) => setFront(e.target.value)}
        />
      </div>

      {/* Back */}
      <div className="mb-3">
        <label className="form-label text-white">Back</label>
        <textarea
          className="form-control"
          rows={3}
          value={back}
          onChange={(e) => setBack(e.target.value)}
        />
      </div>

      {/* Image */}
      <div className="mb-3">
        <label className="form-label text-white">Image (Optional)</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        />
      </div>

      {/* Sound */}
      <div className="mb-3">
        <label className="form-label text-white">Sound (Optional)</label>
        <input
          type="file"
          className="form-control"
          accept="audio/*"
          onChange={(e) => setSound(e.target.files ? e.target.files[0] : null)}
        />
      </div>

      {/* Update / Delete */}
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
