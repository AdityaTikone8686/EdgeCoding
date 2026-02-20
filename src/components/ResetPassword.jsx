import { useState } from "react";
import { Lock, Eye, EyeOff, AlertCircle, Zap } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // token from reset link

  const handleSubmit = async () => {
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("https://edge-coding-prsk.vercel.app/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setMessage("✅ Your password has been reset successfully!");
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
          <h2 style={{ fontFamily: "'Syne',sans-serif", color: "#fff" }}>Reset Password</h2>
        </div>

        {/* New Password Field */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748b" }}>
            <Lock size={15} />
          </span>
          <input
            type={showPass ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 36px 12px 36px",
              borderRadius: 10,
              border: "1px solid rgba(99,102,241,.2)",
              background: "rgba(255,255,255,.03)",
              color: "#e2e8f0",
              outline: "none",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
          >
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748b" }}>
            <Lock size={15} />
          </span>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 36px 12px 36px",
              borderRadius: 10,
              border: "1px solid rgba(99,102,241,.2)",
              background: "rgba(255,255,255,.03)",
              color: "#e2e8f0",
              outline: "none",
            }}
          />
        </div>

        {/* Error / Message */}
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
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
