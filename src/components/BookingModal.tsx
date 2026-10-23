import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  MessageCircle,
  Dumbbell,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  initialMode?: string;
  initialTrainer?: string;
  initialPlan?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  isDark,
  initialMode = 'build',
  initialTrainer = '',
  initialPlan = '',
}: BookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState(initialMode);
  const [trainer, setTrainer] = useState(initialTrainer);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [slot, setSlot] = useState('07:00 AM - 08:30 AM');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#FFFFFF'],
      });
    } catch {}
    setIsSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello FitForge! I booked a pass.\nName: ${name}\nPhone: ${phone}\nMode: ${mode.toUpperCase()}\nDate: ${date}\nSlot: ${slot}${
      trainer ? `\nCoach: ${trainer}` : ''
    }${initialPlan ? `\nPlan: ${initialPlan}` : ''}`
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => {
          sound.playClick();
          onClose();
        }}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-xl rounded-3xl border p-6 sm:p-8 z-10 transition-all duration-300 shadow-2xl ${
          isDark
            ? 'bg-[#0E1118] border-white/10 text-white'
            : 'bg-white border-black/10 text-zinc-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                FITFORGE LAB ADMISSION
              </span>
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-foreground uppercase tracking-tight mb-2">
              Claim Your Performance Pass
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6 font-light">
              Experience the 3D facility, VBT sensors, and state-of-the-art training floor at 24 Park Street, Kolkata.
            </p>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  Full Athlete Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Pritam Saha"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/20 text-sm focus:outline-none focus:border-amber-400 text-foreground"
                  />
                </div>
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/20 text-sm focus:outline-none focus:border-amber-400 text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="athlete@fitforgegym.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/20 text-sm focus:outline-none focus:border-amber-400 text-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Training Mode & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Training Focus Mode
                  </label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-zinc-900 text-sm focus:outline-none focus:border-amber-400 text-foreground"
                  >
                    <option value="build">BUILD — Muscle & Strength</option>
                    <option value="burn">BURN — Fitness & Conditioning</option>
                    <option value="perform">PERFORM — Athletic Performance</option>
                    <option value="undecided">General Studio Tour & Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Preferred Visit Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/20 text-sm focus:outline-none focus:border-amber-400 text-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    '06:00 AM - 07:30 AM',
                    '07:30 AM - 09:00 AM',
                    '10:00 AM - 11:30 AM',
                    '05:00 PM - 06:30 PM',
                    '06:30 PM - 08:00 PM',
                    '08:00 PM - 09:30 PM',
                  ].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => {
                        sound.playClick();
                        setSlot(s);
                      }}
                      className={`p-2 rounded-lg text-xs font-mono text-center border transition-all ${
                        slot === s
                          ? 'border-amber-400 bg-amber-500/20 text-amber-400 font-bold'
                          : 'border-white/10 bg-black/20 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-4 py-4 px-6 rounded-xl font-tech font-bold text-sm tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Dumbbell className="w-4 h-4 text-black transform -rotate-45" />
                <span>Confirm Studio Admission Pass</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase block mb-1">
              ADMISSION PASS ISSUED // CONFIRMED
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-foreground mb-3 uppercase">
              Welcome to the Lab, {name}
            </h3>

            <p className="text-sm text-zinc-300 max-w-md mx-auto mb-6">
              Your pass has been scheduled for <span className="text-amber-400 font-bold">{date}</span> at{' '}
              <span className="text-amber-400 font-bold">{slot}</span>. Our team at 24 Park Street is primed for your arrival.
            </p>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 max-w-md mx-auto text-left mb-6 text-xs font-mono space-y-1 text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-500">Location:</span>
                <span>24 Park Street, 2nd Floor, Kolkata</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Program Mode:</span>
                <span className="text-amber-400 uppercase">{mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Assigned Coach:</span>
                <span>{trainer || 'Senior Biomechanics Lead'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                  setIsSubmitted(false);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/20 text-zinc-300 hover:text-white text-xs font-mono"
              >
                Close Pass
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
