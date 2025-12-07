import { useState } from "react";
import { forgotPassword } from "../../../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
    } catch (err: any) {
      setError(err.message || "Failed to send link");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="card p-4 bg-dark text-white shadow"
        style={{
          width: "400px",
          borderRadius: "12px",
          border: "1px solid #333",
        }}
      >
        <h3 className="text-center mb-3">Reset Password</h3>
        <p className="text-white-50 text-center mb-4 small">
          Enter your email to receive a reset link.
        </p>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control bg-secondary text-white border-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
