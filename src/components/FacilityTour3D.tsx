import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Compass,
  MapPin,
  Maximize,
  Thermometer,
  Layers,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { FacilityZone } from '../types';
import { sound } from '../utils/audio';

interface FacilityTourProps {
  isDark: boolean;
  onOpenBooking: () => void;
}

const ZONES: FacilityZone[] = [
  {
    id: 'strength-zone',
    number: '01',
    name: 'STRENGTH ZONE',
    tagline: 'Heavy Iron & Biomechanical Calibrations',
    description:
      'Home to 8 Olympic competition power cages, Olympic competition flat & incline bench press stations, custom calibrated dumbbell rows from 2kg to 60kg, and calibrated Eleiko plates.',
    sqft: '4,500 SQ FT',
    features: [
      '8 Competition Power Racks with integrated VBT sensors',
      'IPF Competition Bench Press stations with elevated spotter decks',
      'Solid hardwood Olympic deadlift platforms with vibration dampers',
      'Full cast-urethane dumbbell spectrum up to 60 KG',
    ],
    equipmentSummary: 'Power Racks, Bench Press, Deadlift Platforms, Olympic Bars',
    climate: '19°C Controlled Oxygen Rich Airflow',
    coordinates: { x: -4, y: 0, z: -3 },
  },
  {
    id: 'cardio-lab',
    number: '02',
    name: 'CARDIO LAB',
    tagline: 'High-Altitude Hypoxic Conditioning',
    description:
      'Engineered with non-motorized curved treadmills, Concept2 RowErgs and SkiErgs, Assault AirBikes, and real-time biometric telemetry displays tracking group heart rate zones.',
    sqft: '3,000 SQ FT',
    features: [
      '12 Curved human-powered sprint treadmills',
      'Concept2 SkiErg and RowErg performance fleet',
      'Wahoo KICKR virtual cycling simulation stations',
      'Ambient altitude oxygen concentration controls',
    ],
    equipmentSummary: 'Curved Runners, SkiErgs, Assault Bikes, Keiser Bikes',
    climate: '18°C HEPA Air Purification',
    coordinates: { x: 4, y: 0.5, z: -2 },
  },
  {
    id: 'functional-area',
    number: '03',
    name: 'FUNCTIONAL AREA',
    tagline: 'Athletic Agility & Kinetic Chain Grid',
    description:
      'A vast continuous turf strip for sled pushes, plyometric jump stations, Bulgarian bags, kettlebells, gymnastic rings, and climbing ropes for athletic readiness.',
    sqft: '3,800 SQ FT',
    features: [
      '30-meter high-density synthetic sprint & sled turf track',
      'Custom ceiling-suspended gymnastic rings & climbing ropes',
      'Full kettlebell arsenal (4kg - 48kg competition spec)',
      'Soft plyometric box towers and slam ball cages',
    ],
    equipmentSummary: 'Sled Turf, Climbing Ropes, Rings, Kettlebells',
    climate: '20°C High Air Exchange Cycle',
    coordinates: { x: 0, y: 0, z: -5 },
  },
  {
    id: 'personal-training',
    number: '04',
    name: 'PERSONAL TRAINING',
    tagline: 'Private Biometric Diagnostics & 1-on-1 Labs',
    description:
      'Secluded high-performance training suites equipped with 3D optical body scanners, force plates, motion capture cameras, and dedicated private racks.',
    sqft: '2,200 SQ FT',
    features: [
      'Private soundproof VIP coaching suites',
      'InBody 770 Body Composition & BIA diagnostic scanner',
      'Dual Vald force plates for countermovement jump telemetry',
      'Customized acoustic and lighting profile presets',
    ],
    equipmentSummary: 'Force Plates, Optical 3D Scanner, Private Cage',
    climate: '20°C Acoustic & Thermal Insulation',
    coordinates: { x: -3.5, y: 0.8, z: 2 },
  },
  {
    id: 'recovery-zone',
    number: '05',
    name: 'RECOVERY ZONE',
    tagline: 'Cryotherapy, Infrared Sauna & Hydrotherapy',
    description:
      'The ultimate physiological reset environment featuring whole-body cryotherapy chambers, cedarwood infrared saunas, contrast plunge pools, and Normatec compression lounges.',
    sqft: '2,500 SQ FT',
    features: [
      'Sub-zero -110°C electric whole-body cryotherapy pod',
      'Full-spectrum infrared cedar sauna with chromotherapy',
      'Cold plunge tubs maintained at constant 6°C',
      'Zero-gravity Normatec pneumatic compression recliners',
    ],
    equipmentSummary: 'Cryo Pod, Infrared Sauna, Cold Plunge, Compression Boots',
    climate: 'Aromatherapy & Calming Negative-Ion Ambience',
    coordinates: { x: 3.5, y: -0.2, z: 2 },
  },
];

