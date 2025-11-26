import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/authApi";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // call logout function
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await signupUser(email, password);
      navigate("/login");
    } catch (err: any) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="card p-4"
        style={{
          width: "360px",
          borderRadius: "12px",
          backgroundColor: "#202020ff",
        }}
      >
        <h2 className="text-center text-white mb-4">Sign Up</h2>
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
          <div className="mb-3">
            <label className="form-label text-white">Confirm Password</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-secondary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
        <p className="mt-3 text-center text-white text-opacity-50">
          Already have an account?{" "}
          <a href="/login" className="text-info">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
