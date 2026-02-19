import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame, Star, CheckCircle2, Lock, ChevronRight, Zap, Trophy, BookOpen } from 'lucide-react';

function XPBar({ current, max, color }) {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => setWidth((current / max) * 100), 400);
        return () => clearTimeout(t);
    }, [current, max]);

    return (
        <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                className={`h-full rounded-full ${color}`}
                style={{ background: 'linear-gradient(90deg, #6172f3, #a855f7)' }}
            />
        </div>
    );
}

const completedLessons = [
    { title: 'Python Basics — Variables & Types', xp: '+50 XP', time: '2h ago' },
    { title: 'Control Flow & Loops', xp: '+75 XP', time: '1d ago' },
    { title: 'Functions & Scope', xp: '+80 XP', time: '2d ago' },
];

const streak = [
    { day: 'M', done: true },
    { day: 'T', done: true },
    { day: 'W', done: true },
    { day: 'T', done: true },
    { day: 'F', done: true },
    { day: 'S', done: false },
    { day: 'S', done: false },
];

export default function DashboardPreview() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="dashboard" className="py-24 px-4 relative overflow-hidden" ref={ref}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
                        Dashboard Preview
                    </span>
                    <h2 className="section-title text-white mb-4">
                        Your Progress,{' '}
                        <span className="gradient-text">At a Glance</span>
                    </h2>
                    <p className="section-subtitle text-gray-400">
                        Track every XP earned, streak maintained, and lesson completed in your personalized dashboard.
                    </p>
                </motion.div>

                {/* Dashboard Mock UI */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="code-window shadow-2xl shadow-brand-900/50">
                        {/* Window chrome */}
                        <div className="code-window-header justify-between">
                            <div className="flex items-center gap-2">
                                <span className="dot bg-red-500"></span>
                                <span className="dot bg-yellow-500"></span>
                                <span className="dot bg-green-500"></span>
                                <span className="ml-2 text-xs text-gray-500 font-mono">CodeQuest Dashboard</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                <span className="text-xs text-gray-500">Live Preview</span>
                            </div>
                        </div>

                        {/* Dashboard Content */}
                        <div className="p-6">
                            {/* User Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xl shadow-lg">
                                        🧑‍💻
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-sm">Welcome back, Alex! 👋</div>
                                        <div className="text-xs text-gray-500">Python Journey · Level 4 Coder</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/15 border border-orange-500/30">
                                    <Flame className="w-4 h-4 text-orange-400" />
                                    <span className="text-sm font-bold text-orange-400">5 Day Streak!</span>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                {[
                                    { label: 'Total XP', value: '2,450', icon: Zap, color: 'text-brand-400', bg: 'bg-brand-500/10' },
                                    { label: 'Skill Level', value: 'Lv. 4', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                                    { label: 'Lessons Done', value: '23', icon: BookOpen, color: 'text-green-400', bg: 'bg-green-500/10' },
                                    { label: 'Streak Days', value: '5 🔥', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                                ].map((stat) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={stat.label} className={`${stat.bg} border border-white/10 rounded-xl p-3 text-center`}>
                                            <Icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
                                            <div className={`text-lg font-black ${stat.color}`}>{stat.value}</div>
                                            <div className="text-[10px] text-gray-600 font-medium">{stat.label}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* XP Progress */}
                            <div className="glass rounded-xl p-4 mb-4 border border-white/5">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-white">XP to Next Level</span>
                                    <span className="text-xs text-gray-500">2,450 / 3,000 XP</span>
                                </div>
                                <XPBar current={2450} max={3000} />
                                <div className="mt-2 text-[11px] text-gray-600">550 XP until <span className="text-purple-400 font-semibold">Level 5 — DSA Explorer</span> unlocks!</div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* Recent Lessons */}
                                <div className="glass rounded-xl p-4 border border-white/5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                                        <span className="text-sm font-semibold text-white">Completed Lessons</span>
                                    </div>
                                    <div className="space-y-2.5">
                                        {completedLessons.map((l, i) => (
                                            <div key={i} className="flex items-start justify-between gap-2">
                                                <div>
                                                    <div className="text-xs text-gray-300 font-medium leading-tight">{l.title}</div>
                                                    <div className="text-[10px] text-gray-600 mt-0.5">{l.time}</div>
                                                </div>
                                                <span className="text-[10px] text-green-400 font-bold flex-shrink-0 bg-green-500/10 px-1.5 py-0.5 rounded">
                                                    {l.xp}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Next Up + Weekly Streak */}
                                <div className="flex flex-col gap-4">
                                    {/* Next Recommended */}
                                    <div className="glass rounded-xl p-4 border border-brand-500/20">
                                        <div className="text-xs text-gray-500 mb-1 font-medium">🎯 UP NEXT — Recommended</div>
                                        <div className="text-sm font-bold text-white mb-1">Lists, Dictionaries & Sets</div>
                                        <div className="text-[11px] text-gray-500 mb-3">Python Module 4 · +120 XP on completion</div>
                                        <button className="w-full py-2 rounded-lg bg-gradient-to-r from-brand-600 to-purple-600 text-xs font-bold text-white flex items-center justify-center gap-1">
                                            Continue <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>

                                    {/* Weekly Streak */}
                                    <div className="glass rounded-xl p-4 border border-white/5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Flame className="w-4 h-4 text-orange-400" />
                                            <span className="text-xs font-semibold text-white">This Week</span>
                                        </div>
                                        <div className="flex gap-1.5">
                                            {streak.map((d, i) => (
                                                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                                    <div className={`w-full aspect-square rounded-md flex items-center justify-center text-[8px] font-bold ${d.done
                                                            ? 'bg-orange-500/80 text-white shadow shadow-orange-500/30'
                                                            : 'bg-white/5 text-gray-700'
                                                        }`}>
                                                        {d.done ? '🔥' : ''}
                                                    </div>
                                                    <span className="text-[9px] text-gray-600">{d.day}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Locked DSA hint */}
                            <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-purple-500/30 bg-purple-500/5">
                                <Lock className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                <div className="text-sm text-gray-400">
                                    Complete <span className="text-purple-400 font-semibold">Python Advanced</span> to unlock{' '}
                                    <span className="text-white font-semibold">DSA Problem Set</span> 🔓
                                </div>
                                <Trophy className="w-4 h-4 text-yellow-500 ml-auto flex-shrink-0" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
