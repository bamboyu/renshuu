import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import LearnKana from "./pages/LearnKana";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
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
      </Routes>
    </div>
  );
}

export default App;
