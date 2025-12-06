import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../api/authApi";

export default function Navbar() {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // State to manage the collapse
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // State for the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle the collapse
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // Close nav when an item is clicked
  const closeNav = () => {
    setIsNavCollapsed(true);
    setIsDropdownOpen(false);
  };

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    closeNav();

    // Clear tokens and auth state
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userID");
    setAuth(null, null);

    // Call logout API
    async function logout() {
      await logoutUser();
    }
    logout();

    navigate("/");
  };

  // Helper to style active links
  const getLinkClass = (path: string) => {
    const base = "nav-link fs-5 px-3 transition-all";
    return location.pathname === path
      ? `${base} text-white fw-bold`
      : `${base} text-white-50 hover-text-white`;
  };

  // Helper to style Learn link if on Learn pages
  const isLearnActive =
    location.pathname.startsWith("/learn") ||
    location.pathname === "/resources";

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        backgroundColor: "rgba(18, 18, 18, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #333",
      }}
    >
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand text-white fw-bold fs-3 tracking-tight me-5"
          to="/"
          onClick={closeNav}
        >
          Renshuu
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-secondary"
          type="button"
          onClick={handleNavCollapse} // Manually toggle state
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)" }}
          ></span>
        </button>
        <div
          className={`collapse navbar-collapse ${
            !isNavCollapsed ? "show" : ""
          }`}
          id="navbarContent"
        >
          {/* Left Side Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            {/* Decks */}
            {isAuthenticated && (
              <li className="nav-item">
                <Link
                  to="/decks"
                  className={getLinkClass("/decks")}
                  onClick={closeNav}
                >
                  Decks
                </Link>
              </li>
            )}

            {/* Learn Dropdown */}
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle fs-5 px-3 ${
                  isDropdownOpen || isLearnActive
                    ? "text-white fw-bold"
                    : "text-white-50"
                }`}
                href="#"
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                aria-expanded={isDropdownOpen}
              >
                Learn
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-dark ${
                  isDropdownOpen ? "show" : ""
                }`}
                style={{
                  backgroundColor: "#2d2d2d",
                  border: "1px solid #444",
                  marginTop: "0",
                }}
              >
                <li>
                  <Link
                    className="dropdown-item py-2"
                    to="/learn/kana"
                    onClick={closeNav}
                  >
                    Practice Japanese Kana
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider border-secondary" />
                </li>
                <li>
                  <Link
                    className="dropdown-item py-2"
                    to="/learn/resources"
                    onClick={closeNav}
                  >
                    Japanese Resources
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* Right Side Actions */}
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/account"
                    className={getLinkClass("/account")}
                    onClick={closeNav}
                  >
                    Account
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm px-4 rounded-pill"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="btn btn-outline-light px-4 rounded-pill"
                    onClick={closeNav}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="btn btn-primary px-4 rounded-pill"
                    onClick={closeNav}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
