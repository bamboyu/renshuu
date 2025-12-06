import { useState, useEffect } from "react";
import { createCard } from "../api/cardApi";
import { getDecks } from "../api/deckApi";
import { generateBack, generateImage } from "../api/generateApi";

interface Deck {
  _id: string;
  name: string;
}

interface AddCardPageProps {
  accessToken: string;
}

export default function AddCardPage({ accessToken }: AddCardPageProps) {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeckID, setSelectedDeckID] = useState<string>("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [sound, setSound] = useState<File | null>(null);
  const [tag, setTag] = useState<
    "New" | "Learning" | "Relearning" | "Young" | "Mature"
  >("New");
  const [loadingBack, setLoadingBack] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  // Fetch decks on mount
  useEffect(() => {
    async function fetchDecks() {
      try {
        const data = await getDecks();
        setDecks(data);
        if (data.length > 0) setSelectedDeckID(data[0]._id);
      } catch (err: any) {
        console.error(err);
        alert("Failed to load decks");
      }
    }
    fetchDecks();
  }, [accessToken]);

  // Generate back text
  const handleGenerateBack = async () => {
    if (!front) {
      alert("Please enter the front text first");
      return;
    }
    try {
      setLoadingBack(true);
      const generatedBack = await generateBack(front, accessToken);
      setBack(generatedBack);
    } catch (err: any) {
      console.error(err);
      alert("Failed to generate back");
    } finally {
      setLoadingBack(false);
    }
  };

  // Generate image
  const handleGenerateImage = async () => {
    if (!front) {
      alert("Please enter the front text first");
      return;
    }
    try {
      setLoadingImage(true);
      const generatedImageUrl = await generateImage(front, accessToken);
      // Store the S3 URL directly
      setImage(generatedImageUrl);
    } catch (err: any) {
      console.error(err);
      alert("Failed to generate image");
    } finally {
      setLoadingImage(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDeckID) {
      alert("Please select a deck");
      return;
    }

    try {
      await createCard(
        {
          deckID: selectedDeckID,
          front,
          back,
          image: typeof image === "string" ? image : image,
          sound,
        },
        accessToken
      );

      alert("Card created successfully!");
      // Clear form
      setFront("");
      setBack("");
      setImage(null);
      setSound(null);
      setTag("New");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to add card");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 text-center text-white">Add New Card</h2>

      <form
        className="card p-4 shadow bg-dark text-white border-secondary"
        onSubmit={handleSubmit}
        style={{ borderRadius: "12px" }}
      >
        {/* Select Deck */}
        <div className="mb-3">
          <label className="form-label text-white">Select Deck</label>
          <select
            className="form-select bg-dark text-white border-secondary"
            value={selectedDeckID}
            onChange={(e) => setSelectedDeckID(e.target.value)}
            required
          >
            {decks.map((deck) => (
              <option key={deck._id} value={deck._id}>
                {deck.name}
              </option>
            ))}
          </select>
        </div>

        {/* Front */}
        <div className="mb-3">
          <label className="form-label text-white">Front (Question)</label>
          <textarea
            className="form-control bg-dark text-white border-secondary"
            rows={3}
            value={front}
            onChange={(e) => setFront(e.target.value)}
            required
          />
        </div>

        {/* Back */}
        <div className="mb-3">
          <label className="form-label text-white">Back (Answer)</label>
          <textarea
            className="form-control bg-dark text-white border-secondary"
            rows={3}
            value={back}
            onChange={(e) => setBack(e.target.value)}
            required
          />
          <button
            type="button"
            className="btn btn-outline-light mt-2"
            onClick={handleGenerateBack}
            disabled={loadingBack}
          >
            {loadingBack ? "Generating..." : "Generate Back (AI)"}
          </button>
        </div>

        {/* Image File */}
        <div className="mb-3">
          <label className="form-label text-white">Image (Optional)</label>
          <input
            type="file"
            className="form-control bg-dark text-white border-secondary"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
          <button
            type="button"
            className="btn btn-outline-light mt-2"
            onClick={handleGenerateImage}
            disabled={loadingImage}
          >
            {loadingImage ? "Generating..." : "Generate Image (AI)"}
          </button>

          {/* Show generated image preview */}
          {image && typeof image === "string" && (
            <div className="mt-3 text-center">
              <img
                src={image}
                alt="Generated"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: "8px",
                  border: "1px solid #555",
                }}
              />
            </div>
          )}
        </div>

        {/* Sound File */}
        <div className="mb-3">
          <label className="form-label text-white">Sound (Optional)</label>
          <input
            type="file"
            className="form-control bg-dark text-white border-secondary"
            accept="audio/*"
            onChange={(e) =>
              setSound(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Card
        </button>
      </form>
    </div>
  );
}
