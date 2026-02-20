import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      alert("Invalid reset link");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async () => {
    if (!password || !confirm) return alert("Fill both fields");
    if (password !== confirm) return alert("Passwords do not match");

    setLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Reset failed");

      alert("✅ Password reset successful!");
      navigate("/login"); // redirect to login
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 360, padding: 24, borderRadius: 16, background: "#0a0c1f", color: "#fff" }}>
        <h2 style={{ marginBottom: 16 }}>Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 12, borderRadius: 8 }}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 16, borderRadius: 8 }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: "100%", padding: 12, borderRadius: 10, background: "#6366f1", color: "#fff" }}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
