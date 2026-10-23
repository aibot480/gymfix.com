import {
  Dumbbell,
  MapPin,
  Phone,
  Mail,
  Instagram,
  MessageCircle,
  ArrowUp,
  ShieldAlert,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { sound } from '../utils/audio';

interface FooterProps {
  isDark: boolean;
  onOpenBooking: () => void;
}

export default function Footer({ isDark, onOpenBooking }: FooterProps) {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative pt-20 pb-12 border-t overflow-hidden ${
        isDark
          ? 'bg-[#06070A] border-white/10 text-zinc-400'
          : 'bg-zinc-100 border-black/10 text-zinc-600'
      }`}
    >
      {/* Background ambient lighting */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[160px] pointer-events-none ${
          isDark ? 'bg-amber-500/10' : 'bg-amber-400/15'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Prototype Showcase Banner */}
        <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                PROTOTYPE SHOWCASE • WEBNEXSTUDIO
              </span>
              <p className="text-xs text-zinc-300">
                Crafted as a next-generation 3D fitness web experience for high-performance fitness studios.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onOpenBooking();
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-black font-tech font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors"
            >
              Request Custom Build
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand & Tagline (Col 1-4) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Dumbbell className="w-5 h-5 text-black transform -rotate-45" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-wider uppercase text-foreground">
                  Fit<span className="text-amber-500">Forge</span>
                </span>
                <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  FITNESS STUDIO
                </p>
              </div>
            </div>

            <p className="text-lg font-heading font-black tracking-tight text-foreground uppercase mb-3">
              Train Hard. Live Strong.
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6 max-w-sm">
              Kolkata's premier 3D performance laboratory combining velocity-based training, aerospace biomechanics, and physiological optimization.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/fitforgegym"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-2.5 rounded-xl border border-white/10 hover:border-amber-400/50 hover:text-amber-400 transition-colors"
                title="Instagram @fitforgegym"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-2.5 rounded-xl border border-white/10 hover:border-emerald-400/50 hover:text-emerald-400 transition-colors"
                title="WhatsApp +91 98765 43210"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="tel:+919876543210"
                onClick={() => sound.playClick()}
                className="p-2.5 rounded-xl border border-white/10 hover:border-amber-400/50 hover:text-amber-400 transition-colors"
                title="Call +91 98765 43210"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@fitforgegym.com"
                onClick={() => sound.playClick()}
                className="p-2.5 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 transition-colors"
                title="Email hello@fitforgegym.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Location & Contact (Col 5-8) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-tech font-bold text-xs uppercase tracking-widest text-foreground">
              Studio Location & Contact
            </h4>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono font-bold text-foreground block">
                  FitForge Performance Lab Kolkata
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  24 Park Street, 2nd Floor, Kolkata, West Bengal 700016, India
                </p>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <div className="text-xs">
                <span className="text-zinc-500 font-mono block">Direct Inquiries:</span>
                <a
                  href="tel:+919876543210"
                  className="font-mono text-foreground hover:text-amber-400 transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="text-xs">
                <span className="text-zinc-500 font-mono block">Instant WhatsApp Concierge:</span>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-foreground hover:text-emerald-400 transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div className="text-xs">
                <span className="text-zinc-500 font-mono block">Official Email:</span>
                <a
                  href="mailto:hello@fitforgegym.com"
                  className="font-mono text-foreground hover:text-amber-400 transition-colors"
                >
                  hello@fitforgegym.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation & Hours (Col 9-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-tech font-bold text-xs uppercase tracking-widest text-foreground">
              Laboratory Hours
            </h4>

            <div className="text-xs space-y-2 font-mono text-zinc-400">
              <div className="flex justify-between pb-1 border-b border-white/5">
                <span>Monday – Friday</span>
                <span className="text-foreground font-bold">05:30 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-white/5">
                <span>Saturday</span>
                <span className="text-foreground font-bold">06:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-white/5">
                <span>Sunday</span>
                <span className="text-foreground font-bold">07:00 AM – 08:00 PM</span>
              </div>
              <div className="pt-2 text-[10px] text-amber-400">
                * Elite Titanium Members receive 24/7 keycard entry.
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="w-full py-2.5 px-4 rounded-xl border border-white/10 hover:border-amber-400 text-xs font-mono text-zinc-300 hover:text-amber-400 flex items-center justify-center gap-2 transition-all"
              >
                <span>Back To Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} FitForge Fitness Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Prototype Designed by</span>
            <span className="font-bold text-amber-500">WebNexStudio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
