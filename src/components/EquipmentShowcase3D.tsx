import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Zap,
  CheckCircle2,
  Maximize2,
  Layers,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { EquipmentItem } from '../types';
import { sound } from '../utils/audio';

interface EquipmentShowcaseProps {
  isDark: boolean;
  onOpenBooking: () => void;
}

const EQUIPMENT_DATA: EquipmentItem[] = [
  {
    id: 'power-rack',
    name: 'POWER RACK',
    subtitle: 'Apex Biomechanical Station',
    category: 'Strength Training',
    description:
      'Engineered with 11-gauge 3x3" cold-rolled structural steel, laser-cut pin settings, magnetic J-cups, and integrated velocity-based training sensors.',
    features: [
      'Dual safety strap system with 1,000kg dynamic load rating',
      'Multi-grip chin-up station with knurled ergonomic angles',
      'Integrated linear transducer sensors for bar-speed monitoring',
      'Resistance band pegs and Olympic plate storage wings',
    ],
    specs: {
      material: '11-Gauge Structural Steel',
      loadCapacity: '1,200 KG',
      footprint: '145cm × 138cm × 235cm',
      sensorTelemetry: 'Real-time VBT Bluetooth 5.2',
    },
    highlightStat: '1,200 KG',
    statLabel: 'DYNAMIC TEST CAPACITY',
  },
  {
    id: 'bench-press',
    name: 'BENCH PRESS',
    subtitle: 'Olympic Competition Flat Bench Station',
    category: 'Strength Training',
    description:
      'Engineered to IPF competition standards with heavy-gauge 3x3" cold-rolled structural steel, high-density antimicrobial grip vinyl, multi-level J-cups, and an elevated diamond-plate spotter deck.',
    features: [
      'Competition-spec 45cm bench height & 30cm firm high-friction pad',
      'Dual-tier laser-cut J-cups with replaceable UHMW bar liners',
      'Non-slip diamond plate elevated spotter platform for athlete safety',
      'Dual reinforced drop safeties with magnetic lock adjustment',
      'Integrated rear plate storage horns and band peg attachments',
    ],
    specs: {
      material: '11-Gauge Box Section Steel & High-Density Vinyl',
      loadCapacity: '850 KG Dynamic Rating',
      footprint: '172cm × 126cm × 132cm',
      sensorTelemetry: 'Embedded Bar Velocity & Touchpoint Telemetry',
    },
    highlightStat: '850 KG',
    statLabel: 'DYNAMIC BENCH CAPACITY',
  },
  {
    id: 'olympic-bar',
    name: 'OLYMPIC BAR',
    subtitle: 'Calibrated Competition Barbell',
    category: 'Performance Training',
    description:
      'Crafted from 216,000 PSI tensile strength Swedish alloy with dual needle-bearing sleeves for friction-free whip and zero rotational drag.',
    features: [
      'Precision volcanic knurling pattern with dual grip markings',
      'Hard chrome shaft with electroless nickel-plated sleeves',
      'Tested to under 0.02mm deflection under maximum load',
      'Calibrated within ±5 grams of exact competition specification',
    ],
    specs: {
      material: '216,000 PSI Swedish Spring Alloy',
      loadCapacity: '950 KG',
      footprint: '220cm length / 28mm shaft',
      sensorTelemetry: 'Embedded RFID & Barcode ID',
    },
    highlightStat: '216K PSI',
    statLabel: 'TENSILE YIELD STRENGTH',
  },
  {
    id: 'dumbbells',
    name: 'DUMBBELLS',
    subtitle: 'Pro Hex Laser-Machined Pairs',
    category: 'Free Weight Training',
    description:
      'Solid-steel core machined dumbbells with urethane encapsulation and contoured 35mm stainless steel knurled handles designed for infinite fatigue resistance.',
    features: [
      'Anti-roll precision hexagonal geometry with shock absorption',
      'Seamless welded pin-to-head structural joint integrity',
      'Laser-etched high visibility metric increments (2kg - 60kg)',
      'Odorless high-density virgin polyurethane coating',
    ],
    specs: {
      material: 'Virgin Polyurethane & 304 Stainless',
      loadCapacity: '2kg - 60kg Range',
      footprint: 'Modular 3-Tier Rack System',
      sensorTelemetry: 'Auto-detect Weight Rack Sensors',
    },
    highlightStat: '60 KG',
    statLabel: 'MAX SINGLE DB LOAD',
  },
  {
    id: 'cardio-system',
    name: 'CARDIO SYSTEM',
    subtitle: 'Curved Kinetic Ergometer',
    category: 'Endurance Training',
    description:
      'Motorless curved sprint deck powered purely by human biomechanics, recruiting up to 32% more posterior chain musculature than standard treadmills.',
    features: [
      'Zero-electrical motor: 100% human kinetic drive',
      'Slotted vulcanized rubber track with ball-bearing glide',
      'Instantaneous acceleration response without speed ceiling',
      'Real-time VO2, wattage, and stride symmetry analytics',
    ],
    specs: {
      material: 'Aerospace Grade Aluminum & Rubber',
      loadCapacity: '220 KG Runner Rating',
      footprint: '185cm × 90cm × 160cm',
      sensorTelemetry: 'Dual Force Plate Telemetry Console',
    },
    highlightStat: '+32%',
    statLabel: 'POSTERIOR RECRUITMENT',
  },
  {
    id: 'functional-rig',
    name: 'FUNCTIONAL RIG',
    subtitle: 'Modular Hybrid Obstacle Rig',
    category: 'Functional Training',
    description:
      'Custom fabricated modular functional training matrix with adjustable monkey bars, gymnastic rings, flying pull-up ladders, and multi-angle landmines.',
    features: [
      'Modular 6-station simultaneously usable athletic framework',
      'Integrated suspension training anchor tracks',
      'Target boards for medicine ball wall-shots & slam balls',
      'Padded climbing ropes with rapid-release tension locks',
    ],
    specs: {
      material: 'TIG-Welded Box Section Steel',
      loadCapacity: '3,000 KG Collective Load',
      footprint: '600cm × 250cm × 320cm',
      sensorTelemetry: 'Optical Athlete Motion Tracking',
    },
    highlightStat: '6 ATHLETES',
    statLabel: 'SIMULTANEOUS STATIONS',
  },
];

