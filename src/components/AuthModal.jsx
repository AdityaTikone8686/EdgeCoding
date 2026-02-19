import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Eye, EyeOff, ChevronRight, ChevronLeft,
    User, Mail, Lock, Sparkles, CheckCircle2, Zap, Code2
} from 'lucide-react';
import { generateRecommendation } from '../utils/recommendationEngine';

// ─── Step 1: Basic Auth Info ───────────────────────────────────────────────
function StepBasicInfo({ data, onChange }) {
    const [showPass, setShowPass] = useState(false);
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Alex Johnson"
                        value={data.name}
                        onChange={e => onChange('name', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/60 focus:bg-white/8 transition-all"
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="email"
                        placeholder="alex@gmail.com"
                        value={data.email}
                        onChange={e => onChange('email', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/60 transition-all"
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type={showPass ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        value={data.password}
                        onChange={e => onChange('password', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/60 transition-all"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {data.password && (
                    <div className="mt-2 flex gap-1">
                        {[1, 2, 3, 4].map(i => (
                            <div
                                key={i}
                                className={`h-1 flex-1 rounded-full transition-all ${data.password.length >= i * 2
                                        ? i <= 1 ? 'bg-red-500' : i <= 2 ? 'bg-orange-500' : i <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                                        : 'bg-white/10'
                                    }`}
                            />
                        ))}
                        <span className="text-[10px] text-gray-500 ml-1 flex-shrink-0">
                            {data.password.length < 4 ? 'Weak' : data.password.length < 6 ? 'Fair' : data.password.length < 8 ? 'Good' : 'Strong'}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Step 2: Skill Assessment ──────────────────────────────────────────────
const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
const languageOptions = ['Python', 'C++', 'Java', 'JavaScript', 'Go', 'Rust', 'Other'];
const interestOptions = [
    { label: 'Web Development', emoji: '🌐' },
    { label: 'App Development', emoji: '📱' },
    { label: 'Competitive Programming', emoji: '🏆' },
    { label: 'Data Science', emoji: '📊' },
    { label: 'AI/ML', emoji: '🤖' },
];

function ToggleChip({ label, emoji, selected, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${selected
                    ? 'bg-brand-600/30 border-brand-500 text-brand-300'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                }`}
        >
            {emoji && <span>{emoji}</span>}
            {label}
            {selected && <CheckCircle2 className="w-3 h-3 text-brand-400" />}
        </button>
    );
}

function StepSkillAssessment({ data, onChange }) {
    const toggleArr = (field, value) => {
        const arr = data[field] || [];
        onChange(field, arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]);
    };

    return (
        <div className="space-y-5">
            <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Skill Level</label>
                <div className="grid grid-cols-3 gap-2">
                    {skillLevels.map(level => (
                        <button
                            key={level}
                            type="button"
                            onClick={() => onChange('skillLevel', level)}
                            className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${data.skillLevel === level
                                    ? 'bg-brand-600/30 border-brand-500 text-brand-300'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                }`}
                        >
                            {level === 'Beginner' ? '🌱' : level === 'Intermediate' ? '⚡' : '🔥'} {level}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Have you coded before?</label>
                <div className="flex gap-3">
                    {['Yes', 'No'].map(opt => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => onChange('hasCoded', opt)}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${data.hasCoded === opt
                                    ? 'bg-green-600/20 border-green-500 text-green-300'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                }`}
                        >
                            {opt === 'Yes' ? '✅' : '❌'} {opt}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Languages you know</label>
                <div className="flex flex-wrap gap-2">
                    {languageOptions.map(lang => (
                        <ToggleChip
                            key={lang}
                            label={lang}
                            selected={(data.knownLanguages || []).includes(lang)}
                            onClick={() => toggleArr('knownLanguages', lang)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">I'm interested in</label>
                <div className="flex flex-wrap gap-2">
                    {interestOptions.map(opt => (
                        <ToggleChip
                            key={opt.label}
                            label={opt.label}
                            emoji={opt.emoji}
                            selected={(data.interests || []).includes(opt.label)}
                            onClick={() => toggleArr('interests', opt.label)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Step 3: Learning Goals ────────────────────────────────────────────────
const goalOptions = [
    { label: 'Crack coding interviews', emoji: '🏢' },
    { label: 'College exams', emoji: '🎓' },
    { label: 'Build real-world projects', emoji: '🚀' },
    { label: 'Improve problem solving', emoji: '🧩' },
    { label: 'Placement preparation', emoji: '💼' },
];

function StepGoals({ data, onChange }) {
    const toggleGoal = (goal) => {
        const arr = data.goals || [];
        onChange('goals', arr.includes(goal) ? arr.filter(g => g !== goal) : [...arr, goal]);
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-400">Select all that apply — we'll tailor your journey.</p>
            <div className="space-y-2.5">
                {goalOptions.map(opt => {
                    const selected = (data.goals || []).includes(opt.label);
                    return (
                        <button
                            key={opt.label}
                            type="button"
                            onClick={() => toggleGoal(opt.label)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${selected
                                    ? 'bg-brand-600/20 border-brand-500 text-white'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                }`}
                        >
                            <span className="text-xl">{opt.emoji}</span>
                            <span className="text-sm font-medium flex-1">{opt.label}</span>
                            {selected && <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Step 4: Generated Learning Path ──────────────────────────────────────
function StepResult({ recommendation }) {
    if (!recommendation) return null;
    const { recommendedLanguage, reason, learningPath, dsaModules, badge, estimatedWeeks, startingXP } = recommendation;

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-xl shadow-brand-600/30 text-2xl">
                    🎯
                </div>
                <h3 className="text-lg font-black text-white">Your Learning Path is Ready!</h3>
                <p className="text-xs text-gray-500 mt-1">Personalized just for you based on your answers</p>
            </div>

            {/* Recommendation Card */}
            <div className="bg-gradient-to-r from-brand-600/20 to-purple-600/20 border border-brand-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-lg flex-shrink-0">
                        {recommendedLanguage === 'Python' ? '🐍' : recommendedLanguage === 'JavaScript' ? '⚡' : recommendedLanguage === 'C++' ? '🔥' : '☕'}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white">Start with {recommendedLanguage}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{reason}</div>
                    </div>
                </div>
                <div className="mt-3 flex gap-3 text-xs">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                        {badge}
                    </span>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                        ~{estimatedWeeks} weeks
                    </span>
                    <span className="px-2 py-1 bg-brand-500/10 border border-brand-500/20 rounded-lg text-brand-400">
                        +{startingXP} XP Headstart
                    </span>
                </div>
            </div>

            {/* Learning Path */}
            <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Roadmap</div>
                <div className="space-y-2">
                    {learningPath.slice(0, 3).map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-[10px] font-bold text-brand-400 flex-shrink-0">
                                {i + 1}
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-white">{step.topic}</span>
                                <span className="text-gray-600 text-xs"> · Week {step.week}</span>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-3 h-3 text-purple-400" />
                        </div>
                        <span className="text-xs text-purple-400 font-semibold">+{learningPath.length - 3} more stages...</span>
                    </div>
                </div>
            </div>

            {/* DSA Modules */}
            <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Unlocked DSA Modules</div>
                <div className="flex flex-wrap gap-1.5">
                    {dsaModules.slice(0, 5).map(m => (
                        <span key={m} className="text-[10px] px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg">
                            {m}
                        </span>
                    ))}
                    {dsaModules.length > 5 && (
                        <span className="text-[10px] px-2 py-1 text-gray-500">+{dsaModules.length - 5} more</span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Auth Modal Root ───────────────────────────────────────────────────────
const STEPS = ['Account', 'Skills', 'Goals', 'Your Path'];

export default function AuthModal({ isOpen, onClose, mode, onSwitchMode }) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '',
        skillLevel: '', hasCoded: '', knownLanguages: [], interests: [], goals: [],
    });
    const [recommendation, setRecommendation] = useState(null);

    const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleNext = () => {
        if (step === 2) {
            const rec = generateRecommendation({
                skillLevel: formData.skillLevel,
                interests: formData.interests,
                goals: formData.goals,
                knownLanguages: formData.knownLanguages,
            });
            setRecommendation(rec);
        }
        setStep(s => Math.min(s + 1, 3));
    };

    const handleClose = () => {
        setStep(0);
        setFormData({ name: '', email: '', password: '', skillLevel: '', hasCoded: '', knownLanguages: [], interests: [], goals: [] });
        setRecommendation(null);
        onClose();
    };

    const isRegister = mode === 'register';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={handleClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.92, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative w-full max-w-md bg-gray-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Top gradient bar */}
                        <div className="h-1 w-full bg-gradient-to-r from-brand-500 via-purple-500 to-accent-500" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 pt-6 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                                    <Code2 className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-bold text-white">CodeQuest</span>
                            </div>
                            <button
                                onClick={handleClose}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Login / Register Tabs */}
                        <div className="flex mx-6 mb-6 p-1 bg-white/5 rounded-xl">
                            {['login', 'register'].map(m => (
                                <button
                                    key={m}
                                    onClick={() => { onSwitchMode(m); setStep(0); }}
                                    className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${mode === m
                                            ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-lg'
                                            : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        {/* Register: Progress Steps */}
                        {isRegister && (
                            <div className="px-6 mb-6">
                                <div className="flex items-center gap-0">
                                    {STEPS.map((label, i) => (
                                        <div key={label} className="flex items-center flex-1 last:flex-none">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${i < step ? 'bg-brand-600 border-brand-500 text-white' :
                                                        i === step ? 'border-brand-500 text-brand-400 bg-brand-500/20' :
                                                            'border-white/10 text-gray-700 bg-white/5'
                                                    }`}>
                                                    {i < step ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                                                </div>
                                                <span className={`text-[9px] font-medium whitespace-nowrap ${i <= step ? 'text-brand-400' : 'text-gray-700'}`}>
                                                    {label}
                                                </span>
                                            </div>
                                            {i < STEPS.length - 1 && (
                                                <div className={`flex-1 h-0.5 mx-1 mb-3 transition-all ${i < step ? 'bg-brand-500' : 'bg-white/10'}`} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Form Body */}
                        <div className="px-6 pb-6">
                            {!isRegister ? (
                                /* LOGIN FORM */
                                <div className="space-y-4">
                                    <h2 className="text-xl font-black text-white mb-1">Welcome back! 👋</h2>
                                    <p className="text-sm text-gray-400 mb-4">Continue your coding quest.</p>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input type="email" placeholder="you@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/60 transition-all" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/60 transition-all" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                                            <input type="checkbox" className="rounded" /> Remember me
                                        </label>
                                        <button className="text-xs text-brand-400 hover:text-brand-300 transition-colors">Forgot password?</button>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 to-purple-600 shadow-lg shadow-brand-600/30 text-sm flex items-center justify-center gap-2"
                                    >
                                        <Zap className="w-4 h-4" />
                                        Continue Quest →
                                    </motion.button>
                                    <p className="text-center text-xs text-gray-600">
                                        No account?{' '}
                                        <button onClick={() => onSwitchMode('register')} className="text-brand-400 hover:text-brand-300 font-semibold">
                                            Create one free
                                        </button>
                                    </p>
                                </div>
                            ) : (
                                /* REGISTER MULTI-STEP */
                                <div>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={step}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            {step === 0 && (
                                                <div>
                                                    <h2 className="text-xl font-black text-white mb-1">Start Your Quest 🚀</h2>
                                                    <p className="text-sm text-gray-400 mb-5">Create your free account</p>
                                                    <StepBasicInfo data={formData} onChange={updateField} />
                                                </div>
                                            )}
                                            {step === 1 && (
                                                <div>
                                                    <h2 className="text-xl font-black text-white mb-1">Tell Us About You 🧠</h2>
                                                    <p className="text-sm text-gray-400 mb-5">Help us personalize your experience</p>
                                                    <StepSkillAssessment data={formData} onChange={updateField} />
                                                </div>
                                            )}
                                            {step === 2 && (
                                                <div>
                                                    <h2 className="text-xl font-black text-white mb-1">What's Your Goal? 🎯</h2>
                                                    <p className="text-sm text-gray-400 mb-5">We'll build a path around your goals</p>
                                                    <StepGoals data={formData} onChange={updateField} />
                                                </div>
                                            )}
                                            {step === 3 && <StepResult recommendation={recommendation} />}
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Navigation Buttons */}
                                    <div className={`flex gap-3 mt-6 ${step > 0 ? 'justify-between' : 'justify-end'}`}>
                                        {step > 0 && step < 3 && (
                                            <button
                                                onClick={() => setStep(s => s - 1)}
                                                className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
                                            >
                                                <ChevronLeft className="w-4 h-4" /> Back
                                            </button>
                                        )}
                                        {step < 3 ? (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleNext}
                                                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 to-purple-600 text-sm shadow-lg shadow-brand-600/20"
                                            >
                                                {step === 2 ? (
                                                    <><Sparkles className="w-4 h-4" /> Generate My Path</>
                                                ) : (
                                                    <>Continue <ChevronRight className="w-4 h-4" /></>
                                                )}
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleClose}
                                                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 to-purple-600 text-sm shadow-lg"
                                            >
                                                <Zap className="w-4 h-4" /> Start My Journey! 🚀
                                            </motion.button>
                                        )}
                                    </div>

                                    {step === 0 && (
                                        <p className="text-center text-xs text-gray-600 mt-4">
                                            By signing up you agree to our{' '}
                                            <a href="#" className="text-brand-400">Terms</a> &{' '}
                                            <a href="#" className="text-brand-400">Privacy Policy</a>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
