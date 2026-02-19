import { useState, useEffect } from 'react';

/* ── Keyframes injected once ────────────────────────────────────────────── */
const heroStyles = `
  @keyframes heroFloat {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-12px); }
  }
  @keyframes heroFadeUp {
    from { opacity:0; transform:translateY(30px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes heroSlideIn {
    from { opacity:0; transform:translateX(-12px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes heroBlink {
    0%,100% { opacity:1; }
    50%     { opacity:0; }
  }
`;

/* ── Animated IDE Code Block ────────────────────────────────────────────── */
const codeLines = [
    { text: '// Welcome to CodeQuest 🚀', color: '#6a7aaa' },
    { text: 'def learn_to_code():', color: '#06b6d4' },
    { text: '    skills = ["Python","DSA","React"]', color: '#f0f0ff' },
    { text: '    for skill in skills:', color: '#8b5cf6' },
    { text: '        master(skill)', color: '#10b981' },
    { text: '        xp += 100  # Level up! 🎯', color: '#f59e0b' },
    { text: '    return "Dream Job Unlocked" ✨', color: '#ec4899' },
    { text: '', color: '' },
    { text: '# Your journey starts here', color: '#6a7aaa' },
    { text: 'learn_to_code()', color: '#06b6d4' },
];

function AnimatedCodeBlock() {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        const iv = setInterval(() => {
            setVisibleLines(v => {
                if (v < codeLines.length) return v + 1;
                setTimeout(() => setVisibleLines(0), 2200);
                return v;
            });
        }, 360);
        return () => clearInterval(iv);
    }, []);

    return (
        <div style={{
            background: '#0d0d1a',
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.12)',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 13.5,
            lineHeight: '1.8',
        }}>
            {/* Window chrome */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '13px 20px',
                background: 'rgba(255,255,255,0.04)',
                borderBottom: '1px solid rgba(99,102,241,0.12)',
            }}>
                {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                    <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                ))}
                <span style={{ marginLeft: 10, color: '#6060a0', fontSize: 12 }}>
                    main.py — CodeQuest IDE
                </span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                    {['Run ▶', 'Debug 🐛'].map(t => (
                        <span key={t} style={{
                            fontSize: 11, padding: '3px 10px', borderRadius: 6,
                            background: 'rgba(99,102,241,0.2)', color: '#6366f1', cursor: 'pointer',
                        }}>{t}</span>
                    ))}
                </div>
            </div>

            {/* Code body */}
            <div style={{ padding: '22px 26px', minHeight: 260 }}>
                <div style={{ display: 'flex', gap: 18 }}>
                    {/* Line numbers */}
                    <div style={{ color: '#404070', userSelect: 'none', minWidth: 18, textAlign: 'right' }}>
                        {codeLines.slice(0, visibleLines).map((_, i) => (
                            <div key={i} style={{ lineHeight: '1.8' }}>{i + 1}</div>
                        ))}
                    </div>
                    {/* Lines */}
                    <div>
                        {codeLines.slice(0, visibleLines).map((line, i) => (
                            <div key={i} style={{
                                color: line.color,
                                lineHeight: '1.8',
                                animation: 'heroSlideIn 0.3s ease both',
                            }}>
                                {line.text || '\u00A0'}
                                {i === visibleLines - 1 && (
                                    <span style={{
                                        animation: 'heroBlink 1s step-end infinite',
                                        color: '#6366f1',
                                    }}>▌</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Status bar */}
            <div style={{
                padding: '11px 20px',
                background: 'rgba(16,185,129,0.07)',
                borderTop: '1px solid rgba(16,185,129,0.18)',
                display: 'flex', alignItems: 'center', gap: 8,
                color: '#10b981', fontSize: 12,
            }}>
                <span>●</span>
                <span>Output:</span>
                <span style={{ color: '#a0a0c0' }}>Program running...</span>
                <span style={{ marginLeft: 'auto', color: '#6060a0' }}>Python 3.11</span>
            </div>
        </div>
    );
}

/* ── Glow Orb ───────────────────────────────────────────────────────────── */
function FloatingOrb({ size, x, y, color, delay }) {
    return (
        <div style={{
            position: 'absolute', width: size, height: size,
            borderRadius: '50%', left: x, top: y,
            background: color, filter: 'blur(80px)', opacity: 0.32,
            animation: `heroFloat ${4 + delay}s ease-in-out infinite`,
            animationDelay: `${delay}s`, pointerEvents: 'none',
        }} />
    );
}

/* ── Cycling words ──────────────────────────────────────────────────────── */
const WORDS = ['Code', 'Build', 'Solve', 'Ship'];

const STATS = [
    { n: '50K+', l: 'Students' },
    { n: '200+', l: 'Lessons' },
    { n: '500+', l: 'DSA Problems' },
    { n: '4.9★', l: 'Rating' },
];

/* ── HeroSection ────────────────────────────────────────────────────────── */
export default function HeroSection({ onOpenAuth }) {
    const [wordIdx, setWordIdx] = useState(0);
    const [wordVisible, setWordVisible] = useState(true);

    useEffect(() => {
        const t = setInterval(() => {
            setWordVisible(false);
            setTimeout(() => {
                setWordIdx(i => (i + 1) % WORDS.length);
                setWordVisible(true);
            }, 300);
        }, 2200);
        return () => clearInterval(t);
    }, []);

    return (
        <section
            id="home"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '120px 32px 80px',
            }}
        >
            {/* inject keyframes */}
            <style>{heroStyles}</style>

            {/* Dark gradient base */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Grid overlay */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage:
                    'linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),' +
                    'linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)',
                backgroundSize: '60px 60px',
            }} />

            {/* Floating orbs */}
            <FloatingOrb size="500px" x="-8%" y="5%" color="#6366f1" delay={0} />
            <FloatingOrb size="380px" x="58%" y="45%" color="#8b5cf6" delay={1.5} />
            <FloatingOrb size="280px" x="30%" y="65%" color="#06b6d4" delay={0.8} />

            {/* Two-column layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 60,
                alignItems: 'center',
                width: '100%',
                maxWidth: 1280,
                margin: '0 auto',
                position: 'relative',
                zIndex: 1,
            }}>

                {/* ── LEFT ── */}
                <div>
                    {/* Label */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '6px 16px', borderRadius: 50,
                        background: 'rgba(99,102,241,0.12)',
                        border: '1px solid rgba(99,102,241,0.25)',
                        color: '#6366f1', fontSize: 12, fontWeight: 600,
                        letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20,
                        animation: 'heroFadeUp 0.5s ease both',
                    }}>
                         #1 Coding Platform for Students
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                        fontWeight: 900, lineHeight: 1.05, marginBottom: 20,
                        animation: 'heroFadeUp 0.6s ease 0.1s both',
                        color: '#f0f0ff',
                    }}>
                        Learn to{' '}
                        <span style={{
                            display: 'inline-block', minWidth: 160,
                            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            opacity: wordVisible ? 1 : 0,
                            transform: wordVisible ? 'translateY(0)' : 'translateY(-10px)',
                            transition: 'all 0.3s ease',
                        }}>
                            {WORDS[wordIdx]}
                        </span>
                        <br />Like a Pro
                    </h1>

                    {/* Subheading */}
                    <p style={{
                        fontSize: '1.12rem', color: '#a0a0c0', lineHeight: 1.75,
                        marginBottom: 36, maxWidth: 520,
                        animation: 'heroFadeUp 0.6s ease 0.2s both',
                    }}>
                        From <strong style={{ color: '#06b6d4' }}>absolute beginner</strong> to{' '}
                        <strong style={{ color: '#6366f1' }}>advanced developer</strong>. Master programming
                        languages, then crush{' '}
                        <strong style={{ color: '#ec4899' }}>DSA problems</strong> with AI-powered mentorship.
                        Your dream job is one skill away.
                    </p>

                    {/* CTAs */}
                    <div style={{
                        display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48,
                        animation: 'heroFadeUp 0.6s ease 0.3s both',
                    }}>
                        <button
                            onClick={() => onOpenAuth('register')}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '15px 32px', borderRadius: 50, border: 'none',
                                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                                color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                                boxShadow: '0 8px 30px rgba(99,102,241,0.45)',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.55)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.45)'; }}
                        >
                           Get Started Free
                        </button>
                        <a
                            href="#courses"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '15px 32px', borderRadius: 50,
                                border: '1.5px solid rgba(99,102,241,0.3)',
                                color: '#f0f0ff', fontSize: 15, fontWeight: 600,
                                textDecoration: 'none', cursor: 'pointer',
                                transition: 'all 0.3s ease', background: 'transparent',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = '#6366f1'; e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.color = '#f0f0ff'; e.currentTarget.style.background = 'transparent'; }}
                        >
                            ▶ Explore Courses
                        </a>
                    </div>

                    {/* Stats */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20,
                        animation: 'heroFadeUp 0.6s ease 0.4s both',
                    }}>
                        {STATS.map((s, i) => (
                            <div key={i} style={{ textAlign: 'left' }}>
                                <div style={{
                                    fontSize: '1.6rem', fontWeight: 900,
                                    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                }}>{s.n}</div>
                                <div style={{ fontSize: 12, color: '#6060a0', fontWeight: 500 }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT — Code block + floating badges ── */}
                <div style={{ position: 'relative', animation: 'heroFadeUp 0.8s ease 0.3s both' }}>
                    <AnimatedCodeBlock />

                    {/* Achievement badge — top right */}
                    <div style={{
                        position: 'absolute', top: -36, right: -20,
                        background: '#1a1a2e', border: '1px solid rgba(99,102,241,0.2)',
                        borderRadius: 16, padding: '12px 16px',
                        display: 'flex', alignItems: 'center', gap: 10, minWidth: 200,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                        animation: 'heroFloat 4.5s ease-in-out infinite',
                        animationDelay: '0.5s',
                    }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: 'linear-gradient(135deg,#10b981,#06b6d4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                        }}>🏆</div>
                        <div>
                            <div style={{ fontSize: 11, color: '#6060a0' }}>Achievement Unlocked</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>First Loop Written!</div>
                        </div>
                    </div>

                    {/* Streak badge — bottom left */}
                    <div style={{
                        position: 'absolute', bottom: -50, left: -28,
                        background: '#1a1a2e', border: '1px solid rgba(99,102,241,0.2)',
                        borderRadius: 16, padding: '12px 16px',
                        display: 'flex', alignItems: 'center', gap: 10,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                        animation: 'heroFloat 5s ease-in-out infinite',
                        animationDelay: '1s',
                    }}>
                        <span style={{ fontSize: 24 }}>⚡</span>
                        <div>
                            <div style={{ fontSize: 11, color: '#6060a0' }}>Daily Streak</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>7 Days 🔥</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
