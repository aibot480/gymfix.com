import { useState } from 'react';
import { Award, Users, Calendar, Clock, Gauge, TrendingUp, Sliders } from 'lucide-react';
import { sound } from '../utils/audio';

interface PerformanceDataProps {
  isDark: boolean;
}

export default function PerformanceData({ isDark }: PerformanceDataProps) {
  // Circular progress metrics with interactive level adjuster
  const [levelBoost, setLevelBoost] = useState<number>(0);

  const metrics = [
    {
      id: 'strength',
      title: 'STRENGTH',
      baseVal: 98,
      unit: '%',
      tagline: 'Peak Neuromuscular Drive',
      color: '#F59E0B',
      detail: 'Biomechanical peak recruitment and force production index',
    },
    {
      id: 'endurance',
      title: 'ENDURANCE',
      baseVal: 94,
      unit: '%',
      tagline: 'Mitochondrial Density',
      color: '#06B6D4',
      detail: 'Aerobic threshold and lactate clearance rate optimization',
    },
    {
      id: 'mobility',
      title: 'MOBILITY',
      baseVal: 89,
      unit: '%',
      tagline: 'Dynamic Joint Range',
      color: '#10B981',
      detail: 'Fascial elasticity and kinetic chain injury-prevention rating',
    },
    {
      id: 'performance',
      title: 'PERFORMANCE',
      baseVal: 99,
      unit: '%',
      tagline: 'Metabolic Efficiency',
      color: '#EC4899',
      detail: 'Intelligent power-to-weight ratio and recovery kinetics',
    },
  ];

  const statPanels = [
    {
      value: '500+',
      label: 'ACTIVE MEMBERS',
      subtitle: 'Elite athletes & dedicated enthusiasts',
      icon: Users,
      accent: 'border-amber-500/30 text-amber-400',
    },
    {
      value: '10+',
      label: 'EXPERT COACHES',
      subtitle: 'Olympic certified & biomechanics masters',
      icon: Award,
      accent: 'border-cyan-500/30 text-cyan-400',
    },
    {
      value: '50+',
      label: 'WEEKLY SESSIONS',
      subtitle: 'Precision strength, HIIT & mobility labs',
      icon: Calendar,
      accent: 'border-emerald-500/30 text-emerald-400',
    },
    {
      value: '20+',
      label: 'YEARS EXPERIENCE',
      subtitle: 'Pioneering Kolkata high-performance fitness',
      icon: Clock,
      accent: 'border-rose-500/30 text-rose-400',
    },
  ];

  return (
    <section
      id="performance-data"
      className="relative py-24 sm:py-32 w-full overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none ${
          isDark ? 'bg-amber-500/5' : 'bg-amber-400/10'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-4">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400">
              BIO-METRIC TELEMETRY
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-foreground uppercase">
            YOUR PERFORMANCE.{' '}
            <span className="text-amber-500 underline decoration-amber-500/40 decoration-wavy">
              MEASURED.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light">
            Every repetition, heart rate zone, and recovery curve is calibrated for maximal biological adaptation.
          </p>
        </div>

        {/* 4 Floating 3D-Style Dominant Stat Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {statPanels.map((panel, idx) => {
            const Icon = panel.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => sound.playHover()}
                className={`relative group p-8 rounded-2xl border transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1 cursor-default ${
                  isDark
                    ? 'bg-zinc-900/60 border-white/10 hover:border-amber-400/50 hover:bg-zinc-900/90 shadow-2xl shadow-black/60'
                    : 'bg-white/80 border-black/10 hover:border-amber-500/50 hover:bg-white shadow-xl shadow-black/5'
                }`}
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 3D Top Corner Accent */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-2.5 rounded-xl border ${panel.accent} bg-white/5`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 tracking-widest">
                    METRIC // 0{idx + 1}
                  </span>
                </div>

                {/* Dominant Numbers */}
                <div className="text-5xl sm:text-6xl font-heading font-black tracking-tight text-foreground mb-2 group-hover:scale-105 transition-transform origin-left">
                  {panel.value}
                </div>

                {/* Label */}
                <h3 className="font-tech font-bold text-sm tracking-wider uppercase text-amber-500 mb-2">
                  {panel.label}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-zinc-400 font-body leading-relaxed">
                  {panel.subtitle}
                </p>

                {/* Cyber corner marks */}
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-amber-500/30" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-amber-500/30" />
              </div>
            );
          })}
        </div>

        {/* Circular Progress Indicators (Strength, Endurance, Mobility, Performance) */}
        <div
          className={`p-8 sm:p-12 rounded-3xl border ${
            isDark
              ? 'bg-[#0B0D13]/80 border-white/10 shadow-2xl'
              : 'bg-white/90 border-black/10 shadow-xl'
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-amber-400 tracking-widest uppercase font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                FitForge Benchmark Index
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground mt-1">
                Active Athlete Optimization Indicators
              </h3>
            </div>

            {/* Interactive Level Slider */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Sliders className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">
                Program Intensity:
              </span>
              <button
                onClick={() => {
                  sound.playSwitch();
                  setLevelBoost((prev) => (prev === 0 ? 5 : prev === 5 ? -5 : 0));
                }}
                className="px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-400 font-bold hover:bg-amber-500/20 transition-colors"
              >
                {levelBoost === 0
                  ? 'Baseline Standard'
                  : levelBoost > 0
                  ? 'Hyper-Overload (+5%)'
                  : 'Deload & Recovery (-5%)'}
              </button>
            </div>
          </div>

          {/* 4 Circular Indicators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric) => {
              const currentVal = Math.min(Math.max(metric.baseVal + levelBoost, 0), 100);
              const radius = 50;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (currentVal / 100) * circumference;

              return (
                <div
                  key={metric.id}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Circular SVG Gauge */}
                  <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      {/* Background track */}
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke={isDark ? '#1F2937' : '#E2E8F0'}
                        strokeWidth="8"
                      />
                      {/* Animated progress ring */}
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke={metric.color}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-out"
                        style={{
                          filter: `drop-shadow(0 0 6px ${metric.color}66)`,
                        }}
                      />
                    </svg>

                    {/* Central Value */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-heading font-black text-2xl sm:text-3xl text-foreground">
                        {currentVal}
                        <span className="text-sm font-mono text-zinc-400 font-normal">
                          {metric.unit}
                        </span>
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                        SCORE
                      </span>
                    </div>
                  </div>

                  {/* Title & Detail */}
                  <h4 className="font-tech font-bold text-base tracking-wider uppercase text-foreground mb-1">
                    {metric.title}
                  </h4>
                  <p className="text-xs font-mono text-amber-500 font-semibold mb-1">
                    {metric.tagline}
                  </p>
                  <p className="text-xs text-zinc-400 max-w-xs font-light leading-relaxed">
                    {metric.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
