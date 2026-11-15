import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const StillLifeScene: React.FC<{ mousePos: { x: number; y: number }; isHovered: boolean }> = ({
  mousePos,
  isHovered,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const origamiRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Pointer parallax of ±3° (0.052 rad) with 0.05 lerp
    const targetRotY = mousePos.x * 0.052;
    const targetRotX = -mousePos.y * 0.052;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);

    // Idle motion: rotate paper form at most 0.12 rad/s. Stop while hovering.
    if (origamiRef.current && !isHovered) {
      origamiRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* 1. Underlying Sheet of Drawing Paper on Desk */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0.04]}>
        <planeGeometry args={[3.6, 2.6]} />
        <meshStandardMaterial color="#F3EEE3" roughness={0.94} metalness={0} />
      </mesh>

      {/* 2. Folded Paper Origami Form (Geometric faceted paper crane / icosahedron) */}
      <mesh ref={origamiRef} position={[0, 0.42, 0]} rotation={[0.2, 0.4, 0]}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial
          color="#F9F6EE"
          roughness={0.92}
          metalness={0}
          flatShading={true}
        />
      </mesh>

      {/* 3. Graphite Drawing Pencil Scale Prop */}
      <group position={[0.9, 0.02, 0.6]} rotation={[-Math.PI / 2, 0, -0.45]}>
        {/* Hexagonal pencil body */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.038, 0.038, 1.4, 6]} />
          <meshStandardMaterial color="#2B4C8C" roughness={0.6} metalness={0.1} />
        </mesh>
        {/* Sharpened cedar cone */}
        <mesh position={[0, 1.48, 0]}>
          <coneGeometry args={[0.038, 0.16, 6]} />
          <meshStandardMaterial color="#CBBBA0" roughness={0.8} />
        </mesh>
        {/* Graphite tip */}
        <mesh position={[0, 1.58, 0]}>
          <coneGeometry args={[0.015, 0.07, 6]} />
          <meshStandardMaterial color="#1B1A16" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Brass ferrule */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
          <meshStandardMaterial color="#C8963E" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* 4. Six-Inch Brass Ruler Scale Prop */}
      <mesh position={[-0.95, 0.01, 0.3]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <boxGeometry args={[1.8, 0.28, 0.012]} />
        <meshStandardMaterial color="#BCA362" roughness={0.35} metalness={0.65} />
      </mesh>

      {/* 5. Contact Shadow on Desk Surface */}
      <ContactShadows
        position={[0, -0.02, 0]}
        opacity={0.34}
        blur={2.6}
        far={4.5}
        resolution={512}
        color="#1B1A16"
      />
    </group>
  );
};

export const PaperStillLifeFallback: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] max-w-[480px] mx-auto flex items-center justify-center p-6 bg-paper border border-rule shadow-sm">
      <svg
        viewBox="0 0 480 360"
        className="w-full h-auto"
        aria-label="Still-life drawing of a folded paper form with a pencil and brass ruler on a desk."
      >
        {/* Sheet of paper */}
        <polygon points="60,280 400,290 420,90 80,80" fill="#F3EEE3" stroke="#D5CDBC" strokeWidth="1" />
        {/* Soft contact shadow */}
        <ellipse cx="240" cy="225" rx="140" ry="24" fill="#1B1A16" fillOpacity="0.09" />
        {/* Folded paper facets */}
        <polygon points="240,110 180,210 240,230" fill="#FAF7F0" stroke="#D5CDBC" strokeWidth="1" />
        <polygon points="240,110 240,230 300,205" fill="#EAE4D6" stroke="#D5CDBC" strokeWidth="1" />
        <polygon points="240,110 300,205 270,160" fill="#F4EFE5" stroke="#D5CDBC" strokeWidth="1" />
        <polygon points="180,210 240,230 210,250" fill="#DDD5C4" stroke="#D5CDBC" strokeWidth="1" />
        {/* Pencil */}
        <line x1="310" y1="230" x2="410" y2="270" stroke="#2B4C8C" strokeWidth="6" strokeLinecap="round" />
        <line x1="410" y1="270" x2="425" y2="276" stroke="#CBBBA0" strokeWidth="4" />
        <line x1="425" y1="276" x2="430" y2="278" stroke="#1B1A16" strokeWidth="2" />
        {/* Ruler */}
        <rect x="90" y="220" width="120" height="20" transform="rotate(-15 90 220)" fill="#BCA362" stroke="#8A7338" strokeWidth="0.8" />
      </svg>
    </div>
  );
};

export const PaperStillLife: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion & mobile viewport
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);

    // Detect WebGL
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  if (isMobile || reducedMotion || !hasWebGL) {
    return <PaperStillLifeFallback />;
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full aspect-[4/3] max-w-[500px] mx-auto select-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 1.1, 6.2], fov: 33 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Lamp Key Light (Warm #FFE7C7) */}
        <directionalLight position={[3.2, 4.4, 3.8]} intensity={3.2} color="#FFE7C7" />
        {/* Fill Light (Cool #D9E4F2) */}
        <pointLight position={[-4, 1.2, 2.4]} intensity={0.7} color="#D9E4F2" />
        {/* Rim Light */}
        <directionalLight position={[-1, 2.5, -5]} intensity={1.4} color="#FFFFFF" />
        <ambientLight intensity={0.25} />

        <Suspense fallback={null}>
          <StillLifeScene mousePos={mousePos} isHovered={isHovered} />
        </Suspense>
      </Canvas>
      <span className="sr-only">
        An interactive still-life of a folded paper origami form, graphite pencil, and brass scale ruler resting on a desk under a warm lamp.
      </span>
    </div>
  );
};
