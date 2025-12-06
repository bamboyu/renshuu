import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LearnKana from "./pages/LearnKana";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Decks from "./pages/Decks";
import AddCard from "./pages/AddCard";
import NotFound from "./pages/NotFound";
import Review from "./pages/Review";
import DeckEditPage from "./pages/DeckEditPage";
import CardEditPage from "./pages/CardEditPage";
import AccountSettingsPage from "./pages/AccountSettingPage";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const accessToken = localStorage.getItem("accessToken") || "";
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      {/* NAVBAR */}
      <Navbar></Navbar>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/learn/kana" element={<LearnKana />} />
        <Route path="/learn/resources" element={<Resources />} />

        {/* Check for authentication */}
        {isAuthenticated && (
          <>
            <Route path="/decks" element={<Decks />} />{" "}
            <Route
              path="/decks/add-card"
              element={<AddCard accessToken={accessToken} />}
            />
            <Route path="/review/:deckID" element={<Review />} />
            <Route path="/decks/:deckID/edit" element={<DeckEditPage />} />
            <Route path="/decks/edit-card/:cardID" element={<CardEditPage />} />
            <Route path="/account" element={<AccountSettingsPage />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
