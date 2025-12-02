import { useState, useEffect } from "react";
import { createCard } from "../api/cardApi";
import { getDecks } from "../api/deckApi";

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

  // Fetch decks on mount
  useEffect(() => {
    async function fetchDecks() {
      try {
        const data = await getDecks(accessToken);
        setDecks(data);
        if (data.length > 0) setSelectedDeckID(data[0]._id);
      } catch (err: any) {
        console.error(err);
        alert("Failed to load decks");
      }
    }
    fetchDecks();
  }, [accessToken]);

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
          image,
          sound,
          tag,
        },
        accessToken
      );

      alert("Card created successfully!");
      // optionally reset form or navigate
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
    <div className="container mt-4 bg-opacity-75" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 text-center">Add New Card</h2>

      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        {/* Select Deck */}
        <div className="mb-3">
          <label className="form-label">Select Deck</label>
          <select
            className="form-select"
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
          <label className="form-label">Front (Question)</label>
          <textarea
            className="form-control"
            rows={3}
            value={front}
            onChange={(e) => setFront(e.target.value)}
            required
          />
        </div>

        {/* Back */}
        <div className="mb-3">
          <label className="form-label">Back (Answer)</label>
          <textarea
            className="form-control"
            rows={3}
            value={back}
            onChange={(e) => setBack(e.target.value)}
            required
          />
        </div>

        {/* Image File */}
        <div className="mb-3">
          <label className="form-label">Image (Optional)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>

        {/* Sound File */}
        <div className="mb-3">
          <label className="form-label">Sound (Optional)</label>
          <input
            type="file"
            className="form-control"
            accept="audio/*"
            onChange={(e) =>
              setSound(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>

        {/* Tag */}
        <div className="mb-3">
          <label className="form-label">Tag</label>
          <select
            className="form-select"
            value={tag}
            onChange={(e) => setTag(e.target.value as any)}
          >
            <option value="New">New</option>
            <option value="Learning">Learning</option>
            <option value="Relearning">Relearning</option>
            <option value="Young">Young</option>
            <option value="Mature">Mature</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Card
        </button>
      </form>
    </div>
  );
}
