import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../api/authApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call login function
    try {
      const data = await loginUser(email, password);

      // Store token and userID in localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userID", data.user.id);

      setAuth(data.accessToken, data.user.id);

      navigate("/");
    } catch (err: any) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    // Login Form
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="card p-4"
        style={{
          width: "360px",
          borderRadius: "12px",
          backgroundColor: "#202020ff",
        }}
      >
        <h2 className="text-center text-white mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-secondary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-secondary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        {/* Forgot Password Link */}
        <div className="text-end mt-1">
          <Link
            to="/forgot-password"
            style={{
              fontSize: "0.85rem",
              color: "#aaa",
              textDecoration: "none",
            }}
          >
            Forgot Password?
          </Link>
        </div>
        <p className="mt-3 text-center text-white text-opacity-50">
          Don't have an account?{" "}
          <a href="/signup" className="text-info">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
