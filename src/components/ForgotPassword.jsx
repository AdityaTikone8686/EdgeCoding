import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!email.includes("@")) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://edge-coding-prsk.vercel.app/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      alert("✅ Reset link sent! Check your email.");
      navigate("/login");

    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#03050d", padding: 20 }}>
      <div style={{ maxWidth: 400, width: "100%", background: "rgba(8,12,26,.9)", borderRadius: 20, padding: 32 }}>
        <h2 style={{ color: "#fff", marginBottom: 16 }}>Forgot Password</h2>
        <p style={{ color: "#64748b", marginBottom: 24 }}>Enter your email to receive a password reset link.</p>

        <input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #475569", marginBottom: 8, background: "#0a0e1c", color: "#fff" }}
        />
        {error && <p style={{ color: "#f87171", marginBottom: 12 }}>{error}</p>}

        <button
          onClick={submit}
          disabled={loading}
          style={{ width: "100%", padding: 14, borderRadius: 12, background: "#6366f1", color: "#fff", fontWeight: 600, cursor: "pointer" }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <button
          onClick={() => navigate("/login")}
          style={{ marginTop: 12, background: "none", border: "none", color: "#6366f1", cursor: "pointer" }}
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}