export default function EquipmentShowcase3D({
  isDark,
  onOpenBooking,
}: EquipmentShowcaseProps) {
  const [selectedId, setSelectedId] = useState<string>('power-rack');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const activeItem = EQUIPMENT_DATA.find((item) => item.id === selectedId) || EQUIPMENT_DATA[0];

  // Three.js interactive 3D viewer for equipment
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // Clear previous canvas
    container.innerHTML = '';

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(isDark ? 0x334155 : 0xe2e8f0, 1.5);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xf59e0b, 3.0);
    keyLight.position.set(4, 5, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x06b6d4, 2.0);
    fillLight.position.set(-4, -2, -2);
    scene.add(fillLight);

    // Grid Floor
    const grid = new THREE.GridHelper(6, 20, 0xf59e0b, isDark ? 0x1e293b : 0xcbd5e1);
    grid.position.y = -1.2;
    scene.add(grid);

    // Procedural 3D Mesh for active equipment
    const equipGroup = new THREE.Group();
    const steelMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0x334155,
      metalness: 0.9,
      roughness: 0.2,
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.95,
      roughness: 0.1,
    });
    const accentMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const cyanMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });

    if (selectedId === 'power-rack') {
      // 4 upright pillars
      const pillarGeo = new THREE.BoxGeometry(0.12, 2.4, 0.12);
      [-0.9, 0.9].forEach((x) => {
        [-0.7, 0.7].forEach((z) => {
          const pillar = new THREE.Mesh(pillarGeo, steelMat);
          pillar.position.set(x, 0, z);
          equipGroup.add(pillar);

          // Hole indicators
          for (let h = -0.9; h < 0.9; h += 0.25) {
            const hole = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.13), accentMat);
            hole.position.set(x, h, z);
            equipGroup.add(hole);
          }
        });
      });

      // Top crossbeams
      const beamXGeo = new THREE.BoxGeometry(1.92, 0.12, 0.12);
      [-0.7, 0.7].forEach((z) => {
        const beam = new THREE.Mesh(beamXGeo, steelMat);
        beam.position.set(0, 1.15, z);
        equipGroup.add(beam);
      });

      const beamZGeo = new THREE.BoxGeometry(0.12, 0.12, 1.4);
      [-0.9, 0.9].forEach((x) => {
        const beam = new THREE.Mesh(beamZGeo, steelMat);
        beam.position.set(x, 1.15, 0);
        equipGroup.add(beam);
      });

      // Pull up bar
      const pullUpGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.9, 16);
      const pullUp = new THREE.Mesh(pullUpGeo, chromeMat);
      pullUp.rotation.z = Math.PI / 2;
      pullUp.position.set(0, 1.1, 0.6);
      equipGroup.add(pullUp);

      // Barbell mounted on J-cups
      const barGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.4, 16);
      const bar = new THREE.Mesh(barGeo, chromeMat);
      bar.rotation.z = Math.PI / 2;
      bar.position.set(0, 0.2, -0.65);
      equipGroup.add(bar);

      // Red bumper plates
      [-1.0, 1.0].forEach((x) => {
        const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.08, 32), accentMat);
        plate.rotation.z = Math.PI / 2;
        plate.position.set(x, 0.2, -0.65);
        equipGroup.add(plate);
      });
    } else if (selectedId === 'bench-press') {
      // Olympic Competition Flat Bench Press Station
      // 1. Bench Base Frame
      const spine = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 1.6), steelMat);
      spine.position.set(0, -0.65, 0.1);
      equipGroup.add(spine);

      // Front cross foot
      const frontFoot = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.12), steelMat);
      frontFoot.position.set(0, -0.66, 0.85);
      equipGroup.add(frontFoot);

      // Rear cross foot
      const rearFoot = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.08, 0.14), steelMat);
      rearFoot.position.set(0, -0.66, -0.65);
      equipGroup.add(rearFoot);

      // Bench Pad support vertical pillars
      const frontPillar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 0.1), steelMat);
      frontPillar.position.set(0, -0.4, 0.7);
      equipGroup.add(frontPillar);

      const midPillar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 0.1), steelMat);
      midPillar.position.set(0, -0.4, -0.1);
      equipGroup.add(midPillar);

      // 2. High Density Padded Bench Cushion
      const padMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x0f172a : 0x1e293b,
        roughness: 0.7,
        metalness: 0.1,
      });
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.1, 1.35), padMat);
      pad.position.set(0, -0.12, 0.25);
      equipGroup.add(pad);

      // Leather/Vinyl edge piping highlight (amber trim)
      const trimLeft = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.03, 1.35), accentMat);
      trimLeft.position.set(-0.17, -0.09, 0.25);
      equipGroup.add(trimLeft);

      const trimRight = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.03, 1.35), accentMat);
      trimRight.position.set(0.17, -0.09, 0.25);
      equipGroup.add(trimRight);

      // 3. Upright Bench Press Stanchions (Racks)
      [-0.58, 0.58].forEach((x) => {
        // Main upright post
        const upright = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.45, 0.1), steelMat);
        upright.position.set(x, 0.05, -0.45);
        equipGroup.add(upright);

        // Laser-cut pin settings indicator holes
        for (let y = -0.3; y <= 0.65; y += 0.15) {
          const pin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.11), accentMat);
          pin.position.set(x, y, -0.45);
          equipGroup.add(pin);
        }

        // Primary J-Cup Bar Rest Catcher
        const jCupBase = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.18), steelMat);
        jCupBase.position.set(x, 0.42, -0.4);
        equipGroup.add(jCupBase);

        const jCupLip = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.04), accentMat);
        jCupLip.position.set(x, 0.46, -0.32);
        equipGroup.add(jCupLip);

        // Secondary Lower Emergency Safety Catch
        const safeBase = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.05, 0.16), steelMat);
        safeBase.position.set(x, 0.15, -0.38);
        equipGroup.add(safeBase);

        // Rear Gusset Bracing
        const brace = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.8, 0.08), steelMat);
        brace.position.set(x, -0.25, -0.65);
        brace.rotation.x = -0.45;
        equipGroup.add(brace);

        // Weight Storage Horn on back of upright
        const horn = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 16), chromeMat);
        horn.rotation.x = Math.PI / 2;
        horn.position.set(x, -0.1, -0.65);
        equipGroup.add(horn);

        // Stored plate on horn
        const storedPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.05, 24), steelMat);
        storedPlate.rotation.x = Math.PI / 2;
        storedPlate.position.set(x, -0.1, -0.72);
        equipGroup.add(storedPlate);
      });

      // Crossbeam connecting uprights
      const uprightCross = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.1, 0.1), steelMat);
      uprightCross.position.set(0, -0.15, -0.45);
      equipGroup.add(uprightCross);

      // Elevated Diamond Plate Spotter Platform at the rear
      const spotterDeck = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.06, 0.45), steelMat);
      spotterDeck.position.set(0, -0.45, -0.75);
      equipGroup.add(spotterDeck);

      const spotterTread = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.02, 0.4), cyanMat);
      spotterTread.position.set(0, -0.41, -0.75);
      equipGroup.add(spotterTread);

      // 4. Olympic Competition Barbell sitting on J-cups
      const benchBar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.3, 20), chromeMat);
      benchBar.rotation.z = Math.PI / 2;
      benchBar.position.set(0, 0.48, -0.38);
      equipGroup.add(benchBar);

      // Knurled rings on bar
      [-0.45, 0.45].forEach((kx) => {
        const knurl = new THREE.Mesh(new THREE.CylinderGeometry(0.033, 0.033, 0.25, 16), accentMat);
        knurl.rotation.z = Math.PI / 2;
        knurl.position.set(kx, 0.48, -0.38);
        equipGroup.add(knurl);
      });

      // Loaded Competition Plates on Barbell
      [-0.95, 0.95].forEach((px, sideIdx) => {
        // Red / Amber 25kg Eleiko-style competition bumper plate
        const bigPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.07, 32), accentMat);
        bigPlate.rotation.z = Math.PI / 2;
        bigPlate.position.set(px, 0.48, -0.38);
        equipGroup.add(bigPlate);

        // Cyan 20kg secondary plate
        const outerOffset = sideIdx === 0 ? -0.08 : 0.08;
        const midPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.06, 32), cyanMat);
        midPlate.rotation.z = Math.PI / 2;
        midPlate.position.set(px + outerOffset, 0.48, -0.38);
        equipGroup.add(midPlate);

        // Chrome Olympic quick-lock collar
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16), chromeMat);
        collar.rotation.z = Math.PI / 2;
        collar.position.set(px + outerOffset * 1.8, 0.48, -0.38);
        equipGroup.add(collar);
      });
    } else if (selectedId === 'olympic-bar') {
      // High detail Olympic Barbell
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.6, 24), chromeMat);
      shaft.rotation.z = Math.PI / 2;
      equipGroup.add(shaft);

      // Knurling rings
      [-0.5, 0.5].forEach((x) => {
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.3, 16), accentMat);
        ring.rotation.z = Math.PI / 2;
        ring.position.x = x;
        equipGroup.add(ring);
      });

      // Competition Sleeves and Plates
      [-1.1, 1.1].forEach((x, sideIdx) => {
        const sleeve = new THREE.Mesh(
          new THREE.CylinderGeometry(0.065, 0.065, 0.5, 24),
          steelMat
        );
        sleeve.rotation.z = Math.PI / 2;
        sleeve.position.x = x;
        equipGroup.add(sleeve);

        // Multiple calibrated plates
        [0.45, 0.42, 0.38].forEach((r, i) => {
          const plateGeo = new THREE.CylinderGeometry(r, r, 0.06, 32);
          const mat = i === 0 ? accentMat : i === 1 ? cyanMat : steelMat;
          const plate = new THREE.Mesh(plateGeo, mat);
          plate.rotation.z = Math.PI / 2;
          plate.position.x = x + (sideIdx === 0 ? -(i * 0.08 + 0.06) : (i * 0.08 + 0.06));
          equipGroup.add(plate);
        });
      });
    } else if (selectedId === 'dumbbells') {
      // Pair of pro hex dumbbells
      [-0.6, 0.6].forEach((offsetZ, idx) => {
        const db = new THREE.Group();
        const handle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.04, 0.9, 16),
          chromeMat
        );
        handle.rotation.z = Math.PI / 2;
        db.add(handle);

        [-0.42, 0.42].forEach((x) => {
          const hexGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.18, 6);
          const hexPlate = new THREE.Mesh(hexGeo, steelMat);
          hexPlate.rotation.z = Math.PI / 2;
          hexPlate.position.x = x;
          db.add(hexPlate);

          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(0.28, 0.02, 8, 24),
            idx === 0 ? accentMat : cyanMat
          );
          ring.rotation.y = Math.PI / 2;
          ring.position.x = x;
          db.add(ring);
        });

        db.position.set(0, 0, offsetZ);
        db.rotation.set(0.3, idx * 0.6, 0.2);
        equipGroup.add(db);
      });
    } else if (selectedId === 'cardio-system') {
      // Curved runner treadmill
      const base = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.25, 0.9), steelMat);
      base.position.y = -0.8;
      equipGroup.add(base);

      // Curved deck
      const deckGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.7, 32, 1, false, 0, Math.PI);
      const deck = new THREE.Mesh(deckGeo, steelMat);
      deck.rotation.z = Math.PI / 2;
      deck.position.set(0, -0.6, 0);
      deck.scale.set(0.6, 1.4, 0.8);
      equipGroup.add(deck);

      // Side handrails
      const railGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.6, 16);
      [-0.4, 0.4].forEach((z) => {
        const rail = new THREE.Mesh(railGeo, chromeMat);
        rail.position.set(0.6, -0.1, z);
        rail.rotation.z = -0.3;
        equipGroup.add(rail);

        const upright = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 16), steelMat);
        upright.position.set(-0.2, -0.25, z);
        equipGroup.add(upright);
      });

      // Digital console
      const consoleScreen = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.22, 0.05),
        cyanMat
      );
      consoleScreen.position.set(0.7, 0.6, 0);
      consoleScreen.rotation.y = -Math.PI / 2;
      equipGroup.add(consoleScreen);
    } else {
      // Functional Rig
      const rigBase = new THREE.BoxGeometry(2.6, 0.1, 1.4);
      const frame = new THREE.Mesh(rigBase, steelMat);
      frame.position.y = 1.0;
      equipGroup.add(frame);

      // 4 uprights
      [-1.2, 1.2].forEach((x) => {
        [-0.6, 0.6].forEach((z) => {
          const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.2, 0.1), steelMat);
          post.position.set(x, 0, z);
          equipGroup.add(post);
        });
      });

      // Gymnastic rings hanging
      [-0.3, 0.3].forEach((x) => {
        const strap = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.9, 8), steelMat);
        strap.position.set(x, 0.5, 0);
        equipGroup.add(strap);

        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 12, 24), accentMat);
        ring.position.set(x, 0, 0);
        equipGroup.add(ring);
      });
    }

    scene.add(equipGroup);

    // Mouse drag interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      equipGroup.rotation.y += deltaX * 0.01;
      equipGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      if (autoRotate && !isDragging) {
        equipGroup.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Resize
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
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [selectedId, autoRotate, isDark]);

  return (
    <section id="equipment" className="relative py-24 sm:py-32 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400">
                AEROSPACE BIOMECHANICS
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-foreground uppercase">
              ENGINEERED FOR <br />
              <span className="text-amber-500">PERFORMANCE</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Every bar, rig, and sensor at FitForge is industrial-grade and custom-calibrated for maximum mechanical advantage.
          </p>
        </div>

        {/* 6 Equipment Selectors (Power Rack, Bench Press, Olympic Bar, Dumbbells, Cardio System, Functional Rig) */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {EQUIPMENT_DATA.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playSwitch();
                  setSelectedId(item.id);
                }}
                className={`flex-shrink-0 px-4 sm:px-6 py-3 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                    : isDark
                    ? 'bg-zinc-900/60 border-white/10 text-zinc-300 hover:border-amber-400/40 hover:text-white'
                    : 'bg-white/80 border-black/10 text-zinc-700 hover:border-amber-500/40 hover:text-black'
                }`}
              >
                <span>{item.name}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
              </button>
            );
          })}
        </div>

        {/* Main 3D Stage & Information Panel */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 rounded-3xl border overflow-hidden transition-all duration-300 ${
            isDark
              ? 'bg-[#0B0D13]/85 border-white/10 shadow-2xl'
              : 'bg-white/90 border-black/10 shadow-xl'
          }`}
        >
          {/* Left: Interactive 3D Canvas Stage */}
          <div className="lg:col-span-7 relative h-80 sm:h-96 lg:h-[540px] flex items-center justify-center p-4">
            <div
              ref={canvasContainerRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              title="Click and drag to rotate 3D equipment"
            />

            {/* 3D Canvas Controls Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-black/60 text-amber-400 border border-white/10 backdrop-blur-md">
                3D CAD PREVIEW
              </span>
              <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline-block">
                Drag to rotate 360°
              </span>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={() => {
                  sound.playClick();
                  setAutoRotate(!autoRotate);
                }}
                className={`p-2 rounded-xl text-xs font-mono border backdrop-blur-md transition-colors ${
                  autoRotate
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : 'bg-black/50 text-zinc-400 border-white/10'
                }`}
                title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Highlight Stat Badge */}
            <div className="absolute bottom-4 left-4 p-3 rounded-xl border border-white/10 bg-black/70 backdrop-blur-md z-10">
              <div className="text-xl sm:text-2xl font-heading font-black text-amber-400">
                {activeItem.highlightStat}
              </div>
              <div className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase">
                {activeItem.statLabel}
              </div>
            </div>
          </div>

          {/* Right: Technical Dossier & Specs Panel */}
          <div
            className={`lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}
          >
            <div>
              {/* Category & Title */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-amber-500 tracking-widest uppercase">
                  {activeItem.category}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-800/60">
                  SPEC // 2026.4
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-foreground mb-1 uppercase">
                {activeItem.name}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mb-4">
                {activeItem.subtitle}
              </p>

              <p className="text-sm text-zinc-300 font-body leading-relaxed mb-6">
                {activeItem.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-black/20 border border-white/5 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Material
                  </span>
                  <span className="text-xs font-tech font-bold text-foreground">
                    {activeItem.specs.material}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Load Capacity
                  </span>
                  <span className="text-xs font-tech font-bold text-amber-400">
                    {activeItem.specs.loadCapacity}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Footprint
                  </span>
                  <span className="text-xs font-tech font-bold text-foreground">
                    {activeItem.specs.footprint}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Telemetry
                  </span>
                  <span className="text-xs font-tech font-bold text-cyan-400">
                    {activeItem.specs.sensorTelemetry}
                  </span>
                </div>
              </div>

              {/* Engineering Features */}
              <div className="space-y-2 mb-8">
                {activeItem.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Equipment CTA */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenBooking();
              }}
              className="w-full py-3.5 px-5 rounded-xl font-tech font-bold text-xs sm:text-sm uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Test This Equipment In Person</span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
