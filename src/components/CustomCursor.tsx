import { useEffect, useRef, useState } from 'react';

export default function CustomCursor({ isDark = true }: { isDark?: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine hover pointer (disable on touchscreens)
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch && window.innerWidth < 768) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let currentAngle = 0;
    let targetAngle = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], .clickable-3d')
        );
        setIsPointer(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    // Smooth physics loop
    const animate = () => {
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;

      currentX += dx * 0.22;
      currentY += dy * 0.22;

      // Rotate dumbbell dynamically based on velocity
      const velocity = Math.hypot(dx, dy);
      if (velocity > 0.5) {
        targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
      }
      currentAngle += (targetAngle - currentAngle) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${currentAngle}deg) scale(${
          isClicking ? 0.8 : isPointer ? 1.35 : 1
        })`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isClicking, isPointer]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 will-change-transform hidden md:block"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Glow aura */}
      <div
        className={`absolute -inset-2 rounded-full blur-md opacity-70 transition-colors duration-300 ${
          isPointer
            ? 'bg-amber-400'
            : isDark
            ? 'bg-amber-500/40'
            : 'bg-amber-600/30'
        }`}
      />

      {/* Futuristic Mini Dumbbell Cursor */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]"
      >
        {/* Central Bar / Knurled Handle */}
        <rect
          x="10"
          y="15"
          width="14"
          height="4"
          rx="1"
          fill={isDark ? '#F59E0B' : '#D97706'}
        />
        {/* Knurling micro grooves */}
        <line x1="14" y1="15" x2="14" y2="19" stroke="#000" strokeWidth="0.8" opacity="0.4" />
        <line x1="17" y1="15" x2="17" y2="19" stroke="#000" strokeWidth="0.8" opacity="0.4" />
        <line x1="20" y1="15" x2="20" y2="19" stroke="#000" strokeWidth="0.8" opacity="0.4" />

        {/* Left Weight Plates */}
        <rect
          x="7"
          y="10"
          width="3"
          height="14"
          rx="1"
          fill={isPointer ? '#FCD34D' : '#F59E0B'}
        />
        <rect
          x="4"
          y="12"
          width="2.5"
          height="10"
          rx="0.8"
          fill={isDark ? '#78350F' : '#92400E'}
        />

        {/* Right Weight Plates */}
        <rect
          x="24"
          y="10"
          width="3"
          height="14"
          rx="1"
          fill={isPointer ? '#FCD34D' : '#F59E0B'}
        />
        <rect
          x="27.5"
          y="12"
          width="2.5"
          height="10"
          rx="0.8"
          fill={isDark ? '#78350F' : '#92400E'}
        />

        {/* Center glowing indicator node */}
        <circle
          cx="17"
          cy="17"
          r={isPointer ? 2.5 : 1.5}
          fill="#FFFFFF"
          className="transition-all duration-150"
        />
      </svg>

      {/* Trailing click pulse effect */}
      {isClicking && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-amber-400 animate-ping opacity-75" />
      )}
    </div>
  );
}
