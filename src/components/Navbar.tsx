import { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Menu,
  X,
  Dumbbell,
  Sparkles,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenBooking: () => void;
}

export default function Navbar({
  isDark,
  onToggleTheme,
  onOpenBooking,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'Data', href: '#performance-data' },
    { label: '3D Equipment', href: '#equipment' },
    { label: 'Modes', href: '#modes' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Facility 3D', href: '#facility' },
    { label: 'Memberships', href: '#memberships' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#08090C]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 py-3'
            : 'bg-white/85 backdrop-blur-xl border-b border-black/10 shadow-lg shadow-black/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#hero"
            onClick={() => sound.playClick()}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <Dumbbell className="w-5 h-5 text-black transform -rotate-45" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl tracking-wider uppercase text-foreground">
                  Fit<span className="text-amber-500">Forge</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium hidden sm:inline-block">
                  LAB 2.0
                </span>
              </div>
              <p className="text-[10px] tracking-widest uppercase font-mono text-zinc-400">
                Fitness Studio • Kolkata
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => sound.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors duration-150 ${
                  isDark
                    ? 'text-zinc-300 hover:text-amber-400 hover:bg-white/5'
                    : 'text-zinc-700 hover:text-amber-600 hover:bg-black/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Controls (Audio, Theme, CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              className={`p-2 rounded-xl text-xs font-mono transition-colors border ${
                isDark
                  ? 'bg-zinc-900/80 border-white/10 text-zinc-300 hover:text-amber-400 hover:border-amber-400/40'
                  : 'bg-zinc-100 border-black/10 text-zinc-700 hover:text-amber-600 hover:border-amber-500/40'
              }`}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              )}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => {
                sound.playSwitch();
                onToggleTheme();
              }}
              title={isDark ? 'Switch to Titanium Light' : 'Switch to Cyber Obsidian'}
              aria-label="Toggle theme mode"
              className={`p-2 rounded-xl text-xs font-mono transition-colors border ${
                isDark
                  ? 'bg-zinc-900/80 border-white/10 text-amber-400 hover:bg-white/10'
                  : 'bg-zinc-100 border-black/10 text-zinc-900 hover:bg-black/10'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* WhatsApp Quick Link */}
            <a
              href="https://wa.me/919876543210?text=Hi%20FitForge,%20I%20would%20like%20to%20know%20more%20about%20the%20studio"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              title="Chat on WhatsApp"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenBooking();
              }}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Trial</span>
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden mt-3 p-4 rounded-2xl border transition-all duration-200 ${
              isDark
                ? 'bg-[#0E1117] border-white/10 shadow-2xl'
                : 'bg-white border-black/10 shadow-xl'
            }`}
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isDark
                      ? 'text-zinc-300 hover:text-amber-400 hover:bg-white/5'
                      : 'text-zinc-800 hover:text-amber-600 hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="tel:+919876543210"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-zinc-400 hover:text-amber-400"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+91 98765 43210)</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
