import { useState, useEffect, useRef } from 'react';

/* ── Scroll-triggered fade-up utility ───────────────────────────────────── */
function useInView(threshold = 0.1) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

function FadeUp({ children, delay = 0 }) {
    const [ref, inView] = useInView(0.1);
    return (
        <div ref={ref} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }}>
            {children}
        </div>
    );
}

/* ── Steps data ─────────────────────────────────────────────────────────── */
const steps = [
    {
        n: 1, icon: '🎯',
        title: 'Choose Your Language',
        desc: 'Pick from Python, JavaScript, Java, C++ or more based on your goals. Our AI helps you decide.',
        color: '#6366f1',
    },
    {
        n: 2, icon: '📖',
        title: 'Learn Interactively',
        desc: 'Bite-sized lessons, video explanations, and hands-on coding exercises. Theory + practice.',
        color: '#06b6d4',
    },
    {
        n: 3, icon: '⚔️',
        title: 'Solve Mini Challenges',
        desc: 'Apply what you learned with progressive coding challenges. Immediate feedback and hints.',
        color: '#8b5cf6',
    },
    {
        n: 4, icon: '🏰',
        title: 'Unlock DSA Problems',
        desc: 'Once you have the fundamentals, dive into arrays, trees, graphs, DP and more.',
        color: '#f59e0b',
    },
    {
        n: 5, icon: '📈',
        title: 'Track Your Growth',
        desc: 'Watch your skills grow in real-time. Celebrate streaks, badges, and level-ups.',
        color: '#10b981',
    },
];

/* ── HowItWorksSection ─────────────────────────────────────────────────── */
export default function HowItWorksSection() {
    return (
        <section
            id="how-it-works"
            style={{
                padding: '100px 32px',
                background: '#0f0f1a',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Subtle top/bottom fade borders */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.3),transparent)',
            }} />
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.3),transparent)',
            }} />

            <div style={{ maxWidth: 1280, margin: '0 auto' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 72 }}>
                    <FadeUp>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '6px 16px', borderRadius: 50,
                            background: 'rgba(99,102,241,0.12)',
                            border: '1px solid rgba(99,102,241,0.25)',
                            color: '#6366f1', fontSize: 12, fontWeight: 600,
                            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
                        }}>
                            🗺️ The Journey
                        </div>
                    </FadeUp>

                    <FadeUp delay={100}>
                        <h2 style={{
                            fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 800,
                            lineHeight: 1.15, marginBottom: 16,
                            background: 'linear-gradient(135deg,#f0f0ff,#8b5cf6)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            How CodeQuest{' '}
                            <span style={{ color: '#06b6d4', WebkitTextFillColor: '#06b6d4' }}>Works</span>
                        </h2>
                    </FadeUp>

                    <FadeUp delay={200}>
                        <p style={{
                            fontSize: '1.05rem', color: '#a0a0c0',
                            maxWidth: 580, lineHeight: 1.7, margin: '0 auto',
                        }}>
                            Five proven steps that transform you from a curious beginner to a confident developer.
                        </p>
                    </FadeUp>
                </div>

                {/* Steps grid */}
                <div style={{ position: 'relative' }}>
                    {/* Connector gradient line */}
                    <div style={{
                        position: 'absolute', top: 50, left: '10%', right: '10%', height: 2,
                        background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)',
                        opacity: 0.25, zIndex: 0, borderRadius: 1,
                    }} />

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5,1fr)',
                        gap: 20,
                        position: 'relative',
                        zIndex: 1,
                    }}>
                        {steps.map((s, i) => (
                            <FadeUp key={i} delay={i * 120}>
                                <StepCard step={s} />
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── Individual step card ───────────────────────────────────────────────── */
function StepCard({ step: s }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                textAlign: 'center', padding: '28px 20px',
                background: '#1a1a2e',
                border: `1px solid ${hovered ? 'rgba(99,102,241,0.35)' : 'rgba(99,102,241,0.12)'}`,
                borderRadius: 24,
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered ? `0 0 40px rgba(99,102,241,0.2)` : 'none',
                transition: 'all 0.3s ease',
                position: 'relative', overflow: 'hidden',
                cursor: 'default',
            }}
        >
            {/* Hover glow overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg,rgba(99,102,241,0.06),transparent)',
                opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
                pointerEvents: 'none',
            }} />

            {/* Icon circle */}
            <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: `linear-gradient(135deg,${s.color}33,transparent)`,
                border: `2px solid ${s.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, margin: '0 auto 16px',
                boxShadow: `0 0 20px ${s.color}44`,
                transition: 'box-shadow 0.3s',
            }}>
                {s.icon}
            </div>

            {/* Step badge */}
            <div style={{
                display: 'inline-block', padding: '2px 8px', borderRadius: 6,
                background: 'rgba(99,102,241,0.15)', color: '#6366f1',
                fontSize: 11, fontWeight: 700, marginBottom: 10,
                letterSpacing: '0.05em',
            }}>
                STEP {s.n}
            </div>

            <h3 style={{
                fontSize: '0.95rem', fontWeight: 700,
                marginBottom: 8, lineHeight: 1.3, color: '#f0f0ff',
            }}>
                {s.title}
            </h3>
            <p style={{ fontSize: 12.5, color: '#a0a0c0', lineHeight: 1.65 }}>
                {s.desc}
            </p>
        </div>
    );
}
