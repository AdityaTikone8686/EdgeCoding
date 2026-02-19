import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Map, Terminal, Brain, Trophy, GitBranch, BarChart3
} from 'lucide-react';

const features = [
    {
        icon: Map,
        title: 'Structured Language Roadmap',
        desc: 'Follow a curated path from syntax basics to advanced concepts. No guesswork — every step is planned for maximum retention.',
        color: 'from-blue-500 to-cyan-500',
        glow: 'shadow-blue-500/20',
        tag: 'Learn',
    },
    {
        icon: Terminal,
        title: 'Interactive Coding Playground',
        desc: 'Write, run, and debug code right in your browser. Real compiler, instant feedback, no setup required.',
        color: 'from-green-500 to-emerald-500',
        glow: 'shadow-green-500/20',
        tag: 'Practice',
    },
    {
        icon: Brain,
        title: 'AI-Powered Mentor & Hints',
        desc: "Stuck? Your AI mentor gives progressive hints — not just the answer, but the thinking process behind it.",
        color: 'from-purple-500 to-violet-500',
        glow: 'shadow-purple-500/20',
        tag: 'AI',
    },
    {
        icon: Trophy,
        title: 'Gamified XP & Level System',
        desc: 'Earn XP for every lesson, streak bonus for daily practice, and unlock achievements as you level up your skills.',
        color: 'from-orange-500 to-amber-500',
        glow: 'shadow-orange-500/20',
        tag: 'Gamified',
    },
    {
        icon: GitBranch,
        title: 'DSA Problem-Solving Platform',
        desc: '500+ handpicked problems organized by topic and difficulty. From arrays to graphs, DP to system design.',
        color: 'from-rose-500 to-pink-500',
        glow: 'shadow-rose-500/20',
        tag: 'DSA',
    },
    {
        icon: BarChart3,
        title: 'Progress Tracking Dashboard',
        desc: 'See your journey at a glance. Skill heatmaps, completion rates, streak calendars, and weak-area analysis.',
        color: 'from-brand-500 to-purple-500',
        glow: 'shadow-brand-500/20',
        tag: 'Analytics',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function FeatureCard({ feature }) {
    const Icon = feature.icon;
    return (
        <motion.div
            variants={cardVariants}
            className={`group glass rounded-2xl p-6 hover:border-white/20 hover:shadow-2xl ${feature.glow}
                  transition-all duration-300 hover:-translate-y-1 relative overflow-hidden cursor-default`}
        >
            {/* Top glow on hover */}
            <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${feature.color} bg-opacity-10 text-white/80 border border-white/10`}>
                    {feature.tag}
                </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                {feature.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
        </motion.div>
    );
}

export default function FeaturesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="features" className="py-24 px-4 relative overflow-hidden" ref={ref}>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-brand-500/10 border border-brand-500/30 text-brand-400 mb-4">
                        Everything You Need
                    </span>
                    <h2 className="section-title text-white mb-4">
                        Built for{' '}
                        <span className="gradient-text">Serious Learners</span>
                    </h2>
                    <p className="section-subtitle text-gray-400">
                        From your first line of code to cracking FAANG interviews — we have every tool you need in one place.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} feature={feature} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
