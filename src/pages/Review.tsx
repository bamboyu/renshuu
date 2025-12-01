import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNextCard, reviewCard } from "../api/studyApi";

// Card interface
interface Card {
  _id: string;
  front: string;
  back: string;
  tag: string;
}

// StudyPage component
const Review = () => {
  const { deckID } = useParams<{ deckID: string }>();
  const accessToken = localStorage.getItem("accessToken") || "";

  const [card, setCard] = useState<Card | null>(null);
  const [showBack, setShowBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch next due card
  const fetchNextCard = async () => {
    setLoading(true);
    setShowBack(false);
    try {
      const data = await getNextCard(deckID!, accessToken);
      setCard(data.card);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch card");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNextCard();
  }, [deckID]);

  // Handle rating submission
  const handleRating = async (rating: number) => {
    if (!card) return;

    try {
      await reviewCard(card._id, rating, accessToken);
      fetchNextCard(); // get the next due card
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to review card");
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (!card) return <div className="text-white">No cards due for review!</div>;

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}

      <div
        className="card p-4 text-white text-center"
        style={{ backgroundColor: "#1f1f1f", borderRadius: "12px" }}
      >
        <h5 className="mb-3">{showBack ? card.back : card.front}</h5>
        {!showBack && (
          <button
            className="btn btn-outline-light mb-3"
            onClick={() => setShowBack(true)}
          >
            Show Answer
          </button>
        )}

        {/* Rating Buttons */}
        {showBack && (
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger" onClick={() => handleRating(0)}>
              Again
            </button>
            <button className="btn btn-warning" onClick={() => handleRating(1)}>
              Hard
            </button>
            <button className="btn btn-success" onClick={() => handleRating(2)}>
              Good
            </button>
            <button className="btn btn-primary" onClick={() => handleRating(3)}>
              Easy
            </button>
          </div>
        )}

        <div className="mt-2">
          <small>Stage: {card.tag}</small>
        </div>
      </div>
    </div>
  );
};

export default Review;