export default function FacilityTour3D({ isDark, onOpenBooking }: FacilityTourProps) {
  const [activeZoneId, setActiveZoneId] = useState<string>('strength-zone');
  const canvasRef = useRef<HTMLDivElement>(null);
  const activeZone = ZONES.find((z) => z.id === activeZoneId) || ZONES[0];

  // Camera target coordinates for smooth 3D navigation
  const targetCamPos = useRef(new THREE.Vector3(0, 1.5, 6));
  const currentCamPos = useRef(new THREE.Vector3(0, 1.5, 6));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    container.innerHTML = '';
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark ? 0x08090c : 0xf1f5f9, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 2, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Ambient & Accent Lights
    const ambient = new THREE.AmbientLight(isDark ? 0x1e293b : 0xe2e8f0, 1.5);
    scene.add(ambient);

    const goldLight = new THREE.DirectionalLight(0xf59e0b, 2.5);
    goldLight.position.set(5, 8, 5);
    scene.add(goldLight);

    const cyanLight = new THREE.DirectionalLight(0x06b6d4, 2.0);
    cyanLight.position.set(-5, 4, -4);
    scene.add(cyanLight);

    // Large Futuristic Panoramic Gym Architecture
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0b0e14 : 0xe2e8f0,
      roughness: 0.2,
      metalness: 0.8,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    scene.add(floor);

    // Futuristic floor grid with glowing intersection points
    const grid = new THREE.GridHelper(30, 40, 0xf59e0b, isDark ? 0x1f293d : 0x94a3b8);
    grid.position.y = -0.99;
    scene.add(grid);

    // Pillars / Gym architectural columns with neon strips
    const pillarMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x111827 : 0x334155,
      metalness: 0.8,
    });
    const neonMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const cyanNeon = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });

    const pillarPositions: [number, number][] = [
      [-6, -4],
      [6, -4],
      [-6, 4],
      [6, 4],
      [-6, 0],
      [6, 0],
      [0, -7],
    ];

    pillarPositions.forEach(([px, pz], i) => {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.8, 6, 0.8), pillarMat);
      col.position.set(px, 2, pz);
      scene.add(col);

      // Neon vertical light ribbon
      const ribbon = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 5.8, 0.82),
        i % 2 === 0 ? neonMat : cyanNeon
      );
      ribbon.position.set(px, 2, pz);
      scene.add(ribbon);
    });

    // 3D Visual Indicators for 5 Hotspots inside the scene
    const hotspotMarkers: { id: string; mesh: THREE.Group }[] = [];

    ZONES.forEach((zone) => {
      const g = new THREE.Group();
      g.position.set(zone.coordinates.x, -0.5, zone.coordinates.z);

      // Concentric beacon rings on ground
      const beaconRing = new THREE.Mesh(
        new THREE.RingGeometry(0.4, 0.55, 32),
        new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
        })
      );
      beaconRing.rotation.x = Math.PI / 2;
      g.add(beaconRing);

      // Vertical holographic light beam
      const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.12, 2.5, 16),
        new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          transparent: true,
          opacity: 0.4,
        })
      );
      beam.position.y = 1.25;
      g.add(beam);

      // Floating pulsating radar node
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      node.position.y = 2.4;
      g.add(node);

      scene.add(g);
      hotspotMarkers.push({ id: zone.id, mesh: g });
    });

    // Handle Active Zone camera movement
    const selectedZone = ZONES.find((z) => z.id === activeZoneId) || ZONES[0];
    targetCamPos.current.set(
      selectedZone.coordinates.x * 0.7,
      1.8,
      selectedZone.coordinates.z + 5.5
    );
    targetLookAt.current.set(
      selectedZone.coordinates.x,
      0.5,
      selectedZone.coordinates.z
    );

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth camera lerp
      currentCamPos.current.lerp(targetCamPos.current, 0.045);
      currentLookAt.current.lerp(targetLookAt.current, 0.045);

      camera.position.copy(currentCamPos.current);
      camera.lookAt(currentLookAt.current);

      // Animate hotspot beacons (pulsing scale & rotation)
      hotspotMarkers.forEach((marker) => {
        const isCurrent = marker.id === activeZoneId;
        marker.mesh.rotation.y = elapsed * 0.8;
        const scale = isCurrent ? 1 + Math.sin(elapsed * 4) * 0.15 : 0.85;
        marker.mesh.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeZoneId, isDark]);

  return (
    <section id="facility" className="relative py-24 sm:py-32 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400">
                VIRTUAL 3D IMMERSION
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-foreground uppercase">
              STEP INSIDE <br />
              <span className="text-amber-500">FITFORGE</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Take a 3D tour through our high-performance facility at 24 Park Street, Kolkata. Click any radar hotspot to fly the camera directly to that zone.
          </p>
        </div>

        {/* 5 Clickable Hotspot Selector Tabs (01 Strength, 02 Cardio, 03 Functional, 04 PT, 05 Recovery) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {ZONES.map((zone) => {
            const isActive = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                onClick={() => {
                  sound.playSwitch();
                  setActiveZoneId(zone.id);
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all duration-300 transform ${
                  isActive
                    ? 'bg-amber-500 text-black border-amber-400 shadow-xl shadow-amber-500/25 -translate-y-1'
                    : isDark
                    ? 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:border-amber-400/40 hover:text-white'
                    : 'bg-white/80 border-black/10 text-zinc-600 hover:border-amber-500/40 hover:text-black'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-black' : 'text-amber-500'
                    }`}
                  >
                    {zone.number}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-black animate-ping' : 'bg-zinc-600'
                    }`}
                  />
                </div>
                <div
                  className={`font-tech font-extrabold text-xs sm:text-sm tracking-wider uppercase truncate ${
                    isActive ? 'text-black' : 'text-foreground'
                  }`}
                >
                  {zone.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Panoramic 3D Environment & Active Zone Dossier */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 rounded-3xl border overflow-hidden transition-all duration-300 ${
            isDark
              ? 'bg-[#0B0D13]/85 border-white/10 shadow-2xl'
              : 'bg-white/90 border-black/10 shadow-xl'
          }`}
        >
          {/* Panoramic 3D Viewport with Radar Overlay */}
          <div className="lg:col-span-8 relative h-80 sm:h-96 lg:h-[500px] w-full">
            <div ref={canvasRef} className="w-full h-full" />

            {/* Virtual HUD Overlay */}
            <div className="absolute top-4 left-4 p-3 rounded-xl border border-white/10 bg-black/75 backdrop-blur-md z-10 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
                  ACTIVE CAMERA DRONE
                </span>
                <span className="text-xs font-heading font-black text-amber-400">
                  SECTOR {activeZone.number}: {activeZone.name}
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 p-2.5 rounded-xl border border-white/10 bg-black/70 backdrop-blur-md z-10 flex items-center gap-3 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-1 text-cyan-400">
                <Thermometer className="w-3.5 h-3.5" />
                <span>{activeZone.climate}</span>
              </div>
              <span className="text-zinc-600">|</span>
              <div className="flex items-center gap-1 text-amber-400">
                <Layers className="w-3.5 h-3.5" />
                <span>{activeZone.sqft}</span>
              </div>
            </div>
          </div>

          {/* Zone Technical Dossier & Amenities */}
          <div
            className={`lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">
                  ZONE {activeZone.number} // DOSSIER
                </span>
              </div>
              <h3 className="text-2xl font-heading font-black text-foreground mb-1 uppercase">
                {activeZone.name}
              </h3>
              <p className="text-xs font-tech font-bold text-zinc-400 mb-4">
                {activeZone.tagline}
              </p>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                {activeZone.description}
              </p>

              {/* Zone Highlights List */}
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Sector Highlights:
                </span>
                {activeZone.features.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visit Sector Button */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenBooking();
              }}
              className="w-full py-3.5 px-5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Schedule Studio Tour</span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
