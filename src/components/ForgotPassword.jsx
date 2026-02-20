import { useState } from "react";
import { Mail, AlertCircle, Zap } from "lucide-react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email.includes("@")) {
      setError("Enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("https://edge-coding-prsk.vercel.app/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setMessage("✅ Check your email for the reset link!");
      }
    } catch (err) {
      setError("Network error. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#03050d", padding: 20 }}>
      <div style={{ maxWidth: 400, width: "100%", background: "rgba(8,12,26,.9)", borderRadius: 20, padding: 32, boxShadow: "0 0 50px rgba(99,102,241,.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <Zap size={20} color="#fff" />
          <h2 style={{ fontFamily: "'Syne',sans-serif", color: "#fff" }}>Forgot Password</h2>
        </div>

        <label style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 8 }}>Email Address</label>
        <div style={{ position: "relative", marginBottom: 16 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748b" }}>
            <Mail size={15} />
          </span>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 36px",
              borderRadius: 10,
              border: "1px solid rgba(99,102,241,.2)",
              background: "rgba(255,255,255,.03)",
              color: "#e2e8f0",
              outline: "none",
            }}
          />
        </div>

        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
            <AlertCircle size={14} color="#f87171" />
            <span style={{ fontSize: 12, color: "#f87171" }}>{error}</span>
          </div>
        )}

        {message && (
          <div style={{ fontSize: 12, color: "#34d399", marginBottom: 12 }}>{message}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: 12,
            border: "none",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
}
