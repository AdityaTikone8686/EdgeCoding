import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Layers, Users, Award, Lightbulb, Rocket } from 'lucide-react';

const differentiators = [
    {
        icon: Layers,
        title: 'Language → DSA Bridge',
        desc: 'We are the only platform that seamlessly bridges language learning with DSA problem-solving. Learn Python, then immediately apply it to real interview problems.',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Lightbulb,
        title: 'AI Personalization',
        desc: 'Our AI engine analyzes your learning style, highlights weak areas, and adapts the curriculum in real-time. Like a mentor who knows you personally.',
        color: 'from-purple-500 to-violet-500',
    },
    {
        icon: Award,
        title: 'Gamified Progress',
        desc: 'XP, streaks, badges, and leaderboards make learning addictive — in the best way. You\'ll want to code every day.',
        color: 'from-orange-500 to-rose-500',
    },
];

const missions = [
    { icon: Target, text: 'Democratize quality CS education for every student' },
    { icon: Users, text: 'Build a supportive global community of learners' },
    { icon: Rocket, text: 'Bridge the gap between learning and real-world jobs' },
];

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="about" className="py-24 px-4 relative overflow-hidden" ref={ref}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Left: Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-green-500/10 border border-green-500/30 text-green-400 mb-6">
                            Our Mission
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Coding Education,{' '}
                            <span className="gradient-text">Reimagined</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            CodeQuest was built for one reason: too many students struggle with fragmented resources,
                            jumping between YouTube videos, random blogs, and paid courses that don't connect theory to practice.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            We built the platform we wish existed when we were learning to code. One that takes you from
                            <span className="text-white font-medium"> "Hello, World!"</span> to
                            <span className="text-white font-medium"> solving LeetCode Hard problems</span>,
                            with a structured, AI-guided, gamified experience.
                        </p>

                        {/* Mission points */}
                        <div className="space-y-4">
                            {missions.map((m, i) => {
                                const Icon = m.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-4 h-4 text-brand-400" />
                                        </div>
                                        <span className="text-gray-300 text-sm font-medium">{m.text}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right: Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                            {/* Large quote */}
                            <div className="text-8xl text-brand-600/20 font-serif leading-none mb-4">"</div>
                            <p className="text-2xl font-bold text-white leading-relaxed mb-6">
                                We don't just teach syntax. We teach <span className="gradient-text">how to think</span> like a programmer.
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xl">
                                    👨‍💻
                                </div>
                                <div>
                                    <div className="font-semibold text-white">The CodeQuest Team</div>
                                    <div className="text-sm text-gray-500">Founders & Engineers</div>
                                </div>
                            </div>

                            {/* Decoration */}
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-600/10 rounded-full blur-3xl" />
                        </div>

                        {/* Floating stat cards */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -bottom-6 -left-6 glass rounded-xl p-4 border border-white/10 shadow-2xl"
                        >
                            <div className="text-2xl font-black gradient-text">95%</div>
                            <div className="text-xs text-gray-500">Students improve in 30 days</div>
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            className="absolute -top-6 -right-6 glass rounded-xl p-4 border border-white/10 shadow-2xl"
                        >
                            <div className="text-2xl font-black text-green-400">4.9/5</div>
                            <div className="text-xs text-gray-500">Average rating</div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Differentiators */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mb-12"
                >
                    <h3 className="text-2xl font-bold text-white">Why We're Different</h3>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {differentiators.map((d, i) => {
                        const Icon = d.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="glass rounded-2xl p-6 border border-white/10 hover:-translate-y-1 transition-transform duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center mb-4 shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">{d.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
