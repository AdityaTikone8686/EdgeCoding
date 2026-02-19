import { useState, useEffect, useRef } from "react";
import {
  Eye, EyeOff, Mail, Lock, User, Zap, ArrowRight, ArrowLeft,
  Github, Chrome, Shield, RefreshCw, KeyRound, CheckCircle2,
  Circle, Sparkles, Trophy, Flame, Rocket, LogOut, Send,
  ShieldCheck, AlertCircle, Check, Smartphone, Globe, Code2,
  BarChart2, Cpu, Monitor, Briefcase, GraduationCap, Layers,
  MailCheck, X
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #060810; }
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 100px #0d1022 inset !important;
        -webkit-text-fill-color: #e5e7eb !important;
      }
      @keyframes orb1     { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,-30px) scale(1.12)} }
      @keyframes orb2     { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,40px) scale(0.92)} }
      @keyframes orb3     { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,20px) scale(1.05)} 66%{transform:translate(-20px,-10px) scale(0.97)} }
      @keyframes slideUp  { from{opacity:0;transform:translateY(32px) scale(0.98)} to{opacity:1;transform:translateY(0) scale(1)} }
      @keyframes slideIn  { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
      @keyframes spin     { to{transform:rotate(360deg)} }
      @keyframes shake    { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-7px)} 40%,80%{transform:translateX(7px)} }
      @keyframes pulseRing{ 0%{box-shadow:0 0 0 0 rgba(99,102,241,0.45)} 70%{box-shadow:0 0 0 16px rgba(99,102,241,0)} 100%{box-shadow:0 0 0 0 rgba(99,102,241,0)} }
      @keyframes popIn    { 0%{transform:scale(0.4);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
      @keyframes gradMove { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
      @keyframes float    { 0%,100%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(80px) rotate(540deg);opacity:0} }
    `}</style>
  </>
);

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUND
// ─────────────────────────────────────────────────────────────────────────────
const Background = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", background: "#060810" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 15% 5%, rgba(79,70,229,0.22) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 85% 85%, rgba(139,92,246,0.16) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 60% 40%, rgba(6,182,212,0.07) 0%, transparent 55%)" }} />
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
    {[
      { w: 320, h: 320, top: "2%",  left: "2%",  c: "rgba(99,102,241,0.1)",  a: "orb1 14s ease-in-out infinite" },
      { w: 240, h: 240, top: "55%", left: "72%", c: "rgba(139,92,246,0.09)", a: "orb2 17s ease-in-out infinite" },
      { w: 180, h: 180, top: "35%", left: "55%", c: "rgba(6,182,212,0.07)",  a: "orb3 20s ease-in-out infinite" },
      { w: 140, h: 140, top: "75%", left: "10%", c: "rgba(99,102,241,0.06)", a: "orb1 22s ease-in-out infinite reverse" },
    ].map((o, i) => (
      <div key={i} style={{ position: "absolute", width: o.w, height: o.h, top: o.top, left: o.left, background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)`, borderRadius: "50%", animation: o.a, filter: "blur(1px)" }} />
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────
const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
    <div style={{ width: 38, height: 38, borderRadius: 11, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(99,102,241,0.55), 0 0 0 1px rgba(99,102,241,0.3) inset" }}>
      <Zap size={18} color="#fff" />
    </div>
    <span style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: 19, color: "#fff", letterSpacing: -0.5 }}>
      Code<span style={{ color: "#8b5cf6" }}>Quest</span>
    </span>
  </div>
);

const AccentLine = () => (
  <div style={{ height: 3, borderRadius: "3px 3px 0 0", background: "linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4,#6366f1)", backgroundSize: "200% 100%", animation: "gradMove 4s linear infinite", marginBottom: 32 }} />
);

const Card = ({ children, style = {} }) => (
  <div style={{ position: "relative", width: "100%", maxWidth: 440, background: "rgba(9,12,24,0.92)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: 24, overflow: "hidden", boxShadow: "0 0 0 1px rgba(255,255,255,0.03) inset, 0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(99,102,241,0.07)", backdropFilter: "blur(28px)", animation: "slideUp 0.45s cubic-bezier(.22,.68,0,1.15) both", ...style }}>
    <AccentLine />
    <div style={{ padding: "0 32px 32px" }}>{children}</div>
  </div>
);

const FieldLabel = ({ children }) => (
  <div style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 7, fontFamily: "'Space Mono',monospace" }}>{children}</div>
);

const inputStyle = (err, focused) => ({
  width: "100%", background: err ? "rgba(239,68,68,0.05)" : "rgba(255,255,255,0.03)",
  border: `1.5px solid ${err ? "rgba(239,68,68,0.45)" : focused ? "#6366f1" : "rgba(99,102,241,0.18)"}`,
  borderRadius: 12, padding: "13px 16px 13px 42px", fontSize: 13,
  color: "#e5e7eb", outline: "none", fontFamily: "'Inter',sans-serif",
  transition: "all 0.2s", caretColor: "#6366f1",
  boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
});

