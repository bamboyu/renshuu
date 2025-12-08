import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNextCard, reviewCard } from "../../api/studyApi";
import { getCards } from "../../api/cardApi"; // Import getCards to calculate stats

// Card interface
interface Card {
  _id: string;
  front: string;
  back: string;
  tag: string;
  image?: string; // URL or path
  sound?: string; // URL or path
  nextReview: string;
}

// Stats interface
interface StudyStats {
  new: number;
  learning: number;
  review: number;
}

// Estimates interface
interface Estimates {
  0: string; // Again
  1: string; // Hard
  2: string; // Good
  3: string; // Easy
}

// StudyPage component
const Review = () => {
  const { deckID } = useParams<{ deckID: string }>();
  const accessToken = localStorage.getItem("accessToken") || "";

  const [card, setCard] = useState<Card | null>(null);
  const [estimates, setEstimates] = useState<Estimates | null>(null);
  const [showBack, setShowBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for session counts
  const [stats, setStats] = useState<StudyStats>({
    new: 0,
    learning: 0,
    review: 0,
  });

  // Fetch counts
  const updateStats = async () => {
    if (!deckID) return;
    try {
      // Fetch all cards to count what is due right now
      const allCards = await getCards(deckID, accessToken);
      const now = new Date();

      // Set to end of today for due calculation
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      let newCount = 0;
      let learningCount = 0;
      let reviewCount = 0;

      allCards.forEach((c: any) => {
        const cardDate = new Date(c.nextReview);
        const isDueToday = cardDate <= endOfDay;

        if (c.tag === "New") {
          newCount++;
        } else if (c.tag === "Learning") {
          // Count learning cards due today
          if (isDueToday) learningCount++;
        } else if (["Young", "Mature"].includes(c.tag)) {
          if (isDueToday) reviewCount++;
        }
      });

      setStats({ new: newCount, learning: learningCount, review: reviewCount });
    } catch (err) {
      console.error("Failed to update stats", err);
    }
  };

  // Fetch next due card
  const fetchNextCard = async () => {
    setShowBack(false);
    try {
      const data = await getNextCard(deckID!, accessToken);
      setCard(data.card);

      // Capture the estimates sent by the backend
      if (data.estimates) {
        setEstimates(data.estimates);
      }

      // If no card is returned, we stop loading
      if (!data.card) setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch card");
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchNextCard(), updateStats()]).finally(() =>
      setLoading(false)
    );
  }, [deckID]);

  // Play sound
  const handlePlaySound = () => {
    if (card?.sound) {
      const audio = new Audio(card.sound);
      audio.play();
    }
  };

  // Handle rating submission
  const handleRating = async (rating: number) => {
    if (!card) return;

    try {
      await reviewCard(card._id, rating, accessToken);
      await fetchNextCard();
      // Update stats after reviewing a card
      updateStats();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to review card");
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

  if (!card)
    return (
      <div className="container mt-5 text-center text-white">
        <div
          className="d-flex justify-content-center align-items-center mb-4"
          style={{ height: "50vh", fontSize: "2rem" }}
        >
          <div>
            <p>All done for now!</p>
            <p className="fs-5 text-white-50">No more cards due for review.</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Stats */}
      <div className="d-flex justify-content-center gap-4 mb-3 fw-bold">
        <span className="text-primary">New: {stats.new}</span>
        <span className="text-danger">Learning: {stats.learning}</span>
        <span className="text-success">Review: {stats.review}</span>
      </div>

      <div
        className="card p-4 text-white text-center shadow-lg"
        style={{
          backgroundColor: "#1f1f1f",
          borderRadius: "12px",
          minHeight: "400px",
        }}
      >
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            {/* Front / Back Text */}
            <h3 className="mb-4 display-6">{card.front}</h3>
            {showBack && (
              <div>
                <hr className="border-secondary my-4" />
                <h3 className="mb-4 display-6">{card.back}</h3>
              </div>
            )}

            {/* Image */}
            {showBack && card.image && (
              <div className="mb-4 text-center">
                <img
                  src={card.image}
                  alt="Card visual"
                  className="img-fluid rounded"
                  style={{ maxHeight: "300px", objectFit: "contain" }}
                />
              </div>
            )}
          </div>

          {/* Controls Area */}
          <div>
            {/* Show Answer Button */}
            {!showBack && (
              <button
                className="btn btn-lg btn-primary px-5 py-3 mb-3"
                onClick={() => setShowBack(true)}
              >
                Show Answer
              </button>
            )}

            {/* Play Sound Button */}
            {showBack && card.sound && (
              <div className="mb-3">
                <button
                  className="btn btn-outline-info rounded-pill"
                  onClick={handlePlaySound}
                >
                  🔊 Play Sound
                </button>
              </div>
            )}

            {/* Rating Buttons */}
            {showBack && (
              <div className="d-grid gap-2 d-md-flex justify-content-center mt-3">
                <button
                  className="btn btn-danger btn-lg px-4"
                  onClick={() => handleRating(0)}
                >
                  Again <br />
                  <small className="fs-6 fw-light opacity-75">
                    {estimates?.[0]}
                  </small>
                </button>
                <button
                  className="btn btn-secondary btn-lg px-4"
                  onClick={() => handleRating(1)}
                >
                  Hard <br />
                  <small className="fs-6 fw-light opacity-75">
                    {estimates?.[1]}
                  </small>
                </button>
                <button
                  className="btn btn-success btn-lg px-4"
                  onClick={() => handleRating(2)}
                >
                  Good <br />
                  <small className="fs-6 fw-light opacity-75">
                    {estimates?.[2]}
                  </small>
                </button>
                <button
                  className="btn btn-primary btn-lg px-4"
                  onClick={() => handleRating(3)}
                >
                  Easy <br />
                  <small className="fs-6 fw-light opacity-75">
                    {estimates?.[3]}
                  </small>
                </button>
              </div>
            )}

            <div className="mt-4 text-white-50">
              <small>Current Stage: {card.tag}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
