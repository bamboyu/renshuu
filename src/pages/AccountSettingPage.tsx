import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateUser } from "../api/authApi";

export default function AccountSettingsPage() {
  const { accessToken } = useContext(AuthContext);

  // Form State
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation
    if (!currentPassword) {
      setMessage({
        type: "error",
        text: "Current password is required to make changes.",
      });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    try {
      setLoading(true);
      if (!accessToken) throw new Error("Not authenticated");

      await updateUser(
        {
          email: email || undefined,
          currentPassword,
          newPassword: newPassword || undefined,
        },
        accessToken
      );

      setMessage({ type: "success", text: "Account updated successfully!" });

      // Clear sensitive fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Failed to update account",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div
            className="card text-white shadow-lg"
            style={{ backgroundColor: "#1f1f1f", borderRadius: "12px" }}
          >
            <div className="card-header border-secondary pt-4 pb-3">
              <h3 className="text-center mb-0">Account Settings</h3>
            </div>

            <div className="card-body p-4">
              {message && (
                <div
                  className={`alert alert-${
                    message.type === "success" ? "success" : "danger"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Email Section */}
                <h5 className="text-white mb-3 border-bottom border-secondary pb-2">
                  Change Email
                </h5>
                <div className="mb-4">
                  <label className="form-label">New Email Address</label>
                  <input
                    type="email"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Enter new email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Section */}
                <h5 className="text-white mb-3 border-bottom border-secondary pb-2">
                  Change Password
                </h5>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Leave blank to keep current"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {/* Confirmation Section */}
                <div className="bg-black bg-opacity-50 p-3 rounded mb-4 border border-secondary">
                  <label className="form-label text-warning fw-bold">
                    Current Password (Required)
                  </label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Enter current password to save changes"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <div className="form-text text-white-50">
                    We need your current password to verify it's really you.
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
