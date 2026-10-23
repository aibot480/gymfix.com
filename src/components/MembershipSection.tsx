import { useState } from 'react';
import {
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  Crown,
  ArrowRight,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MembershipPlan } from '../types';
import { sound } from '../utils/audio';

interface MembershipSectionProps {
  isDark: boolean;
  onSelectPlan: (planName: string) => void;
}

const PLANS: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'BASIC',
    tier: 'CORE STRENGTH',
    priceMonthly: 999,
    priceAnnualMonthly: 799,
    tagline: 'Essential access for self-directed athletes',
    features: [
      'Full Gym Floor Access',
      'Cardio Area & High-Altitude Lab',
      'Locker & Shower Access',
      'FitForge Mobile App Access',
      'Standard Hydration Bar',
    ],
    exclusiveBonus: '1 Free Biometric Body Scan per quarter',
    accent: 'amber',
  },
  {
    id: 'pro',
    name: 'PRO',
    tier: 'PERFORMANCE ELEVATION',
    priceMonthly: 2499,
    priceAnnualMonthly: 1999,
    tagline: 'Our signature protocol for aggressive physical transformation',
    popular: true,
    features: [
      'Everything in Basic Tier',
      'All Functional Rig & Turf Stations',
      'Unlimited Weekly Performance Classes (50+ options)',
      'Real-time Velocity Based Training (VBT) Sensor Tracking',
      'Infrared Sauna & Contrast Cold Plunge Access',
      'Personalized Monthly Periodization Roadmap',
    ],
    exclusiveBonus: 'Monthly 1-on-1 Biomechanics Form Calibration',
    accent: 'cyan',
  },
  {
    id: 'elite',
    name: 'ELITE TITANIUM',
    tier: 'OLYMPIC ATELIER',
    priceMonthly: 4999,
    priceAnnualMonthly: 3999,
    tagline: 'Unrestricted pinnacle membership with personal coach dedication',
    features: [
      'Everything in PRO Tier',
      'Dedicated Performance Coach & Nutritionist',
      'Weekly Private 1-on-1 Training Lab Sessions',
      'Unlimited Cryotherapy & Normatec Recovery Pods',
      '24/7 VIP Biometric Keycard Access',
      'Valet Parking on 24 Park Street Kolkata',
      'Complimentary Custom FitForge Titanium Apparel Kit',
    ],
    exclusiveBonus: 'Full Metabolic Rate & VO2 Max Laboratory Testing',
    accent: 'rose',
  },
];

export default function MembershipSection({
  isDark,
  onSelectPlan,
}: MembershipSectionProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const handleSelect = (plan: MembershipPlan) => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#06B6D4', '#FFFFFF'],
      });
    } catch {}
    onSelectPlan(`${plan.name} (${isAnnual ? 'Annual' : 'Monthly'})`);
  };

  return (
    <section id="memberships" className="relative py-24 sm:py-32 w-full overflow-hidden">
      {/* Background ambient glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] pointer-events-none ${
          isDark ? 'bg-amber-500/10' : 'bg-amber-400/15'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400">
              MEMBERSHIP EXPERIENCE
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-foreground uppercase">
            3D MEMBERSHIP <br />
            <span className="text-amber-500">CAPSULES</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light">
            No flat cards or boring contracts. Invest in your physical evolution with transparent pricing and zero hidden fees.
          </p>

          {/* Billing Cycle Switch (Monthly vs Annual) */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
            <button
              onClick={() => {
                sound.playSwitch();
                setIsAnnual(false);
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold uppercase transition-all ${
                !isAnnual
                  ? 'bg-white/15 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => {
                sound.playSwitch();
                setIsAnnual(true);
              }}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold uppercase transition-all ${
                isAnnual
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/20 text-black font-extrabold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Futuristic Floating 3D Capsules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const price = isAnnual ? plan.priceAnnualMonthly : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                onMouseEnter={() => sound.playHover()}
                className={`relative group rounded-[32px] p-8 sm:p-10 border transition-all duration-500 flex flex-col justify-between transform hover:-translate-y-3 ${
                  plan.popular
                    ? 'border-amber-400 shadow-2xl shadow-amber-500/20 lg:-translate-y-2'
                    : isDark
                    ? 'border-white/10 hover:border-white/20'
                    : 'border-black/10 hover:border-black/20'
                } ${
                  isDark
                    ? plan.popular
                      ? 'bg-gradient-to-b from-[#181D2A] to-[#0D1017]'
                      : 'bg-[#0E1118]/90'
                    : plan.popular
                    ? 'bg-white'
                    : 'bg-white/90'
                }`}
                style={{
                  perspective: '1200px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-tech font-extrabold text-[11px] uppercase tracking-wider shadow-md shadow-amber-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>MOST POPULAR PROTOCOL</span>
                  </div>
                )}

                <div>
                  {/* Tier & Plan Name */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">
                      {plan.tier}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-800/40">
                      CAPSULE // {plan.name}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-6">
                    {plan.tagline}
                  </p>

                  {/* Price Display */}
                  <div className="p-4 rounded-2xl bg-black/20 border border-white/5 mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-mono text-zinc-400">₹</span>
                      <span className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-foreground">
                        {price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">/month</span>
                    </div>
                    <p className="text-[10px] font-mono text-zinc-500 mt-1">
                      {isAnnual ? 'Billed annually • 2 months complimentary' : 'Billed month-to-month • Cancel anytime'}
                    </p>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-semibold">
                      INCLUDED AMENITIES:
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Exclusive Bonus Box */}
                  <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 mb-8">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Flame className="w-3.5 h-3.5" />
                      Exclusive Advantage:
                    </span>
                    <p className="text-xs text-zinc-300 font-body">
                      {plan.exclusiveBonus}
                    </p>
                  </div>
                </div>

                {/* Capsule Action Button */}
                <button
                  onClick={() => handleSelect(plan)}
                  className={`w-full py-4 px-6 rounded-2xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black shadow-xl shadow-amber-500/25 hover:shadow-amber-400/40'
                      : isDark
                      ? 'bg-white/10 text-white hover:bg-amber-400 hover:text-black'
                      : 'bg-black text-white hover:bg-amber-500 hover:text-black'
                  }`}
                >
                  <span>Forge This Membership</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Studio Guarantee & WhatsApp Assistance */}
        <div className="mt-16 p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-tech font-bold uppercase tracking-wider text-foreground">
                100% Risk-Free 7-Day Performance Guarantee
              </h4>
              <p className="text-xs text-zinc-400">
                If FitForge doesn't transform your training standard in 7 days, receive a complete unconditional refund.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20FitForge,%20I%20have%20questions%20regarding%20membership%20plans"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex-shrink-0 px-5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold hover:bg-emerald-500/20 transition-colors"
          >
            Talk to an Advisor on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
