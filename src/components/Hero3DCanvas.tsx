import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  isDark?: boolean;
}

export default function Hero3DCanvas({ isDark = true }: Hero3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark ? 0x08090c : 0xf1f5f9, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Base camera position: shifted so athlete sits on center-right on desktop
    const baseCamPos = { x: 1.2, y: 0.5, z: 8.5 };
    camera.position.set(baseCamPos.x, baseCamPos.y, baseCamPos.z);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Lighting (Cyberpunk Sports Luxury)
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x1e293b : 0xe2e8f0,
      1.2
    );
    scene.add(ambientLight);

    // Key Amber/Gold light
    const amberLight = new THREE.DirectionalLight(0xf59e0b, 3.2);
    amberLight.position.set(5, 6, 4);
    scene.add(amberLight);

    // Rim Cyan/Blue light for cyberpunk contrast
    const cyanLight = new THREE.DirectionalLight(0x06b6d4, 2.5);
    cyanLight.position.set(-5, 3, -2);
    scene.add(cyanLight);

    // Under-glow platform light
    const floorLight = new THREE.PointLight(0xf59e0b, 2.0, 10);
    floorLight.position.set(0, -2.5, 0);
    scene.add(floorLight);

    // 3. Materials
    const carbonColor = isDark ? 0x0f172a : 0x334155;
    const accentColor = 0xf59e0b;
    const cyanColor = 0x06b6d4;

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: carbonColor,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false,
    });

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: accentColor,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
    });

    const darkPlateMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e222d : 0x475569,
      metalness: 0.6,
      roughness: 0.4,
    });

    // 4. Construct 3D Muscular Athlete Silhouette in an athletic power pose
    const athleteGroup = new THREE.Group();

    // Helper to create muscular mesh with wireframe overlay
    const createMuscleMesh = (
      geo: THREE.BufferGeometry,
      pos: [number, number, number],
      rot?: [number, number, number],
      scale?: [number, number, number]
    ) => {
      const g = new THREE.Group();
      const solid = new THREE.Mesh(geo, bodyMaterial);
      const wire = new THREE.Mesh(geo, wireMaterial);
      wire.scale.set(1.01, 1.01, 1.01);
      g.add(solid);
      g.add(wire);
      g.position.set(...pos);
      if (rot) g.rotation.set(...rot);
      if (scale) g.scale.set(...scale);
      return g;
    };

    // A. Head & Cyber Visor
    const headGeo = new THREE.DodecahedronGeometry(0.38, 1);
    const head = createMuscleMesh(headGeo, [0, 2.3, 0]);
    // Visor strip
    const visorGeo = new THREE.BoxGeometry(0.35, 0.08, 0.25);
    const visor = new THREE.Mesh(visorGeo, glowMaterial);
    visor.position.set(0, 2.32, 0.25);
    athleteGroup.add(head);
    athleteGroup.add(visor);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.35, 8);
    const neck = createMuscleMesh(neckGeo, [0, 1.95, 0]);
    athleteGroup.add(neck);

    // B. Upper Torso / Pectorals & Lats (V-taper)
    const chestGeo = new THREE.CylinderGeometry(0.72, 0.45, 0.9, 8);
    const chest = createMuscleMesh(chestGeo, [0, 1.45, 0], [0, Math.PI / 8, 0]);
    athleteGroup.add(chest);

    // Pectoral Plates
    const pecGeo = new THREE.BoxGeometry(0.32, 0.25, 0.12);
    const pecLeft = createMuscleMesh(pecGeo, [-0.22, 1.55, 0.28], [0.1, 0.1, -0.05]);
    const pecRight = createMuscleMesh(pecGeo, [0.22, 1.55, 0.28], [0.1, -0.1, 0.05]);
    athleteGroup.add(pecLeft);
    athleteGroup.add(pecRight);

    // Abdominal 6-pack definition
    for (let row = 0; row < 3; row++) {
      const y = 0.92 - row * 0.2;
      const abGeo = new THREE.BoxGeometry(0.18, 0.14, 0.08);
      const abL = createMuscleMesh(abGeo, [-0.12, y, 0.25 - row * 0.02]);
      const abR = createMuscleMesh(abGeo, [0.12, y, 0.25 - row * 0.02]);
      athleteGroup.add(abL);
      athleteGroup.add(abR);
    }

    // Spine Glowing Nodes (cybernetic back)
    for (let s = 0; s < 7; s++) {
      const sNodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const sNode = new THREE.Mesh(
        sNodeGeo,
        new THREE.MeshBasicMaterial({ color: s % 2 === 0 ? accentColor : cyanColor })
      );
      sNode.position.set(0, 0.55 + s * 0.24, -0.3);
      athleteGroup.add(sNode);
    }

    // C. Deltoids / Shoulders
    const deltGeo = new THREE.SphereGeometry(0.32, 10, 10);
    const deltL = createMuscleMesh(deltGeo, [-0.85, 1.7, 0], [0, 0, 0.2]);
    const deltR = createMuscleMesh(deltGeo, [0.85, 1.7, 0], [0, 0, -0.2]);
    athleteGroup.add(deltL);
    athleteGroup.add(deltR);

    // D. Biceps & Arms (Athletic Flex / Ready Grip Stance)
    const armGeo = new THREE.CylinderGeometry(0.18, 0.15, 0.65, 8);
    const armL = createMuscleMesh(armGeo, [-1.05, 1.3, 0.1], [0.3, 0, -0.35]);
    const armR = createMuscleMesh(armGeo, [1.05, 1.3, 0.1], [0.3, 0, 0.35]);
    athleteGroup.add(armL);
    athleteGroup.add(armR);

    const forearmGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.6, 8);
    const forearmL = createMuscleMesh(forearmGeo, [-0.95, 0.85, 0.4], [1.1, 0.3, -0.4]);
    const forearmR = createMuscleMesh(forearmGeo, [0.95, 0.85, 0.4], [1.1, -0.3, 0.4]);
    athleteGroup.add(forearmL);
    athleteGroup.add(forearmR);

    // Hands with knurled grips
    const handGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const handL = createMuscleMesh(handGeo, [-0.75, 0.95, 0.75]);
    const handR = createMuscleMesh(handGeo, [0.75, 0.95, 0.75]);
    athleteGroup.add(handL);
    athleteGroup.add(handR);

    // E. Hips / Pelvis
    const pelvisGeo = new THREE.CylinderGeometry(0.42, 0.32, 0.4, 8);
    const pelvis = createMuscleMesh(pelvisGeo, [0, 0.25, 0]);
    athleteGroup.add(pelvis);

    // F. Legs (Strong Athletic Stance, slightly wide)
    const thighGeo = new THREE.CylinderGeometry(0.24, 0.18, 1.05, 8);
    const thighL = createMuscleMesh(thighGeo, [-0.38, -0.45, 0], [0.1, 0, 0.12]);
    const thighR = createMuscleMesh(thighGeo, [0.38, -0.45, 0], [0.1, 0, -0.12]);
    athleteGroup.add(thighL);
    athleteGroup.add(thighR);

    // Knee joints
    const kneeGeo = new THREE.SphereGeometry(0.16, 8, 8);
    const kneeL = createMuscleMesh(kneeGeo, [-0.46, -1.05, 0.08]);
    const kneeR = createMuscleMesh(kneeGeo, [0.46, -1.05, 0.08]);
    athleteGroup.add(kneeL);
    athleteGroup.add(kneeR);

    // Calves
    const calfGeo = new THREE.CylinderGeometry(0.18, 0.12, 1.0, 8);
    const calfL = createMuscleMesh(calfGeo, [-0.48, -1.6, -0.02], [-0.08, 0, 0.05]);
    const calfR = createMuscleMesh(calfGeo, [0.48, -1.6, -0.02], [-0.08, 0, -0.05]);
    athleteGroup.add(calfL);
    athleteGroup.add(calfR);

    // Cyber feet / platforms
    const footGeo = new THREE.BoxGeometry(0.26, 0.12, 0.48);
    const footL = createMuscleMesh(footGeo, [-0.5, -2.15, 0.12], [0, -0.1, 0]);
    const footR = createMuscleMesh(footGeo, [0.5, -2.15, 0.12], [0, 0.1, 0]);
    athleteGroup.add(footL);
    athleteGroup.add(footR);

    // Position athlete inside scene (center/right on desktop)
    athleteGroup.position.set(0.6, 0.1, 0);
    scene.add(athleteGroup);

    // 5. Holographic Floor Ring / Power Pedestal
    const floorPedestal = new THREE.Group();
    const ringGeo1 = new THREE.RingGeometry(1.6, 1.75, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: accentColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = -2.22;
    floorPedestal.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(2.3, 2.38, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: cyanColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = -2.22;
    floorPedestal.add(ring2);

    // Concentric grid circles
    const gridHelper = new THREE.PolarGridHelper(4, 16, 8, 32, accentColor, 0x334155);
    gridHelper.position.y = -2.24;
    floorPedestal.add(gridHelper);

    scene.add(floorPedestal);

    // 6. Floating 3D Elements Around Athlete (Dumbbells, Weight Plates, Rings, Sensors)
    const floatingItems: {
      mesh: THREE.Object3D;
      initialPos: THREE.Vector3;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      floatDist: number;
      phase: number;
    }[] = [];

    // Helper: 3D Dumbbell
    const createDumbbell = (scale = 1) => {
      const group = new THREE.Group();
      // Handle
      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.75 * scale, 12),
        chromeMaterial
      );
      handle.rotation.z = Math.PI / 2;
      group.add(handle);

      // Left & Right Hex Plates
      [-0.32 * scale, 0.32 * scale].forEach((xPos) => {
        const plate = new THREE.Mesh(
          new THREE.CylinderGeometry(0.24 * scale, 0.24 * scale, 0.12 * scale, 6),
          darkPlateMaterial
        );
        plate.rotation.z = Math.PI / 2;
        plate.position.x = xPos;
        group.add(plate);

        // Accent rim
        const rim = new THREE.Mesh(
          new THREE.TorusGeometry(0.22 * scale, 0.015 * scale, 8, 24),
          new THREE.MeshBasicMaterial({ color: accentColor })
        );
        rim.rotation.y = Math.PI / 2;
        rim.position.x = xPos;
        group.add(rim);
      });
      return group;
    };

    // Helper: 3D Olympic Weight Plate
    const createWeightPlate = (radius = 0.5, thickness = 0.08) => {
      const group = new THREE.Group();
      // Outer disc
      const disc = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, thickness, 32),
        darkPlateMaterial
      );
      group.add(disc);

      // Outer rim
      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(radius * 0.92, 0.02, 12, 36),
        new THREE.MeshBasicMaterial({ color: accentColor })
      );
      rim.rotation.x = Math.PI / 2;
      group.add(rim);

      // Center hole
      const innerRing = new THREE.Mesh(
        new THREE.TorusGeometry(radius * 0.25, 0.025, 8, 24),
        chromeMaterial
      );
      innerRing.rotation.x = Math.PI / 2;
      group.add(innerRing);

      return group;
    };

    // Helper: 3D Gyroscopic Fitness Ring
    const createGyroRing = (radius = 0.6) => {
      const group = new THREE.Group();
      const torus1 = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.02, 16, 48),
        new THREE.MeshBasicMaterial({ color: cyanColor })
      );
      const torus2 = new THREE.Mesh(
        new THREE.TorusGeometry(radius * 0.78, 0.015, 16, 48),
        new THREE.MeshBasicMaterial({ color: accentColor })
      );
      torus2.rotation.x = Math.PI / 3;
      group.add(torus1);
      group.add(torus2);
      return group;
    };

    // Helper: 3D Futuristic Telemetry Sensor Node
    const createSensorNode = (radius = 0.2) => {
      const group = new THREE.Group();
      const ico = new THREE.Mesh(
        new THREE.IcosahedronGeometry(radius, 0),
        new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          wireframe: true,
          metalness: 0.9,
        })
      );
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 0.45, 12, 12),
        new THREE.MeshBasicMaterial({ color: accentColor })
      );
      group.add(ico);
      group.add(core);
      return group;
    };

    // Add items around athlete
    // 1. Dumbbell 1 (Upper Left)
    const db1 = createDumbbell(0.9);
    const db1Pos = new THREE.Vector3(-2.2, 1.8, 1.2);
    db1.position.copy(db1Pos);
    scene.add(db1);
    floatingItems.push({
      mesh: db1,
      initialPos: db1Pos,
      rotSpeed: { x: 0.008, y: 0.012, z: 0.004 },
      floatSpeed: 1.6,
      floatDist: 0.18,
      phase: 0,
    });

    // 2. Dumbbell 2 (Lower Right)
    const db2 = createDumbbell(1.1);
    const db2Pos = new THREE.Vector3(2.5, -0.6, 1.8);
    db2.position.copy(db2Pos);
    scene.add(db2);
    floatingItems.push({
      mesh: db2,
      initialPos: db2Pos,
      rotSpeed: { x: -0.006, y: -0.01, z: 0.008 },
      floatSpeed: 1.4,
      floatDist: 0.22,
      phase: Math.PI / 2,
    });

    // 3. Weight Plate 1 (Left Mid)
    const plate1 = createWeightPlate(0.65, 0.1);
    const plate1Pos = new THREE.Vector3(-2.8, -0.2, 0.5);
    plate1.position.copy(plate1Pos);
    plate1.rotation.set(0.4, 0.6, -0.3);
    scene.add(plate1);
    floatingItems.push({
      mesh: plate1,
      initialPos: plate1Pos,
      rotSpeed: { x: 0.005, y: 0.007, z: 0.002 },
      floatSpeed: 1.2,
      floatDist: 0.25,
      phase: Math.PI / 3,
    });

    // 4. Weight Plate 2 (Right Top background)
    const plate2 = createWeightPlate(0.45, 0.08);
    const plate2Pos = new THREE.Vector3(2.8, 2.2, -1.0);
    plate2.position.copy(plate2Pos);
    scene.add(plate2);
    floatingItems.push({
      mesh: plate2,
      initialPos: plate2Pos,
      rotSpeed: { x: 0.004, y: 0.009, z: -0.003 },
      floatSpeed: 1.8,
      floatDist: 0.15,
      phase: Math.PI,
    });

    // 5. Gyroscopic Ring (Floating telemetry orbit)
    const gyro1 = createGyroRing(0.75);
    const gyro1Pos = new THREE.Vector3(1.8, 1.5, 0.8);
    gyro1.position.copy(gyro1Pos);
    scene.add(gyro1);
    floatingItems.push({
      mesh: gyro1,
      initialPos: gyro1Pos,
      rotSpeed: { x: 0.015, y: 0.02, z: 0.01 },
      floatSpeed: 2.0,
      floatDist: 0.18,
      phase: 1.2,
    });

    // 6. Sensor Nodes (Biometric telemetry points)
    const sensor1 = createSensorNode(0.25);
    const sensor1Pos = new THREE.Vector3(-1.6, -1.4, 1.4);
    sensor1.position.copy(sensor1Pos);
    scene.add(sensor1);
    floatingItems.push({
      mesh: sensor1,
      initialPos: sensor1Pos,
      rotSpeed: { x: 0.02, y: 0.015, z: 0.01 },
      floatSpeed: 2.2,
      floatDist: 0.14,
      phase: 2.5,
    });

    // 7. Glowing Particle Cloud (Energy sparks / data particles)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const amberC = new THREE.Color(accentColor);
    const cyanC = new THREE.Color(cyanColor);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = Math.random() > 0.4 ? amberC : cyanC;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Interactive Cursor Tracking & Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x;
      targetMouseY = y;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 9. Scroll-linked Transformation
    let scrollProgress = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(window.innerHeight * 2.5, 1);
      scrollProgress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 10. Resize handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;

      // Adjust camera distance for mobile responsiveness
      if (width < 768) {
        camera.fov = 55;
        baseCamPos.x = 0;
        baseCamPos.y = 0.2;
        baseCamPos.z = 10.5;
        athleteGroup.position.set(0, -0.2, 0);
      } else {
        camera.fov = 45;
        baseCamPos.x = 1.2;
        baseCamPos.y = 0.5;
        baseCamPos.z = 8.5;
        athleteGroup.position.set(0.6, 0.1, 0);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 11. Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate Athlete with scroll + mouse parallax
      // As user scrolls: athlete rotates smoothly, camera orbits, objects disperse
      const scrollRotation = scrollProgress * Math.PI * 1.5;
      athleteGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.12 + mouseX * 0.35 + scrollRotation;
      athleteGroup.rotation.x = Math.cos(elapsedTime * 0.25) * 0.05 - mouseY * 0.25;

      // Camera transitions cinematically with scroll
      camera.position.x = baseCamPos.x + mouseX * 0.8 + scrollProgress * -2.2;
      camera.position.y = baseCamPos.y + mouseY * 0.5 + Math.sin(scrollProgress * Math.PI) * 1.2;
      camera.position.z = baseCamPos.z - scrollProgress * 2.8;
      camera.lookAt(
        athleteGroup.position.x - scrollProgress * 0.5,
        athleteGroup.position.y + 0.5,
        athleteGroup.position.z
      );

      // Floor pedestal gentle rotation
      floorPedestal.rotation.y = elapsedTime * 0.15;

      // Floating items animation (slow rotation & floating)
      floatingItems.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.rotation.z += item.rotSpeed.z;

        const floatOffset =
          Math.sin(elapsedTime * item.floatSpeed + item.phase) * item.floatDist;
        
        // Scroll dispersal effect: objects expand outwards as user scrolls
        const disperseFactor = 1 + scrollProgress * 0.8;
        item.mesh.position.x = item.initialPos.x * disperseFactor;
        item.mesh.position.y = item.initialPos.y + floatOffset;
        item.mesh.position.z = item.initialPos.z * disperseFactor;
      });

      // Particles gentle drift
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ touchAction: 'pan-y' }}
      aria-label="3D Interactive Fitness Athlete Simulation"
    />
  );
}
