import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import LearnKana from "./pages/LearnKana";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg bg-dark.bg-gradient">
        <div className="container-fluid">
          <a className="navbar-brand ms-5 text-white text-opacity-75" href="#">
            Renshuu
          </a>
          <ul className="navbar-nav d-flex flex-row gap-2">
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-secondary" type="submit">
                Sign up
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <img src="" alt="" />

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="text-center mt-5">
              <h1>Welcome to Renshuu!</h1>
            </div>
          }
        />
        <Route path="/learn/kana" element={<LearnKana />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
