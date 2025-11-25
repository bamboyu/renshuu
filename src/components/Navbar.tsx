import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e: React.FormEvent) => {
    // Clear tokens and auth state
    localStorage.removeItem("accessToken");
    setAuth(false);
    try {
      const res = await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Logout failed");
        return;
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Logout failed. Check console for details.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-black bg-opacity-25">
      <div className="container-fluid">
        <a className="navbar-brand ms-5 text-white text-opacity-75" href="/">
          Renshuu
        </a>
        <ul className="navbar-nav d-flex flex-row gap-2 ms-auto">
          {isAuthenticated ? (
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
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
