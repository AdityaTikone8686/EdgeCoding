import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import CoursePreviewSection from './components/CoursePreviewSection';
import AboutSection from './components/AboutSection';
import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import CoursePreviewSection from './components/CoursePreviewSection';
import AboutSection from './components/AboutSection';
import DashboardPreview from './components/DashboardPreview';
import AuthSystem from './components/AuthSystem';
import Footer from './components/Footer';

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
        <div className="bg-gray-950 dark:bg-gray-950 text-gray-100 min-h-screen">
          {/* Navigation */}
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />

          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <FeaturesSection />
                    <HowItWorksSection />
                    <CoursePreviewSection />
                    <AboutSection />
                    <DashboardPreview />
                  </>
                }
              />
              <Route path="/login" element={<AuthSystem />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