function TextField({ label, type = "text", placeholder, value, onChange, Icon, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      <FieldLabel>{label}</FieldLabel>
      <div style={{ position: "relative", animation: error ? "shake 0.35s ease" : "none" }}>
        <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: focused ? "#6366f1" : "#4b5563", display: "flex", transition: "color 0.2s", pointerEvents: "none" }}>
          <Icon size={15} />
        </span>
        <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
          style={inputStyle(error, focused)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
            <AlertCircle size={11} color="#f87171" />
            <p style={{ color: "#f87171", fontSize: 11, fontFamily: "'Space Mono',monospace" }}>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PassField({ label = "Password", value, onChange, error, showStrength }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const str = !value ? 0 : value.length < 5 ? 1 : value.length < 8 ? 2 : /[A-Z]/.test(value) && /[0-9!@#$%]/.test(value) ? 4 : 3;
  const sc  = ["transparent", "#ef4444", "#f97316", "#eab308", "#22c55e"];
  const sl  = ["", "Too short", "Weak", "Fair", "Strong"];
  return (
    <div style={{ marginBottom: 14 }}>
      <FieldLabel>{label}</FieldLabel>
      <div style={{ position: "relative", animation: error ? "shake 0.35s ease" : "none" }}>
        <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: focused ? "#6366f1" : "#4b5563", display: "flex", transition: "color 0.2s", pointerEvents: "none" }}>
          <Lock size={15} />
        </span>
        <input type={show ? "text" : "password"} placeholder="Min. 8 characters" value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...inputStyle(error, focused), paddingRight: 42 }}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        <button type="button" onClick={() => setShow(v => !v)}
          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#6b7280", cursor: "pointer", display: "flex", alignItems: "center" }}>
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
            <AlertCircle size={11} color="#f87171" />
            <p style={{ color: "#f87171", fontSize: 11, fontFamily: "'Space Mono',monospace" }}>{error}</p>
          </div>
        )}
      </div>
      {showStrength && value && (
        <div style={{ marginTop: 7 }}>
          <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
            {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 2.5, borderRadius: 2, background: i <= str ? sc[str] : "rgba(255,255,255,0.07)", transition: "all 0.3s" }} />)}
          </div>
          <span style={{ fontSize: 10, color: sc[str], fontFamily: "'Space Mono',monospace" }}>{sl[str]}</span>
        </div>
      )}
    </div>
  );
}

function PrimaryBtn({ children, onClick, loading, disabled, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled || loading} type="button"
      style={{ width: "100%", padding: "14px 24px", borderRadius: 13, fontWeight: 700, fontSize: 13, color: "#fff", border: "none", cursor: disabled || loading ? "not-allowed" : "pointer", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: hov && !disabled ? "0 0 0 1px rgba(99,102,241,0.5) inset, 0 12px 40px rgba(99,102,241,0.45)" : "0 0 0 1px rgba(99,102,241,0.35) inset, 0 8px 28px rgba(99,102,241,0.28)", opacity: disabled ? 0.45 : 1, transform: hov && !disabled ? "translateY(-1px)" : "translateY(0)", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'Space Mono',monospace", ...style }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {loading
        ? <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        : children}
    </button>
  );
}

function GhostBtn({ children, onClick, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} type="button"
      style={{ width: "100%", padding: "13px 24px", borderRadius: 13, fontWeight: 600, fontSize: 13, color: hov ? "#a5b4fc" : "#6b7280", border: `1.5px solid ${hov ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.07)"}`, background: hov ? "rgba(99,102,241,0.06)" : "transparent", cursor: "pointer", transition: "all 0.2s", fontFamily: "'Space Mono',monospace", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, ...style }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  );
}

const Divider = ({ text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.055)" }} />
    <span style={{ fontSize: 11, color: "#374151", fontFamily: "'Space Mono',monospace" }}>{text}</span>
    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.055)" }} />
  </div>
);

