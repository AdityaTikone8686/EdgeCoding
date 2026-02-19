import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Menu, X, Sun, Moon, Zap } from 'lucide-react';

const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Courses', href: '#courses' },
    { label: 'About', href: '#about' },
    { label: 'Dashboard', href: '#dashboard' },
];

export default function Navbar({ isDark, toggleTheme, onOpenAuth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-gray-950/80 dark:bg-gray-950/90 backdrop-blur-xl border-b border-white/10 shadow-xl'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.a
                            href="#home"
                            className="flex items-center gap-2 group"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-600/40 group-hover:shadow-brand-500/60 transition-shadow">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">CodeQuest</span>
                        </motion.a>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                aria-label="Toggle theme"
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>

                            {/* Auth Buttons */}
                            <div className="hidden md:flex items-center gap-2">
                                <button
                                    onClick={() => onOpenAuth('login')}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    Login
                                </button>
                                <motion.button
                                    onClick={() => onOpenAuth('register')}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-purple-600 shadow-lg shadow-brand-600/30 hover:shadow-brand-500/50 transition-all"
                                >
                                    <Zap className="w-3.5 h-3.5" />
                                    Get Started
                                </motion.button>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white"
                                onClick={() => setMobileOpen(v => !v)}
                            >
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-gray-950/95 backdrop-blur-xl border-b border-white/10 md:hidden"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="border-t border-white/10 mt-2 pt-2 flex flex-col gap-2">
                                <button
                                    onClick={() => { navigate('/AuthSystem'); setMobileOpen(false); }}
                                    className="px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium text-left"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => { onOpenAuth('register'); setMobileOpen(false); }}
                                    className="px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-purple-600 text-center"
                                >
                                    Get Started Free
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
