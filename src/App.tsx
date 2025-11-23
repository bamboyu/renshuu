import "./App.css";
import KanaList from "./components/LearnKana/KanaList";
import { hiragana, katakana } from "./data/kana";
import KanaFlashCard from "./components/LearnKana/KanaFlashCard";
import { useState } from "react";
import type { KanaItem } from "./components/LearnKana/KanaList";

function App() {
  // State to hold selected kana from both lists
  const [selectedHira, setSelectedHira] = useState<KanaItem[]>([]);
  const [selectedKata, setSelectedKata] = useState<KanaItem[]>([]);

  // Combine selected kana for flashcards
  const selectedKana = [...selectedHira, ...selectedKata].filter(
    (item) => item.kana !== ""
  );
  // show/hide kana state (not used currently)
  const [showKana, setShowKana] = useState(true);

  return (
    <div className="App">
      <img src="" alt="" />
      {/* Flash card component */}
      <div className="d-flex justify-content-center mt-4">
        <KanaFlashCard selectedKana={selectedKana} />
      </div>
      {/* Button to hide/show kana */}
      <div className="d-flex justify-content-center mt4">
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
      {/* Kana list */}
      <div className={showKana ? "" : "d-none"}>
        <div className="kana-container-wrapper">
          <h3 className="kana-title">Hiragana</h3>
          <KanaList items={hiragana} onSelectionChange={setSelectedHira} />
        </div>
        <div className="kana-container-wrapper">
          <h3 className="kana-title">Katakana</h3>
          <KanaList items={katakana} onSelectionChange={setSelectedKata} />
        </div>
      </div>
    </div>
  );
}

export default App;