function SocialBtn({ Icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button"
      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 14px", borderRadius: 12, border: `1.5px solid ${hov ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.07)"}`, background: hov ? "rgba(99,102,241,0.05)" : "rgba(255,255,255,0.02)", color: hov ? "#c7d2fe" : "#6b7280", fontSize: 12, fontFamily: "'Space Mono',monospace", cursor: "pointer", transition: "all 0.2s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <Icon size={14} /> {label}
    </button>
  );
}

function LinkBtn({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onClick={onClick}
      style={{ background: "none", border: "none", color: hov ? "#a5b4fc" : "#818cf8", cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "'Space Mono',monospace", transition: "color 0.2s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  );
}

const Stepper = ({ current, labels }) => (
  <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
    {labels.map((l, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", flex: i < labels.length - 1 ? 1 : "none" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: i < current ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : i === current ? "rgba(99,102,241,0.14)" : "rgba(255,255,255,0.03)", border: `2px solid ${i <= current ? "#6366f1" : "rgba(255,255,255,0.07)"}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: i === current ? "0 0 0 4px rgba(99,102,241,0.15)" : "none", transition: "all 0.35s" }}>
            {i < current
              ? <Check size={13} color="#fff" />
              : <span style={{ fontSize: 11, color: i === current ? "#a5b4fc" : "#374151", fontWeight: 700, fontFamily: "'Space Mono',monospace" }}>{i + 1}</span>}
          </div>
          <span style={{ fontSize: 9, color: i <= current ? "#818cf8" : "#2d3748", fontFamily: "'Space Mono',monospace", whiteSpace: "nowrap", fontWeight: 600 }}>{l}</span>
        </div>
        {i < labels.length - 1 && (
          <div style={{ flex: 1, height: 2, margin: "0 5px", marginBottom: 16, background: i < current ? "linear-gradient(90deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.06)", borderRadius: 1, transition: "all 0.4s" }} />
        )}
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
function LoginPage({ go }) {
  const [email, setEmail]  = useState("");
  const [pass,  setPass]   = useState("");
  const [errs,  setErrs]   = useState({});
  const [loading, setLoad] = useState(false);
  const [remember, setRem] = useState(false);

  const submit = () => {
    const e = {};
    if (!email.trim() || !email.includes("@")) e.email = "Enter a valid email";
    if (pass.length < 6) e.pass = "Password is too short";
    setErrs(e);
    if (Object.keys(e).length) return;
    setLoad(true);
    setTimeout(() => { setLoad(false); go("dashboard"); }, 1800);
  };

  return (
    <Card>
      <Logo />
      <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 5 }}>Welcome back</h1>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 26, fontFamily: "'Inter',sans-serif" }}>
        Continue your coding quest.{" "}
        <LinkBtn onClick={() => go("register")}>Register →</LinkBtn>
      </p>

      <TextField label="Email" type="email" placeholder="you@email.com" value={email} onChange={setEmail} Icon={Mail} error={errs.email} />
      <PassField label="Password" value={pass} onChange={setPass} error={errs.pass} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input type="checkbox" checked={remember} onChange={e => setRem(e.target.checked)} style={{ accentColor: "#6366f1", width: 14, height: 14 }} />
          <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "'Inter',sans-serif" }}>Remember me</span>
        </label>
        <LinkBtn onClick={() => go("forgot")}>Forgot password?</LinkBtn>
      </div>

      <PrimaryBtn onClick={submit} loading={loading}>
        <Zap size={15} /> Continue Quest <ArrowRight size={15} />
      </PrimaryBtn>

      <Divider text="or continue with" />
      <div style={{ display: "flex", gap: 10 }}>
        <SocialBtn Icon={Github} label="GitHub" />
        <SocialBtn Icon={Chrome} label="Google" />
      </div>

      <div style={{ marginTop: 22, padding: "10px 14px", borderRadius: 10, background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.12)", display: "flex", alignItems: "center", gap: 10 }}>
        <Shield size={14} color="#4ade80" />
        <span style={{ fontSize: 11, color: "#374151", fontFamily: "'Inter',sans-serif" }}>256-bit SSL encrypted · Your data stays private</span>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REGISTER PAGE (4-step)
// ─────────────────────────────────────────────────────────────────────────────
const skillOpts = [
  { l: "Beginner",     Icon: Layers },
  { l: "Intermediate", Icon: Zap },
  { l: "Advanced",     Icon: Flame },
];
const langOpts = ["Python", "C++", "Java", "JavaScript", "Go", "Rust", "TypeScript", "Other"];
const interOpts = [
  { l: "Web Dev",      Icon: Globe },
  { l: "Mobile",       Icon: Smartphone },
  { l: "Competitive",  Icon: Trophy },
  { l: "Data Science", Icon: BarChart2 },
  { l: "AI/ML",        Icon: Cpu },
  { l: "Systems",      Icon: Monitor },
];
const goalOpts = [
  { l: "Crack interviews", Icon: Briefcase },
  { l: "College exams",    Icon: GraduationCap },
  { l: "Build projects",   Icon: Rocket },
  { l: "Problem solving",  Icon: Layers },
  { l: "Job placement",    Icon: Trophy },
];

function Chip({ label, LIcon, selected, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 10, fontSize: 12, fontWeight: 600, border: `1.5px solid ${selected ? "#6366f1" : hov ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.07)"}`, background: selected ? "rgba(99,102,241,0.18)" : hov ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.02)", color: selected ? "#a5b4fc" : hov ? "#9ca3af" : "#6b7280", cursor: "pointer", transition: "all 0.18s", fontFamily: "'Space Mono',monospace" }}>
      {LIcon && <LIcon size={15} />}
      {label}
      {selected && <Check size={15} />}
    </button>
  );
}

