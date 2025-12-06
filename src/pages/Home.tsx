import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="text-white">
      {/* --- HERO SECTION --- */}
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          minHeight: "80vh",
          background:
            "linear-gradient(180deg, rgba(32,32,32,0) 0%, rgba(18,18,18,1) 100%)",
          padding: "2rem",
        }}
      >
        <h1
          className="display-3 fw-bold mb-4"
          style={{ letterSpacing: "-1px" }}
        >
          Master Language with <span className="text-primary">Renshuu</span>
        </h1>
        <p className="lead text-white-50 mb-5" style={{ maxWidth: "600px" }}>
          A powerful flashcard app designed to help you memorize using Spaced
          Repetition.
        </p>

        <div className="d-flex gap-3 flex-wrap justify-content-center">
          {isAuthenticated ? (
            <Link
              to="/decks"
              className="btn btn-primary btn-lg px-5 rounded-pill shadow-lg"
            >
              Go to My Decks
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="btn btn-primary btn-lg px-5 rounded-pill shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="btn btn-outline-light btn-lg px-5 rounded-pill"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      {/* --- FOOTER --- */}
      <footer className="container py-5 mt-5 text-center text-white-50 border-top border-secondary">
        <p>&copy; {new Date().getFullYear()} Renshuu. All rights reserved.</p>
      </footer>
    </div>
  );
}
