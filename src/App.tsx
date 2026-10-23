import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import PerformanceData from './components/PerformanceData';
import EquipmentShowcase3D from './components/EquipmentShowcase3D';
import TrainingModes from './components/TrainingModes';
import TrainersSection from './components/TrainersSection';
import FacilityTour3D from './components/FacilityTour3D';
import MembershipSection from './components/MembershipSection';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import { MessageCircle, Sparkles, Phone } from 'lucide-react';
import { sound } from './utils/audio';

export default function App() {
  // Theme state persisted in localStorage
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('fitforge_theme');
      return saved !== null ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>('build');
  const [selectedTrainer, setSelectedTrainer] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('fitforge_theme', next ? 'dark' : 'light');
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-[#F8FAFC]', 'text-zinc-900');
      document.body.classList.add('bg-[#08090C]', 'text-[#E2E8F0]');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-[#08090C]', 'text-[#E2E8F0]');
      document.body.classList.add('bg-[#F8FAFC]', 'text-zinc-900');
    }
  }, [isDark]);

  const handleOpenBooking = (mode?: string, trainer?: string, plan?: string) => {
    if (mode) setSelectedMode(mode);
    if (trainer) setSelectedTrainer(trainer);
    if (plan) setSelectedPlan(plan);
    setIsBookingOpen(true);
  };

  return (
    <div className={`min-h-screen relative selection:bg-amber-400 selection:text-black ${isDark ? 'dark' : ''}`}>
      {/* Interactive Dumbbell Cursor Tracker (Desktop) */}
      <CustomCursor isDark={isDark} />

      {/* Navigation Header */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Sections */}
      <main className="relative">
        {/* 1. 3D Hero Experience & Scroll-linked Transformation */}
        <HeroSection
          isDark={isDark}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 2. Performance Data Section (500+ members, 10+ coaches, 50+ sessions, 20+ yrs, Circular Gauges) */}
        <PerformanceData isDark={isDark} />

        {/* 3. 3D Equipment Showcase (Power Rack, Bench Press, Olympic Bar, Dumbbells, Cardio System, Functional Rig) */}
        <EquipmentShowcase3D
          isDark={isDark}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 4. Choose Your Mode (BUILD, BURN, PERFORM) */}
        <TrainingModes
          isDark={isDark}
          onSelectMode={(modeId) => handleOpenBooking(modeId)}
        />

        {/* 5. 3D Trainer Section (Arjun, Priya, Rahul, Ananya with 3D cursor tilt) */}
        <TrainersSection
          isDark={isDark}
          onBookTrainer={(trainerName) => handleOpenBooking(undefined, trainerName)}
        />

        {/* 6. Immersive Facility Section (Panoramic 3D with 5 clickable radar hotspots) */}
        <FacilityTour3D
          isDark={isDark}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 7. Membership Experience (Futuristic 3D Capsules: BASIC ₹999, PRO ₹2499, ELITE ₹4999) */}
        <MembershipSection
          isDark={isDark}
          onSelectPlan={(planName) => handleOpenBooking(undefined, undefined, planName)}
        />
      </main>

      {/* Footer with Business Credentials & WebNexStudio Credit */}
      <Footer
        isDark={isDark}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Booking & Consultation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        isDark={isDark}
        initialMode={selectedMode}
        initialTrainer={selectedTrainer}
        initialPlan={selectedPlan}
      />

      {/* Floating Bottom Quick-Action Bar on Mobile Devices */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 p-2 rounded-2xl bg-[#08090C]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-between gap-2">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-center font-mono text-xs font-bold flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => {
            sound.playClick();
            handleOpenBooking();
          }}
          className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 text-black font-tech text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Book Pass</span>
        </button>

        <a
          href="tel:+919876543210"
          onClick={() => sound.playClick()}
          className="p-2.5 rounded-xl border border-white/10 text-zinc-300 hover:text-white"
          title="Call FitForge"
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
