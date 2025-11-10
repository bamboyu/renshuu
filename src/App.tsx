import "./App.css";
import Kana from "./components/LearnKana/Kana";
import { hiragana, katakana } from "./data/kana";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Benkyou!</h1>
      <div className="kana-container-wrapper">
        <h3 className="kana-title">Hiragana</h3>
        <Kana items={hiragana} />
      </div>
      <div className="kana-container-wrapper">
        <h3 className="kana-title">Katakana</h3>
        <Kana items={katakana} />
      </div>
    </div>
  );
}

export default App;
