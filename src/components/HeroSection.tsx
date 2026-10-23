import { ArrowRight, ChevronDown, Activity, Zap, Shield, Flame } from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';
import { sound } from '../utils/audio';

interface HeroSectionProps {
  isDark: boolean;
  onOpenBooking: () => void;
}

export default function HeroSection({ isDark, onOpenBooking }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-12 lg:py-0"
    >
      {/* 3D WebGL Athlete & Floating Elements Canvas */}
      <Hero3DCanvas isDark={isDark} />

      {/* Ambient background glow / cyberpunk lighting */}
      <div
        className={`absolute top-1/4 left-1/10 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
          isDark ? 'bg-amber-500/15' : 'bg-amber-400/20'
        }`}
      />
      <div
        className={`absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full blur-[160px] pointer-events-none ${
          isDark ? 'bg-cyan-500/10' : 'bg-cyan-400/15'
        }`}
      />

      {/* Cyber Grid Subtle Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Typography & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-6 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase text-amber-400">
                FITFORGE PERFORMANCE LAB
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6 text-foreground">
              FORGE YOUR <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent font-black tracking-tighter drop-shadow-[0_4px_30px_rgba(245,158,11,0.4)]">
                  STRONGEST
                </span>
                <span
                  className="absolute -inset-1 bg-amber-500/20 blur-xl -z-10 rounded-xl"
                  aria-hidden="true"
                />
              </span>{' '}
              <br />
              SELF.
            </h1>

            {/* Subheading */}
            <p className="font-body text-base sm:text-xl lg:text-2xl text-zinc-400 font-light max-w-xl mb-8 leading-relaxed">
              Where intelligent training meets human performance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              {/* Button 1: START YOUR JOURNEY */}
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenBooking();
                }}
                className="relative group overflow-hidden px-8 py-4 rounded-xl font-tech font-bold text-sm tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-xl shadow-amber-500/25 hover:shadow-amber-400/40 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <span className="relative z-10 font-extrabold">START YOUR JOURNEY</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Button 2: EXPLORE THE GYM */}
              <a
                href="#equipment"
                onClick={() => sound.playClick()}
                className={`px-8 py-4 rounded-xl font-tech font-bold text-sm tracking-wider uppercase transition-all duration-200 border flex items-center justify-center gap-3 ${
                  isDark
                    ? 'border-white/20 bg-white/5 text-zinc-100 hover:bg-white/10 hover:border-amber-400/50 hover:text-amber-400'
                    : 'border-black/15 bg-black/5 text-zinc-900 hover:bg-black/10 hover:border-amber-500/50 hover:text-amber-600'
                }`}
              >
                <span>EXPLORE THE GYM</span>
              </a>
            </div>

            {/* Quick Metrics HUD (Cyberpunk minimalism) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-12 pt-8 border-t border-white/10 w-full max-w-lg">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>BIOMETRICS</span>
                </div>
                <div className="text-xl sm:text-2xl font-tech font-bold text-foreground">
                  100%
                </div>
                <p className="text-[10px] text-zinc-400 font-mono">Sensory Synced</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>OUTPUT</span>
                </div>
                <div className="text-xl sm:text-2xl font-tech font-bold text-foreground">
                  1.4x
                </div>
                <p className="text-[10px] text-zinc-400 font-mono">Power Velocity</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>SAFETY</span>
                </div>
                <div className="text-xl sm:text-2xl font-tech font-bold text-foreground">
                  ISO-10
                </div>
                <p className="text-[10px] text-zinc-400 font-mono">Biomech Guard</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D HUD Indicators (Overlays on 3D scene) */}
          <div className="lg:col-span-5 relative pointer-events-none flex flex-col justify-end items-end h-72 sm:h-96 lg:h-auto">
            {/* Floating Biometric Card (Reacts with mouse) */}
            <div
              className={`hidden sm:block p-4 rounded-2xl border backdrop-blur-xl pointer-events-auto transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-zinc-900/70 border-white/10 text-white shadow-2xl'
                  : 'bg-white/80 border-black/10 text-zinc-900 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[10px] font-mono tracking-wider text-amber-400 font-bold uppercase flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  Athlete Kinetic Telemetry
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                  ACTIVE
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-heading font-extrabold text-foreground">142</span>
                <span className="text-xs font-mono text-zinc-400">BPM TARGET</span>
              </div>
              <div className="w-48 h-1.5 bg-zinc-700/50 rounded-full mt-2 overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full animate-pulse" />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-zinc-400 mt-1">
                <span>Anaerobic Threshold</span>
                <span>Zone 4</span>
              </div>
            </div>

            {/* Small interactive 3D Drag Tip */}
            <div
              className={`mt-4 px-3 py-1.5 rounded-lg border text-[11px] font-mono flex items-center gap-2 pointer-events-auto ${
                isDark ? 'bg-black/60 border-white/10 text-zinc-400' : 'bg-white/60 border-black/10 text-zinc-600'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Interactive 3D: Move mouse / touch to rotate athlete</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center justify-center mt-12 lg:mt-16">
          <a
            href="#performance-data"
            onClick={() => sound.playClick()}
            className="group flex flex-col items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest font-semibold">
              SCROLL TO ENTER ↓
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-zinc-600 group-hover:border-amber-400 flex items-start justify-center p-1.5 transition-colors">
              <div className="w-1.5 h-2.5 rounded-full bg-amber-400 animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
