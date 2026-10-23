import React, { useState } from 'react';
import {
  Award,
  Instagram,
  Star,
  Sparkles,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { Trainer } from '../types';
import { sound } from '../utils/audio';

interface TrainersSectionProps {
  isDark: boolean;
  onBookTrainer: (trainerName: string) => void;
}

const TRAINERS: Trainer[] = [
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    role: 'Strength & Conditioning',
    experience: '8+ Years Experience',
    specialization: 'Velocity-Based Training & Powerlifting Biomechanics',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    certifications: ['CSCS Certified', 'Olympic Weightlifting L2', 'EXOS Performance Specialist'],
    stats: {
      clientsTrained: '450+',
      rating: '4.98',
      specialtyFocus: 'Powerlifting / Heavy Overload',
    },
    social: {
      instagram: 'https://instagram.com/fitforgegym',
    },
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'Fitness & Wellness',
    experience: '6+ Years Experience',
    specialization: 'Metabolic Conditioning, VO2 Optimization & Mobility',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    certifications: ['ACE Certified Master', 'Precision Nutrition L2', 'FRC Mobility Specialist'],
    stats: {
      clientsTrained: '380+',
      rating: '4.99',
      specialtyFocus: 'High-Density Fat Loss & Recovery',
    },
    social: {
      instagram: 'https://instagram.com/fitforgegym',
    },
  },
  {
    id: 'rahul-sen',
    name: 'Rahul Sen',
    role: 'Personal Training',
    experience: '7+ Years Experience',
    specialization: 'Hypertrophy Architecture & Biomechanical Symmetry',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    certifications: ['NASM-CPT Elite', 'Kinetic Chain Specialist', 'NSCA Certified Coach'],
    stats: {
      clientsTrained: '410+',
      rating: '4.97',
      specialtyFocus: 'Body Recomposition & Posture Correction',
    },
    social: {
      instagram: 'https://instagram.com/fitforgegym',
    },
  },
  {
    id: 'ananya-roy',
    name: 'Ananya Roy',
    role: 'Functional Fitness',
    experience: '5+ Years Experience',
    specialization: 'Agility, Rotational Power & Plyometric Acceleration',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    certifications: ['CrossFit L2 Trainer', 'Functional Movement Screen (FMS)', 'Kettlebell Master'],
    stats: {
      clientsTrained: '320+',
      rating: '4.96',
      specialtyFocus: 'Speed, Obstacle & Calisthenics',
    },
    social: {
      instagram: 'https://instagram.com/fitforgegym',
    },
  },
];

export default function TrainersSection({ isDark, onBookTrainer }: TrainersSectionProps) {
  // Store 3D card tilt coordinates per trainer
  const [tilts, setTilts] = useState<{ [id: string]: { rotateX: number; rotateY: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-12deg to 12deg)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilts((prev) => ({
      ...prev,
      [id]: { rotateX, rotateY },
    }));
  };

  const handleMouseLeave = (id: string) => {
    setTilts((prev) => ({
      ...prev,
      [id]: { rotateX: 0, rotateY: 0 },
    }));
  };

  return (
    <section id="trainers" className="relative py-24 sm:py-32 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400">
              WORLD-CLASS COACHES
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-foreground uppercase">
            MEET THE <br />
            <span className="text-amber-500">PERFORMANCE TEAM</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light">
            Olympic-calibrated mentors dedicated to accelerating your physical and mental evolution.
          </p>
        </div>

        {/* 4 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRAINERS.map((trainer) => {
            const tilt = tilts[trainer.id] || { rotateX: 0, rotateY: 0 };

            return (
              <div
                key={trainer.id}
                onMouseMove={(e) => handleMouseMove(e, trainer.id)}
                onMouseLeave={() => handleMouseLeave(trainer.id)}
                onMouseEnter={() => sound.playHover()}
                className="relative group transition-transform duration-200 ease-out"
                style={{
                  perspective: '1000px',
                }}
              >
                <div
                  className={`rounded-3xl border overflow-hidden p-3 transition-all duration-200 ${
                    isDark
                      ? 'bg-[#0E1118]/80 border-white/10 group-hover:border-amber-400/60 shadow-2xl'
                      : 'bg-white/90 border-black/10 group-hover:border-amber-500/60 shadow-xl'
                  }`}
                  style={{
                    transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Trainer Image Frame */}
                  <div className="relative h-72 w-full rounded-2xl overflow-hidden mb-4 bg-zinc-800">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />

                    {/* Gradient cyber wash */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    {/* Floating Nameplate & Role over image */}
                    <div
                      className="absolute bottom-3 left-3 right-3 p-3 rounded-xl border border-white/10 bg-black/75 backdrop-blur-md transition-transform duration-300"
                      style={{
                        transform: 'translateZ(30px)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-black text-lg text-white">
                          {trainer.name}
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{trainer.stats.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs font-tech font-bold text-amber-400 uppercase tracking-wider">
                        {trainer.role}
                      </p>
                    </div>

                    {/* Experience Tag Top Right */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/80 text-zinc-300 border border-white/10 backdrop-blur-md">
                      {trainer.experience}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="px-2 pb-2" style={{ transform: 'translateZ(20px)' }}>
                    {/* Specialization */}
                    <p className="text-xs text-zinc-400 font-body mb-3 min-h-[36px] line-clamp-2">
                      {trainer.specialization}
                    </p>

                    {/* Mini Stats Bar */}
                    <div className="grid grid-cols-2 gap-2 py-2.5 px-3 rounded-xl bg-black/20 border border-white/5 mb-3 text-center">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                          Trained
                        </span>
                        <span className="text-xs font-heading font-bold text-foreground">
                          {trainer.stats.clientsTrained}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                          Status
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400 flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Online
                        </span>
                      </div>
                    </div>

                    {/* Actions: Book 1-on-1 & Instagram */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          sound.playClick();
                          onBookTrainer(trainer.name);
                        }}
                        className="flex-1 py-2.5 px-3 rounded-xl font-tech font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-black" />
                        <span>Book Coach</span>
                      </button>

                      <a
                        href={trainer.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="p-2.5 rounded-xl border border-white/10 hover:border-amber-400/40 text-zinc-400 hover:text-amber-400 transition-colors"
                        title="View Instagram"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
