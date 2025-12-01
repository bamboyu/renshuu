import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import LearnKana from "./pages/LearnKana";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Decks from "./pages/Decks";
import AddCard from "./pages/AddCard";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Review from "./pages/Review";
import DeckEditPage from "./pages/DeckEditPage";

function App() {
  const accessToken = localStorage.getItem("accessToken") || "";
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      {/* NAVBAR */}
      <Navbar></Navbar>

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="text-center mt-5">
              <h1>Welcome to Renshuu!</h1>
              <Link to="/learn/kana" className="btn btn-primary mt-5">
                Practice Kana
              </Link>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/learn/kana" element={<LearnKana />} />

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
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
