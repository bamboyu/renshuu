import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LearnKana from "./pages/Learn/LearnKana";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ForgotPassword/ResetPassword";
import Decks from "./pages/Decks/Decks";
import AddCard from "./pages/Cards/AddCard";
import NotFound from "./pages/NotFound";
import Review from "./pages/Learn/Review";
import DeckEditPage from "./pages/Decks/DeckEditPage";
import CardEditPage from "./pages/Cards/CardEditPage";
import AccountSettingsPage from "./pages/Auth/AccountSettingPage";
import Home from "./pages/Home";
import Resources from "./pages/Learn/Resources";

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
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
