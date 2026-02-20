import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Eye, EyeOff, AlertCircle, Zap, ArrowRight } from "lucide-react";

// ── Password Field ───────────────────────────────────────────────
function PassField({ label = "New Password", value, onChange, error }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 500,
          color: focused ? "#818cf8" : "#475569",
          textTransform: "uppercase",
          letterSpacing: "0.09em",
          marginBottom: 7,
          fontFamily: "'Syne',sans-serif",
          transition: "color .2s",
        }}
      >
        {label}
      </label>

      <div style={{ position: "relative", animation: error ? "shake .35s ease" : "none" }}>
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: focused ? "#6366f1" : "#334155",
            display: "flex",
            pointerEvents: "none",
          }}
        >
          <Lock size={15} />
        </span>

        <input
          type={show ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            background: error ? "rgba(239,68,68,.05)" : "rgba(255,255,255,.03)",
            border: `1.5px solid ${error ? "rgba(239,68,68,.45)" : focused ? "#6366f1" : "rgba(99,102,241,.18)"}`,
            borderRadius: 12,
            padding: "13px 44px 13px 42px",
            fontSize: 14,
            color: "#e2e8f0",
            outline: "none",
            fontFamily: "'DM Sans',sans-serif",
            transition: "all .2s",
            caretColor: "#6366f1",
            boxShadow: focused ? "0 0 0 3px rgba(99,102,241,.12)" : "none",
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "#475569",
            cursor: "pointer",
            display: "flex",
          }}
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>

      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
          <AlertCircle size={11} color="#f87171" />
          <span style={{ fontSize: 11, color: "#f87171" }}>{error}</span>
        </div>
      )}
    </div>
  );
}

// ── Primary Button ───────────────────────────────────────────────
function PrimaryBtn({ children, onClick, loading }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        padding: "14px 24px",
        borderRadius: 13,
        fontWeight: 700,
        fontSize: 14,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        boxShadow: hov ? "0 0 0 1px rgba(99,102,241,.5) inset,0 14px 40px rgba(99,102,241,.45)" : "0 0 0 1px rgba(99,102,241,.3) inset,0 8px 24px rgba(99,102,241,.25)",
        transform: hov ? "translateY(-1px)" : "translateY(0)",
        transition: "all .2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontFamily: "'Syne',sans-serif",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {loading ? (
        <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
      ) : (
        children
      )}
    </button>
  );
}

// ── Reset Password Page ─────────────────────────────────────────
export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const handleSubmit = async () => {
    if (!password || password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirm) return setError("Passwords do not match");

    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://edge-coding-prsk.vercel.app/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to reset password");
        setLoading(false);
        return;
      }

      alert("✅ Password reset successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#03050d" }}>
      <div style={{ width: "100%", maxWidth: 420, padding: 32, background: "rgba(8,12,26,.92)", borderRadius: 24 }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Reset Password</h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#64748b", marginBottom: 24 }}>
          Enter your new password
        </p>

        <PassField label="New Password" value={password} onChange={setPassword} error={error} />
        <PassField label="Confirm Password" value={confirm} onChange={setConfirm} />

        <PrimaryBtn onClick={handleSubmit} loading={loading}>
          <Zap size={15} /> Reset Password <ArrowRight size={15} />
        </PrimaryBtn>

        {error && <p style={{ color: "#f87171", marginTop: 12, fontSize: 13 }}>{error}</p>}
      </div>
    </div>
  );
}