function RegisterPage({ go }) {
  const [step, setStep] = useState(0);
  const [errs, setErrs] = useState({});
  const [loading, setLoad] = useState(false);
  const [d, setD] = useState({ name: "", email: "", pass: "", confirm: "", skill: "", coded: "", langs: [], interests: [], goals: [] });
  const upd = (k, v) => setD(p => ({ ...p, [k]: v }));
  const tog = (k, v) => setD(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!d.name.trim())         e.name    = "Name is required";
      if (!d.email.includes("@")) e.email   = "Enter a valid email";
      if (d.pass.length < 8)      e.pass    = "At least 8 characters";
      if (d.pass !== d.confirm)   e.confirm = "Passwords don't match";
    }
    setErrs(e);
    return !Object.keys(e).length;
  };

  const next = () => {
    if (!validate()) return;
    if (step < 3) { setStep(s => s + 1); return; }
    setLoad(true);
    setTimeout(() => { setLoad(false); go("verify-email"); }, 1500);
  };

  const recLang = d.langs.includes("Python") ? "Python" : d.langs.includes("JavaScript") ? "JavaScript" : d.langs.length ? d.langs[0] : "Python";

  return (
    <Card style={{ maxWidth: 480}}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <Logo />
        <button type="button" onClick={() => go("login")}
          style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#4b5563", background: "none", border: "none", cursor: "pointer", fontFamily: "'Space Mono',monospace" }}>
          <X size={12} /> Close
        </button>
      </div>
      <Stepper current={step} labels={["Account", "Skills", "Goals", "Your Path"]} />

      {/* STEP 0 – Account */}
      {step === 0 && (
        <div style={{ animation: "slideIn 0.3s ease both" }}>
          <h2 style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Start Your Quest</h2>
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 22, fontFamily: "'Inter',sans-serif" }}>Create your free account in seconds.</p>
          <TextField label="Full Name" placeholder="Alex Johnson" value={d.name} onChange={v => upd("name", v)} Icon={User} error={errs.name} />
          <TextField label="Email" type="email" placeholder="alex@email.com" value={d.email} onChange={v => upd("email", v)} Icon={Mail} error={errs.email} />
          <PassField label="Password" value={d.pass} onChange={v => upd("pass", v)} error={errs.pass} showStrength />
          <PassField label="Confirm Password" value={d.confirm} onChange={v => upd("confirm", v)} error={errs.confirm} />
        </div>
      )}

      {/* STEP 1 – Skills */}
      {step === 1 && (
        <div style={{ animation: "slideIn 0.3s ease both" }}>
          <h2 style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Tell Us About You</h2>
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 22, fontFamily: "'Inter',sans-serif" }}>We'll tailor your learning path accordingly.</p>

          <FieldLabel>Skill Level</FieldLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 20 }}>
            {skillOpts.map(({ l, Icon: SI }) => (
              <button key={l} type="button" onClick={() => upd("skill", l)}
                style={{ padding: "14px 8px", borderRadius: 12, border: `1.5px solid ${d.skill === l ? "#6366f1" : "rgba(255,255,255,0.07)"}`, background: d.skill === l ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.02)", color: d.skill === l ? "#a5b4fc" : "#6b7280", cursor: "pointer", transition: "all 0.2s", fontFamily: "'Space Mono',monospace", fontSize: 11, fontWeight: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
                <SI size={20} />
                {l}
              </button>
            ))}
          </div>

          <FieldLabel>Coded Before?</FieldLabel>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[["Yes", CheckCircle2, "#22c55e", "rgba(34,197,94,0.1)", "#86efac"], ["No", X, "#ef4444", "rgba(239,68,68,0.08)", "#fca5a5"]].map(([v, VI, border, bg, col]) => (
              <button key={v} type="button" onClick={() => upd("coded", v)}
                style={{ flex: 1, padding: 12, borderRadius: 12, border: `1.5px solid ${d.coded === v ? border : "rgba(255,255,255,0.07)"}`, background: d.coded === v ? bg : "rgba(255,255,255,0.02)", color: d.coded === v ? col : "#6b7280", cursor: "pointer", transition: "all 0.2s", fontFamily: "'Space Mono',monospace", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <VI size={14} /> {v}
              </button>
            ))}
          </div>

          <FieldLabel>Languages You Know</FieldLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 20 }}>
            {langOpts.map(l => <Chip key={l} label={l} selected={d.langs.includes(l)} onClick={() => tog("langs", l)} />)}
          </div>

          <FieldLabel>Interests</FieldLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {interOpts.map(({ l, Icon: II }) => <Chip key={l} label={l} LIcon={II} selected={d.interests.includes(l)} onClick={() => tog("interests", l)} />)}
          </div>
        </div>
      )}

      {/* STEP 2 – Goals */}
      {step === 2 && (
        <div style={{ animation: "slideIn 0.3s ease both" }}>
          <h2 style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>What's Your Goal?</h2>
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 22, fontFamily: "'Inter',sans-serif" }}>Select all that apply — we'll build around them.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {goalOpts.map(({ l, Icon: GI }) => {
              const sel = d.goals.includes(l);
              return (
                <button key={l} type="button" onClick={() => tog("goals", l)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${sel ? "#6366f1" : "rgba(255,255,255,0.07)"}`, background: sel ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.02)", cursor: "pointer", transition: "all 0.2s" }}>
                  <GI size={18} color={sel ? "#818cf8" : "#4b5563"} />
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: sel ? "#e5e7eb" : "#6b7280", fontFamily: "'Inter',sans-serif", textAlign: "left" }}>{l}</span>
                  {sel && <Check size={15} color="#818cf8" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3 – Path Result */}
      {step === 3 && (
        <div style={{ animation: "slideIn 0.3s ease both" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", animation: "popIn 0.5s cubic-bezier(.22,.68,0,1.4) both", boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}>
              <Sparkles size={26} color="#fff" />
            </div>
            <h3 style={{ fontFamily: "'Space Mono',monospace", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 5 }}>Your Path is Ready!</h3>
            <p style={{ fontSize: 12, color: "#6b7280", fontFamily: "'Inter',sans-serif" }}>Personalized just for you.</p>
          </div>
          <div style={{ background: "rgba(99,102,241,0.08)", border: "1.5px solid rgba(99,102,241,0.2)", borderRadius: 14, padding: 16, marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Code2 size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'Space Mono',monospace" }}>Start with {recLang}</div>
                <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "'Inter',sans-serif" }}>
                  {d.skill === "Beginner" ? "Perfect for absolute beginners" : d.skill === "Advanced" ? "Jump to advanced topics" : "Balanced learning path"}
                </div>
              </div>
            </div>
            {[["Week 1–2", "Fundamentals & Syntax"], ["Week 3–4", "Data Structures"], ["Week 5–8", "Algorithms & DSA"], ["Week 9+", "Projects & Interviews"]].map(([w, t]) => (
              <div key={w} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                <ArrowRight size={13} color="#6366f1" />
                <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "'Inter',sans-serif" }}>
                  <span style={{ color: "#a5b4fc", fontWeight: 600 }}>{w}</span> · {t}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {[
              { label: "+200 XP", Icon: Trophy },
              { label: "~12 weeks", Icon: Zap },
              { label: `${d.skill || "Beginner"} track`, Icon: Flame },
            ].map(({ label, Icon: BI }) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#6b7280", fontFamily: "'Space Mono',monospace" }}>
                <BI size={11} /> {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Nav buttons */}
      <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
        {step > 0 && (
          <GhostBtn onClick={() => setStep(s => s - 1)} style={{ flex: "0 0 auto", width: "auto", padding: "13px 20px" }}>
            <ArrowLeft size={14} /> Back
          </GhostBtn>
        )}
        <PrimaryBtn onClick={next} loading={loading} style={{ flex: 1 }}>
          {step === 2 ? <><Sparkles size={15} /> Generate My Path</> : step === 3 ? <><Rocket size={15} /> Start Journey!</> : <>Continue <ArrowRight size={14} /></>}
        </PrimaryBtn>
      </div>

      {step === 0 && (
        <p style={{ textAlign: "center", fontSize: 11, color: "#2d3748", marginTop: 14, fontFamily: "'Inter',sans-serif" }}>
          By signing up you agree to our <a href="#" style={{ color: "#818cf8" }}>Terms</a> & <a href="#" style={{ color: "#818cf8" }}>Privacy</a>
        </p>
      )}
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FORGOT PASSWORD PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ForgotPage({ go }) {
  const [email, setEmail]  = useState("");
  const [error, setError]  = useState("");
  const [loading, setLoad] = useState(false);
  const [sent, setSent]    = useState(false);

  const submit = () => {
    if (!email.includes("@")) { setError("Enter a valid email address"); return; }
    setLoad(true);
    setTimeout(() => { setLoad(false); setSent(true); }, 1600);
  };

  if (sent) return (
    <Card>
      <Logo />
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(99,102,241,0.12)", border: "1.5px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", animation: "popIn 0.5s cubic-bezier(.22,.68,0,1.4) both" }}>
          <MailCheck size={28} color="#818cf8" />
        </div>
        <h2 style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Check your inbox!</h2>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 22, fontFamily: "'Inter',sans-serif", lineHeight: 1.65 }}>
          We sent a reset link to<br /><span style={{ color: "#818cf8", fontFamily: "'Space Mono',monospace" }}>{email}</span>
        </p>
        <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.14)", borderRadius: 12, padding: "13px 16px", marginBottom: 22, textAlign: "left" }}>
          {["Check your spam folder too", "Link expires in 15 minutes", "1 request allowed per hour"].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: i < 2 ? 7 : 0 }}>
              <AlertCircle size={12} color="#6366f1" />
              <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "'Inter',sans-serif" }}>{t}</span>
            </div>
          ))}
        </div>
        <PrimaryBtn onClick={() => go("verify-otp")} style={{ marginBottom: 12 }}>
          <KeyRound size={14} /> Enter OTP code instead
        </PrimaryBtn>
        <button type="button" onClick={() => setSent(false)}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#4b5563", fontSize: 12, cursor: "pointer", fontFamily: "'Space Mono',monospace", margin: "0 auto" }}>
          <RefreshCw size={12} /> Resend email
        </button>
      </div>
      <Divider text="" />
      <div style={{ textAlign: "center" }}>
        <LinkBtn onClick={() => go("login")}><ArrowLeft size={11} style={{ display: "inline" }} /> Back to login</LinkBtn>
      </div>
    </Card>
  );

  return (
    <Card>
      <Logo />
      <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 5 }}>Forgot Password?</h1>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 26, fontFamily: "'Inter',sans-serif" }}>No worries — we'll send you a reset link instantly.</p>
      <TextField label="Email Address" type="email" placeholder="you@email.com" value={email} onChange={v => { setEmail(v); setError(""); }} Icon={Mail} error={error} />
      <div style={{ marginBottom: 20 }} />
      <PrimaryBtn onClick={submit} loading={loading}>
        <Send size={14} /> Send Reset Link
      </PrimaryBtn>
      <Divider text="or" />
      <GhostBtn onClick={() => go("verify-otp")}>
        <Smartphone size={14} /> Use OTP code instead
      </GhostBtn>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <span style={{ fontSize: 12, color: "#4b5563", fontFamily: "'Inter',sans-serif" }}>Remembered it? </span>
        <LinkBtn onClick={() => go("login")}>Back to login</LinkBtn>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OTP PAGE  (email-verify | password-reset)
// ─────────────────────────────────────────────────────────────────────────────
function OTPPage({ go, mode }) {
  const [digits, setDigits]   = useState(["","","","","",""]);
  const [loading, setLoad]    = useState(false);
  const [error, setError]     = useState("");
  const [shake, setShake]     = useState(false);
  const [countdown, setCount] = useState(60);
  const refs = useRef([]);

  useEffect(() => { refs.current[0]?.focus(); }, []);
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const setDigit = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const n = [...digits]; n[i] = v; setDigits(n); setError("");
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  const onKey = (i, e) => { if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus(); };
  const onPaste = (e) => {
    const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (t.length === 6) { setDigits(t.split("")); refs.current[5]?.focus(); }
  };

  const verify = () => {
    const code = digits.join("");
    if (code.length < 6) { setError("Enter the complete 6-digit code"); return; }
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
      if (code === "123456") {
        go(mode === "email-verify" ? "dashboard" : "reset-password");
      } else {
        setError("Incorrect code — hint: use 123456");
        setShake(true); setDigits(["","","","","",""]);
        refs.current[0]?.focus();
        setTimeout(() => setShake(false), 450);
      }
    }, 1200);
  };

  const isEmail  = mode === "email-verify";
  const allFilled = digits.every(d => d !== "");

  return (
    <Card>
      <Logo />
      <div style={{ textAlign: "center", marginBottom: 26 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(99,102,241,0.12)", border: "1.5px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", animation: "popIn 0.5s cubic-bezier(.22,.68,0,1.4) both" }}>
          {isEmail ? <Mail size={28} color="#818cf8" /> : <KeyRound size={28} color="#818cf8" />}
        </div>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 7 }}>
          {isEmail ? "Verify Your Email" : "Enter OTP Code"}
        </h1>
        <p style={{ fontSize: 13, color: "#6b7280", fontFamily: "'Inter',sans-serif", lineHeight: 1.6 }}>
          {isEmail ? "We sent a 6-digit code to your email. Check your inbox to continue." : "Enter the 6-digit code sent to your registered email."}
        </p>
      </div>

      {/* OTP digit boxes */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, animation: shake ? "shake 0.4s ease" : "none" }} onPaste={onPaste}>
        {digits.map((d, i) => (
          <input key={i} ref={el => refs.current[i] = el}
            type="text" inputMode="numeric" maxLength={1} value={d}
            onChange={e => setDigit(i, e.target.value)} onKeyDown={e => onKey(i, e)}
            style={{ width: 50, height: 58, textAlign: "center", fontSize: 24, fontWeight: 700, borderRadius: 13, border: `2px solid ${error ? "rgba(239,68,68,0.5)" : d ? "#6366f1" : "rgba(255,255,255,0.1)"}`, background: d ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.02)", color: "#fff", outline: "none", fontFamily: "'Space Mono',monospace", transition: "all 0.2s", boxShadow: d ? "0 0 0 3px rgba(99,102,241,0.18)" : "none", caretColor: "#6366f1" }}
            onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.22)"; }}
            onBlur={e => { e.target.style.boxShadow = d ? "0 0 0 3px rgba(99,102,241,0.18)" : "none"; e.target.style.borderColor = d ? "#6366f1" : "rgba(255,255,255,0.1)"; }}
          />
        ))}
      </div>

      {error && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 14 }}>
          <AlertCircle size={13} color="#f87171" />
          <p style={{ color: "#f87171", fontSize: 12, fontFamily: "'Space Mono',monospace" }}>{error}</p>
        </div>
      )}

      <PrimaryBtn onClick={verify} loading={loading} disabled={!allFilled}>
        {isEmail
          ? <><ShieldCheck size={15} /> Verify &amp; Enter Dashboard</>
          : <><KeyRound size={15} /> Verify &amp; Reset Password</>}
      </PrimaryBtn>

      <div style={{ textAlign: "center", marginTop: 18 }}>
        {countdown > 0
          ? <span style={{ fontSize: 12, color: "#374151", fontFamily: "'Space Mono',monospace" }}>Resend in <span style={{ color: "#818cf8" }}>{countdown}s</span></span>
          : (
            <button type="button" onClick={() => setCount(60)}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#818cf8", background: "none", border: "none", cursor: "pointer", fontFamily: "'Space Mono',monospace" }}>
              <RefreshCw size={12} /> Resend code
            </button>
          )}
      </div>
      <div style={{ textAlign: "center", marginTop: 14 }}>
        <LinkBtn onClick={() => go(isEmail ? "login" : "forgot")}>
          <ArrowLeft size={11} style={{ display: "inline" }} /> {isEmail ? "Back to login" : "Try email link instead"}
        </LinkBtn>
      </div>

      <div style={{ marginTop: 20, padding: "9px 13px", borderRadius: 10, background: "rgba(234,179,8,0.04)", border: "1px solid rgba(234,179,8,0.12)", display: "flex", alignItems: "center", gap: 8 }}>
        <AlertCircle size={13} color="#fbbf24" />
        <span style={{ fontSize: 11, color: "#4b5563", fontFamily: "'Inter',sans-serif" }}>
          Demo: use code <span style={{ color: "#fbbf24", fontFamily: "'Space Mono',monospace", fontWeight: 700 }}>123456</span>
        </span>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESET PASSWORD PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ResetPasswordPage({ go }) {
  const [pass, setPass]    = useState("");
  const [confirm, setConf] = useState("");
  const [errs, setErrs]    = useState({});
  const [loading, setLoad] = useState(false);

  const reqs = [
    { t: "At least 8 characters", ok: pass.length >= 8 },
    { t: "One uppercase letter",   ok: /[A-Z]/.test(pass) },
    { t: "One number or symbol",   ok: /[0-9!@#$%^&*]/.test(pass) },
    { t: "Passwords match",        ok: pass === confirm && !!confirm },
  ];
  const allGood = reqs.every(r => r.ok);

  const submit = () => {
    const e = {};
    if (pass.length < 8)  e.pass    = "Min 8 characters";
    if (pass !== confirm) e.confirm = "Passwords don't match";
    setErrs(e);
    if (Object.keys(e).length) return;
    setLoad(true);
    setTimeout(() => go("password-changed"), 1600);
  };

  return (
    <Card>
      <Logo />
      <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 5 }}>Set New Password</h1>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 26, fontFamily: "'Inter',sans-serif" }}>Choose a strong password for your account.</p>
      <PassField label="New Password" value={pass} onChange={setPass} error={errs.pass} showStrength />
      <PassField label="Confirm Password" value={confirm} onChange={setConf} error={errs.confirm} />

      {pass && (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.055)", borderRadius: 12, padding: "12px 14px", marginBottom: 18 }}>
          {reqs.map(({ t, ok }) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              {ok
                ? <CheckCircle2 size={13} color="#22c55e" />
                : <Circle size={13} color="#374151" />}
              <span style={{ fontSize: 12, color: ok ? "#86efac" : "#6b7280", fontFamily: "'Inter',sans-serif", transition: "color 0.25s" }}>{t}</span>
            </div>
          ))}
        </div>
      )}

      <PrimaryBtn onClick={submit} loading={loading} disabled={!allGood}>
        <Lock size={14} /> Reset Password
      </PrimaryBtn>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <LinkBtn onClick={() => go("login")}>← Back to login</LinkBtn>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PASSWORD CHANGED PAGE
// ─────────────────────────────────────────────────────────────────────────────
function PasswordChangedPage({ go }) {
  return (
    <Card>
      <Logo />
      <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#22c55e,#16a34a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 0 40px rgba(34,197,94,0.35)", animation: "popIn 0.5s cubic-bezier(.22,.68,0,1.4) both" }}>
          <CheckCircle2 size={32} color="#fff" />
        </div>
        <h2 style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Password Changed!</h2>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 26, fontFamily: "'Inter',sans-serif", lineHeight: 1.65 }}>
          Your password has been reset successfully.<br />You can now log in with your new password.
        </p>
        <PrimaryBtn onClick={() => go("login")}>
          <ArrowLeft size={14} /> Back to Login
        </PrimaryBtn>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD PAGE
// ─────────────────────────────────────────────────────────────────────────────
function DashboardPage({ go }) {
  const floaters = [
    { Icon: Trophy,  color: "#f59e0b" },
    { Icon: Zap,     color: "#818cf8" },
    { Icon: Rocket,  color: "#a78bfa" },
    { Icon: Sparkles,color: "#6ee7b7" },
    { Icon: Flame,   color: "#fb923c" },
    { Icon: Code2,   color: "#67e8f9" },
  ];

  return (
    <Card style={{ maxWidth: 460 }}>
      <Logo />
      <div style={{ textAlign: "center", paddingBottom: 8 }}>
        {/* Floating icons animation */}
        <div style={{ position: "relative", height: 90, marginBottom: 8, overflow: "visible" }}>
          {floaters.map(({ Icon: FI, color }, i) => (
            <span key={i} style={{ position: "absolute", left: `${6 + i * 15}%`, top: 0, animation: `float ${1.4 + i * 0.28}s ease-in ${i * 0.1}s both`, color }}>
              <FI size={18} />
            </span>
          ))}
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", animation: "pulseRing 2s ease-out infinite, popIn 0.5s cubic-bezier(.22,.68,0,1.4) both", boxShadow: "0 0 30px rgba(99,102,241,0.5)" }}>
            <Zap size={30} color="#fff" />
          </div>
        </div>

        <h2 style={{ fontFamily: "'Space Mono',monospace", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>You're in!</h2>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 26, fontFamily: "'Inter',sans-serif", lineHeight: 1.65 }}>
          Welcome to CodeQuest. Your legendary dev journey starts now.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 26 }}>
          {[
            { Icon: Trophy,  val: "200", label: "XP Earned",  color: "#f59e0b" },
            { Icon: Flame,   val: "0",   label: "Day Streak", color: "#fb923c" },
            { Icon: Rocket,  val: "1",   label: "Quest",      color: "#8b5cf6" },
          ].map(({ Icon: SI, val, label, color }) => (
            <div key={label} style={{ padding: 14, background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.14)", borderRadius: 13 }}>
              <SI size={22} color={color} style={{ marginBottom: 6 }} />
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 20, fontWeight: 700, color: "#a5b4fc" }}>{val}</div>
              <div style={{ fontSize: 10, color: "#4b5563", fontFamily: "'Space Mono',monospace" }}>{label}</div>
            </div>
          ))}
        </div>

        <PrimaryBtn onClick={() => alert("Launching dashboard…")} style={{ marginBottom: 14 }}>
          <Rocket size={15} /> Enter Dashboard
        </PrimaryBtn>
        <button type="button" onClick={() => go("login")}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#4b5563", fontSize: 12, cursor: "pointer", fontFamily: "'Space Mono',monospace" }}>
          <LogOut size={12} /> Sign out
        </button>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT — Natural Auth Flow
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("login");

  const render = () => {
    switch (page) {
      case "login":            return <LoginPage           go={setPage} />;
      case "register":         return <RegisterPage        go={setPage} />;
      case "forgot":           return <ForgotPage          go={setPage} />;
      case "verify-otp":       return <OTPPage             go={setPage} mode="password-reset" />;
      case "verify-email":     return <OTPPage             go={setPage} mode="email-verify" />;
      case "reset-password":   return <ResetPasswordPage   go={setPage} />;
      case "password-changed": return <PasswordChangedPage go={setPage} />;
      case "dashboard":        return <DashboardPage       go={setPage} />;
      default:                 return <LoginPage           go={setPage} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", position: "relative" }}>
      <GlobalStyles />
      <Background />
      <div key={page} style={{ width: "100%", display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
        {render()}
      </div>
    </div>
  );
}
