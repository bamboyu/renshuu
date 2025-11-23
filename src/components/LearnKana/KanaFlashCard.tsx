import { useState } from "react";
import type { KanaItem } from "./KanaList";

interface FlashcardProps {
  selectedKana: KanaItem[];
}

const KanaFlashcard = ({ selectedKana }: FlashcardProps) => {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  // If no kana selected, show message
  if (selectedKana.length === 0)
    return <p className="text-center mt-3">No kana selected yet</p>;

  // Current kana to display
  const current = selectedKana[index];

  // Handle answer input change
  const handleChange = (value: string) => {
    setAnswer(value);
    if (value.trim().toLowerCase() === current.romaji.toLowerCase()) {
      const randomIndex = Math.floor(Math.random() * selectedKana.length);
      setIndex(randomIndex);
      setAnswer("");
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center mt-4 border border-dark bg-black-subtle"
      style={{ width: "20rem" }}
    >
      <div
        className="card text-center mb-3 bg-transparent"
        style={{ width: "12rem" }}
        onMouseEnter={() => setShowAnswer(true)}
        onMouseLeave={() => setShowAnswer(false)}
      >
        <div className="card-body text-light bg-transparent">
          <div className={showAnswer ? "visible" : "invisible"}>
            <small className="text-secondary">{current.romaji}</small>
          </div>
          <h1 className="card-title display-4">{current.kana}</h1>
        </div>
      </div>

      <input
        type="text"
        className="form-control mb-2 text-center bg-transparent text-light border border-black-subtle"
        value={answer}
        onChange={(e) => handleChange(e.target.value)}
        autoFocus
        style={{ width: "18rem" }}
      />
    </div>
  );
};

export default KanaFlashcard;
