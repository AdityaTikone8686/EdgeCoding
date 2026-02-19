import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import CoursePreviewSection from './components/CoursePreviewSection';
import AboutSection from './components/AboutSection';
import DashboardPreview from './components/DashboardPreview';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

export default function App() {
    const { isDark, toggleTheme } = useTheme();
    const [authOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('register'); // 'login' | 'register'

    const openAuth = (mode = 'register') => {
        setAuthMode(mode);
        setAuthOpen(true);
    };

    return (
        <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
            <div className="bg-gray-950 dark:bg-gray-950 text-gray-100 min-h-screen">
                {/* Navigation */}
                <Navbar
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                    onOpenAuth={openAuth}
                />

                {/* Main Content */}
                <main>
                    {/* 1. Hero */}
                    <HeroSection onOpenAuth={openAuth} />

                    {/* 2. Features */}
                    <FeaturesSection />

                    {/* 3. How It Works */}
                    <HowItWorksSection />

                    {/* 4. Course Preview */}
                    <CoursePreviewSection />

                    {/* 5. About */}
                    <AboutSection />

                    {/* 6. Dashboard Preview */}
                    <DashboardPreview />
                </main>

                {/* Footer */}
                <Footer />

                {/* Auth Modal (global overlay) */}
                <AuthModal
                    isOpen={authOpen}
                    onClose={() => setAuthOpen(false)}
                    mode={authMode}
                    onSwitchMode={(mode) => setAuthMode(mode)}
                />
            </div>
        </div>
    );
}
