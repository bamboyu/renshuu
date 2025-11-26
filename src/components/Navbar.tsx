import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../api/authApi";

export default function Navbar() {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear tokens and auth state
    localStorage.removeItem("accessToken");
    setAuth(false);

    // Call API
    try {
      logoutUser();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-black bg-opacity-25">
      <div className="container-fluid d-flex align-items-center ms-3">
        <a className="navbar-brand ms-5 text-white fs-4 mb-1" href="/">
          Renshuu
        </a>
        {isAuthenticated && (
          <ul className="navbar-nav ms-4">
            <li className="nav-item">
              <Link to="/decks" className="nav-link text-white-50 fs-5 ms-3">
                Decks
              </Link>
            </li>
          </ul>
        )}
        <ul className="navbar-nav d-flex flex-row gap-2 ms-auto">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="btn btn-outline-primary ms-10">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="btn btn-secondary">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
