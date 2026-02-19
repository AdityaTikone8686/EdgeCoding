import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import CoursePreviewSection from './components/CoursePreviewSection';
import AboutSection from './components/AboutSection';
import DashboardPreview from './components/DashboardPreview';
import AuthSystem from './components/AuthSystem';
import Register from './components/Register';  
import Footer from './components/Footer';

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const [authMode, setAuthMode] = useState('login'); 

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="bg-gray-950 dark:bg-gray-950 text-gray-100 min-h-screen">
        <Router>
          {/* Navigation */}
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <HeroSection />
                  <FeaturesSection />
                  <HowItWorksSection />
                  <CoursePreviewSection />
                  <AboutSection />
                  <DashboardPreview />
                </main>
              }
            />

            <Route
              path="/login"
              element={
                <AuthSystem
                  mode={authMode}
                  onSwitchMode={(mode) => setAuthMode(mode)}
                />
              }
            />

            <Route
              path="/register"
              element={<Register />}
            />
          </Routes>

          {/* Footer */}
          <Footer />
        </Router>
      </div>
    </div>
  );
}

