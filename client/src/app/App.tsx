import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { SEO } from './components/SEO';
import { Analytics } from './components/Analytics';

export default function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <SEO />
        <Analytics />

        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Navigation onAuthClick={handleAuthClick} />

          <main>
            <Hero />
            <Features />
            <Services />
            <Testimonials />
            <ContactForm />
          </main>

          <Footer />

          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            mode={authMode}
          />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}