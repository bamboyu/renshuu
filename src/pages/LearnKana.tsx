import { useState } from "react";
import KanaList from "../components/LearnKana/KanaList";
import KanaFlashCard from "../components/LearnKana/KanaFlashCard";
import { hiragana, katakana } from "../data/kana";
import type { KanaItem } from "../components/LearnKana/KanaList";
import "../components/LearnKana/KanaList.css";

function LearnKana() {
  const [selectedHira, setSelectedHira] = useState<KanaItem[]>([]);
  const [selectedKata, setSelectedKata] = useState<KanaItem[]>([]);
  const [showKana, setShowKana] = useState(true);

  // Combine selected kana for flashcards
  const selectedKana = [...selectedHira, ...selectedKata].filter(
    (item) => item.kana !== ""
  );

  return (
    <div className="container mt-4">
      {/* Flashcard */}
      <div className="d-flex justify-content-center mt-4">
        <KanaFlashCard selectedKana={selectedKana} />
      </div>

      {/* Show/hide buttons */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => setShowKana(true)}
        >
          Show Kana
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShowKana(false)}
        >
          Hide Kana
        </button>
      </div>

      {/* Kana tables (Hiragana + Katakana) */}
      <div className={showKana ? "" : "d-none"}>
        {/* Hiragana */}
        <div className="kana-container-wrapper mt-4">
          <h3 className="kana-title">Hiragana</h3>
          <div className="kana-container">
            <KanaList items={hiragana} onSelectionChange={setSelectedHira} />
          </div>
        </div>

        {/* Katakana */}
        <div className="kana-container-wrapper mt-4">
          <h3 className="kana-title">Katakana</h3>
          <div className="kana-container">
            <KanaList items={katakana} onSelectionChange={setSelectedKata} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnKana;
