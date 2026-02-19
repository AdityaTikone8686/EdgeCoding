import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Star, ChevronRight, Zap } from 'lucide-react';

const courses = [
    {
        id: 'python',
        name: 'Python',
        emoji: '🐍',
        tagline: 'Most Beginner-Friendly',
        color: 'from-blue-500 to-cyan-500',
        border: 'border-blue-500/40',
        glow: 'shadow-blue-500/20',
        levels: ['Beginner', 'Intermediate', 'Advanced', 'DSA'],
        completedLevels: 1,
        hours: '40 hours',
        students: '18K+',
        rating: 4.9,
        tags: ['#1 for Beginners', 'Data Science', 'AI/ML'],
        description: 'Start your coding journey with clear syntax, huge libraries, and endless applications from web to AI.',
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        emoji: '⚡',
        tagline: 'Power the Web',
        color: 'from-yellow-500 to-orange-500',
        border: 'border-yellow-500/40',
        glow: 'shadow-yellow-500/20',
        levels: ['Beginner', 'Intermediate', 'Advanced', 'DSA'],
        completedLevels: 2,
        hours: '50 hours',
        students: '22K+',
        rating: 4.8,
        tags: ['Web Dev', 'Full Stack', 'React'],
        description: 'Build interactive websites and full-stack apps. Runs everywhere — browser, server, mobile.',
    },
    {
        id: 'cpp',
        name: 'C++',
        emoji: '🔥',
        tagline: 'Competitive Champion',
        color: 'from-rose-500 to-pink-500',
        border: 'border-rose-500/40',
        glow: 'shadow-rose-500/20',
        levels: ['Beginner', 'Intermediate', 'Advanced', 'DSA'],
        completedLevels: 0,
        hours: '55 hours',
        students: '14K+',
        rating: 4.9,
        tags: ['Competitive Programming', 'Systems', 'Interview Prep'],
        description: 'The language of champions. Master STL, pointers, and algorithms to dominate competitive programming.',
    },
    {
        id: 'java',
        name: 'Java',
        emoji: '☕',
        tagline: 'Enterprise & Interviews',
        color: 'from-purple-500 to-violet-500',
        border: 'border-purple-500/40',
        glow: 'shadow-purple-500/20',
        levels: ['Beginner', 'Intermediate', 'Advanced', 'DSA'],
        completedLevels: 0,
        hours: '48 hours',
        students: '16K+',
        rating: 4.8,
        tags: ['Android', 'Backend', 'OOP'],
        description: "The language powering Google, Amazon, and millions of Android apps. Essential for FAANG interviews.",
    },
];

function LevelBar({ levels, completedLevels }) {
    return (
        <div className="flex gap-1.5 items-center">
            {levels.map((level, i) => (
                <div key={level} className="flex-1 flex flex-col items-center gap-1">
                    <div
                        className={`h-1.5 w-full rounded-full transition-all ${i < completedLevels ? 'bg-green-400' : 'bg-white/10'
                            }`}
                    />
                    <span className="text-[9px] text-gray-600 font-medium">{level}</span>
                </div>
            ))}
        </div>
    );
}

export default function CoursePreviewSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="courses" className="py-24 px-4 relative" ref={ref}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-orange-500/10 border border-orange-500/30 text-orange-400 mb-4">
                        4 Languages
                    </span>
                    <h2 className="section-title text-white mb-4">
                        Choose Your <span className="gradient-text">First Language</span>
                    </h2>
                    <p className="section-subtitle text-gray-400">
                        Each course is designed from beginner to advanced with integrated DSA modules at the end.
                    </p>
                </motion.div>

                {/* Course Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`group glass rounded-2xl p-5 border ${course.border} hover:shadow-2xl ${course.glow} hover:-translate-y-2 transition-all duration-300 flex flex-col`}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {course.emoji}
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-green-500/15 border border-green-500/30 text-green-400">
                                    🎓 Beginner-Friendly
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-1">{course.name}</h3>
                            <p className="text-xs text-gray-500 font-medium mb-3">{course.tagline}</p>
                            <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{course.description}</p>

                            {/* Skill Level Bar */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-gray-500 font-medium">Skill Progression</span>
                                    <span className="text-xs text-gray-600">{course.completedLevels}/{course.levels.length}</span>
                                </div>
                                <LevelBar levels={course.levels} completedLevels={course.completedLevels} />
                            </div>

                            {/* Meta */}
                            <div className="flex items-center justify-between gap-3 mb-4 text-sm">
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span className="text-xs">{course.hours}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-semibold text-yellow-400">{course.rating}</span>
                                </div>
                                <div className="text-xs text-gray-500">{course.students}</div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {course.tags.map(tag => (
                                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r ${course.color} shadow-lg group-hover:shadow-xl transition-all`}
                            >
                                <Zap className="w-4 h-4" />
                                Start Learning
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
