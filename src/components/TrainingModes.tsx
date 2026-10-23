import { useState } from 'react';
import { Dumbbell, Flame, Zap, ArrowRight, Check, Compass } from 'lucide-react';
import { TrainingMode } from '../types';
import { sound } from '../utils/audio';

interface TrainingModesProps {
  isDark: boolean;
  onSelectMode: (modeId: 'build' | 'burn' | 'perform') => void;
}

const MODES: TrainingMode[] = [
  {
    id: 'build',
    title: 'BUILD',
    subtitle: 'Muscle & Strength',
    focus: 'Hypertrophy & Neurological Force Recruitment',
    description:
      'Scientifically designed heavy compound periodization using velocity-loss thresholds. Maximizes mechanical tension and muscle fiber recruitment for dense, functional mass.',
    biometrics: {
      intensity: 95,
      hypertrophy: 98,
      endurance: 65,
      agility: 72,
    },
    schedule: '4 - 5 Days / Week • 60-75 Mins',
    suitableFor: 'Powerlifters, Bodybuilders, Strength Seekers',
    tag: 'STRENGTH ARCHITECTURE',
    accentGradient: 'from-amber-500 via-amber-400 to-yellow-500',
  },
  {
    id: 'burn',
    title: 'BURN',
    subtitle: 'Fitness & Conditioning',
    focus: 'Metabolic Conditioning & VO2 Max Escalation',
    description:
      'High-density kinetic intervals combining curved sprinting, ski ergs, and kettlebell complexes. Drives post-exercise oxygen consumption (EPOC) for 36 hours.',
    biometrics: {
      intensity: 92,
      hypertrophy: 68,
      endurance: 99,
      agility: 88,
    },
    schedule: '3 - 5 Days / Week • 45-60 Mins',
    suitableFor: 'Fat Loss, Endurance Athletes, Functional Stamina',
    tag: 'METABOLIC ENGINE',
    accentGradient: 'from-cyan-500 via-sky-400 to-blue-500',
  },
  {
    id: 'perform',
    title: 'PERFORM',
    subtitle: 'Athletic Performance',
    focus: 'Rate of Force Development & Rotational Power',
    description:
      'Explosive plyometrics, unilateral deceleration training, and kinetic chain integration designed for field athletes, combat sports, and elite physical dominance.',
    biometrics: {
      intensity: 98,
      hypertrophy: 84,
      endurance: 90,
      agility: 99,
    },
    schedule: '4 Days / Week • 60 Mins',
    suitableFor: 'Combat Sports, Field Athletes, Kinetic Mastery',
    tag: 'KINETIC VELOCITY',
    accentGradient: 'from-rose-500 via-orange-400 to-amber-500',
  },
];

export default function TrainingModes({ isDark, onSelectMode }: TrainingModesProps) {
  const [activeMode, setActiveMode] = useState<'build' | 'burn' | 'perform'>('build');

  const currentMode = MODES.find((m) => m.id === activeMode) || MODES[0];

  return (
    <section id="modes" className="relative py-24 sm:py-32 w-full overflow-hidden">
      {/* Background mood glow that changes subtly based on active mode */}
      <div
        className={`absolute inset-0 transition-colors duration-700 pointer-events-none opacity-20 blur-[180px] ${
          activeMode === 'build'
            ? 'bg-amber-500'
            : activeMode === 'burn'
            ? 'bg-cyan-500'
            : 'bg-rose-500'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400">
              PROGRAM BLUEPRINTS
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-foreground uppercase">
            CHOOSE YOUR <br />
            <span className="text-amber-500">TRAINING MODE</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light">
            Select a specialized training system tailored to your biological objectives.
          </p>
        </div>

        {/* 3 Large 3D Cards / Mode Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {MODES.map((mode) => {
            const isSelected = mode.id === activeMode;
            const Icon = mode.id === 'build' ? Dumbbell : mode.id === 'burn' ? Flame : Zap;

            return (
              <div
                key={mode.id}
                onClick={() => {
                  sound.playSwitch();
                  setActiveMode(mode.id);
                }}
                className={`relative rounded-3xl p-8 border cursor-pointer transition-all duration-500 transform ${
                  isSelected
                    ? 'scale-105 -translate-y-4 shadow-2xl z-20'
                    : 'scale-95 opacity-80 hover:opacity-100 hover:-translate-y-1 z-10'
                } ${
                  isDark
                    ? isSelected
                      ? 'bg-[#121622] border-amber-400/60 shadow-amber-500/20'
                      : 'bg-zinc-900/40 border-white/10 hover:border-white/20'
                    : isSelected
                    ? 'bg-white border-amber-500 shadow-xl'
                    : 'bg-white/60 border-black/10 hover:border-black/20'
                }`}
                style={{
                  perspective: '1200px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Active 3D highlight pill */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-lg shadow-amber-500/30'
                        : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border ${
                      isSelected
                        ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                        : 'border-white/10 text-zinc-500'
                    }`}
                  >
                    {mode.tag}
                  </span>
                </div>

                {/* Mode Title & Subtitle */}
                <h3 className="font-heading font-black text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-1">
                  {mode.title}
                </h3>
                <p className="font-tech font-bold text-sm text-amber-500 uppercase tracking-wider mb-4">
                  {mode.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-6">
                  {mode.focus}
                </p>

                {/* Visual Biometrics Sliders */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-zinc-400">Intensity Load</span>
                      <span className="font-bold text-foreground">{mode.biometrics.intensity}%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${mode.biometrics.intensity}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-zinc-400">
                        {mode.id === 'build'
                          ? 'Hypertrophy Rating'
                          : mode.id === 'burn'
                          ? 'Mitochondrial Burn'
                          : 'Kinetic Agility'}
                      </span>
                      <span className="font-bold text-foreground">
                        {mode.id === 'build'
                          ? mode.biometrics.hypertrophy
                          : mode.id === 'burn'
                          ? mode.biometrics.endurance
                          : mode.biometrics.agility}
                        %
                      </span>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            mode.id === 'build'
                              ? mode.biometrics.hypertrophy
                              : mode.id === 'burn'
                              ? mode.biometrics.endurance
                              : mode.biometrics.agility
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Selection state marker */}
                <div className="mt-6 pt-4 flex items-center justify-between text-xs font-mono">
                  <span className={isSelected ? 'text-amber-400 font-bold' : 'text-zinc-500'}>
                    {isSelected ? '● MODE ACTIVE' : '○ CLICK TO VIEW'}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'translate-x-1 text-amber-400' : 'text-zinc-600'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Mode Detailed Breakdown & CTA */}
        <div
          className={`p-8 sm:p-10 rounded-3xl border transition-all duration-300 ${
            isDark
              ? 'bg-[#0E1118]/90 border-white/10 shadow-2xl'
              : 'bg-white/95 border-black/10 shadow-xl'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
                  ACTIVE DOSSIER // {currentMode.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {currentMode.schedule}
                </span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-heading font-black text-foreground mb-3">
                {currentMode.subtitle} Protocol
              </h4>
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-6">
                {currentMode.description}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Optimal For: {currentMode.suitableFor}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-stretch">
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectMode(currentMode.id);
                }}
                className="w-full py-4 px-6 rounded-xl font-tech font-bold text-sm tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>START THIS PROGRAM</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
              <p className="text-center text-[10px] font-mono text-zinc-400 mt-2">
                Includes complimentary body composition & VBT analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
