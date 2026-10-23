# 🏋️ FitForge Fitness Studio | 3D Interactive Performance Lab

> **A cutting-edge 3D interactive fitness studio web application combining real-time WebGL graphics, biometric performance telemetry, 3D equipment CAD models, interactive virtual facility tours, and multi-tier membership modules.**

---

## 🌐 Live Application URL

If you are viewing this repository on GitHub or as source code, **click below to open the live interactive web app in your browser**:

### 🚀 **[👉 Launch Live FitForge Website](https://ais-pre-26rzkt5jmepsb6ehf4d6xs-53312688574.asia-east1.run.app)**

*Secondary Dev Preview:* [https://ais-dev-26rzkt5jmepsb6ehf4d6xs-53312688574.asia-east1.run.app](https://ais-dev-26rzkt5jmepsb6ehf4d6xs-53312688574.asia-east1.run.app)

> **Note for GitHub Visitors:**  
> When viewing a repository on GitHub, GitHub displays this `README.md` file by default as the repository documentation. To interact with the actual 3D gym experience, click the live link above or follow the quick start instructions below to run it locally.

---

## ✨ Key Features & Interactive 3D Architecture

1. **Interactive 3D WebGL Hero Silhouette**:
   - Custom wireframe athlete model with glowing kinetic vertices, pulsating neural nodes, and floating biomechanical HUD rings.
   - Responds dynamically to mouse movement, cursor proximity, and touch gestures in real time.

2. **3D Interactive Equipment Showcase**:
   - High-fidelity 3D models with 360° click-and-drag rotation and pause/resume controls:
     - **Olympic Competition Bench Press Station** (11-gauge box steel, high-density vinyl pad with amber piping, laser-cut J-cups, elevated diamond-plate spotter deck, calibrated bumper plates & chrome collars)
     - **Modular Power Rack System** (laser-cut uprights, pull-up bar, drop safeties)
     - **Calibrated Olympic Competition Barbell** (hard chrome shaft, precision knurling rings, dual 25kg bumper plates, quick-lock collars)
     - **Biomechanical Dumbbell Array** (knurled handles, urethane hex heads)
     - **Cardio Conditioning System** (curved treadmill / air bike frame, flywheel, digital console)
     - **Functional Movement Rig** (monkey bars, TRX suspension anchor rings, gymnastics rings)
   - Real-time engineering specifications, material ratings, and VBT velocity sensor telemetry for each station.

3. **3D Virtual Facility Tour**:
   - Interactive camera orbit across 4 zones:
     - **Strength Zone**: 8 Power cages, Olympic bench press stations, deadlift platforms
     - **Cardio & HIIT Arena**: High-oxygen airflow zone, curved treadmills, air bikes
     - **Functional Rig & Turf**: 25m indoor sprint track, sled turf, gymnastics rings
     - **Recovery & Biohacking Lounge**: Cold plunge baths, infrared sauna, compression boots
   - Zone dimension telemetry (sq ft, climate control, equipment rosters).

4. **Biometric Performance HUD & Telemetry**:
   - 4 live circular telemetry gauges:
     - VBT Bar Velocity (m/s)
     - Target Heart Rate Reserve (bpm)
     - Neuromuscular Readiness (%)
     - Metabolic Conditioning VO2 Max (ml/kg/min)
   - Dynamic Program Intensity switcher: Baseline Standard, Hyper-Overload (+5%), Deload & Recovery (-5%).

5. **3D Floating Membership Capsules**:
   - Monthly and Annual billing toggle with a 20% discount badge.
   - 3 tiered plans: **Ignite Access**, **Titanium Performance** (Featured/Popular), and **Olympic Syndicate**.
   - Direct pass reservation modal with confetti celebration, custom Web Audio synthesis, and direct WhatsApp concierge integration.

6. **Audio & Theme Customization**:
   - Built-in Web Audio API synthesizer for tactile UI clicks, switches, and confirmation chimes (with full mute/unmute control in the navbar).
   - Seamless Dark Mode & Light Mode support.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (TypeScript)
- **Bundler & Dev Server**: Vite 8
- **3D Graphics Engine**: Three.js (r186)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, Web Audio API

---

## 🚀 Quick Start & Local Development

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** (or bun/pnpm/yarn) installed.

### 1. Clone the repository
```bash
git clone https://github.com/pritamsahapodder1/fitforge.git
cd fitforge
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 4. Build for production
```bash
npm run build
```
This bundles the optimized production app into the `dist/` directory.

### 5. Preview production build
```bash
npm run preview
# or
npm start
```

---

## 📁 Project Directory Structure

```
├── index.html                  # HTML5 entry point with SEO & typography
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration with Tailwind CSS v4
├── public/
│   ├── .nojekyll               # Disables Jekyll processing for static hosting
│   └── assets/                 # Static assets
└── src/
    ├── main.tsx                # Application root mounting
    ├── App.tsx                 # Main layout & section orchestration
    ├── index.css               # Global Tailwind CSS and fonts
    ├── types.ts                # TypeScript interfaces (Equipment, Trainer, Plan)
    ├── components/
    │   ├── Navbar.tsx          # Sticky navigation, audio toggle, theme toggle
    │   ├── HeroSection.tsx     # Hero banner, call-to-action & metric HUD
    │   ├── Hero3DCanvas.tsx    # 3D interactive WebGL athlete silhouette
    │   ├── PerformanceData.tsx # Biometrics gauges & intensity controls
    │   ├── EquipmentShowcase3D.tsx # 3D CAD station viewer with 360° rotation
    │   ├── TrainingModes.tsx   # BUILD, BURN, and PERFORM training modes
    │   ├── TrainersSection.tsx # 3D tilt coach roster with bios & credentials
    │   ├── FacilityTour3D.tsx  # 3D virtual floor walkthrough
    │   ├── MembershipSection.tsx # 3D membership capsules with annual toggle
    │   ├── BookingModal.tsx    # Admission pass reservation with WhatsApp sync
    │   ├── Footer.tsx          # Studio location, hours, contact info & map
    │   └── CustomCursor.tsx    # Custom subtle glowing desktop cursor
    └── utils/
        └── audio.ts            # Web Audio API procedural sound synthesizer
```

---

## 📍 FitForge Fitness Studio Contact Info

- **Address**: 24 Park Street, 2nd Floor, Kolkata, West Bengal 700016, India
- **Phone / WhatsApp**: +91 98765 43210
- **Email**: hello@fitforgegym.com
- **Instagram**: [@fitforgegym](https://instagram.com/fitforgegym)
- **Hours**:
  - Monday – Friday: 05:30 AM – 11:00 PM
  - Saturday: 06:00 AM – 10:00 PM
  - Sunday: 07:00 AM – 08:00 PM
  - *24/7 keycard access for Elite Titanium members*

---

© 2026 FitForge Fitness Studio. All rights reserved.
