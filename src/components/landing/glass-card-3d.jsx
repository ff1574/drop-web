// components/landing/glass-card-3d.jsx
import { useRef, forwardRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Environment, RoundedBox } from "@react-three/drei";
import { useGesture } from "@use-gesture/react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import * as THREE from "three";

// Background elements - STATIC (no rotation)
function BackgroundScene() {
  const lights = [
    { position: [-2.5, 1.5, -4], color: "#ff0080", radius: 0.6 },
    { position: [2.5, -1.2, -4], color: "#00ffff", radius: 0.5 },
    { position: [0, -1.8, -4], color: "#ffff00", radius: 0.55 },
    { position: [-1.5, -0.5, -4], color: "#ff6600", radius: 0.4 },
    { position: [1.8, 1.2, -4], color: "#9945ff", radius: 0.7 },
  ];

  return (
    <group>
      {lights.map((light, idx) => (
        <group key={idx} position={light.position}>
          {/* Emissive sphere */}
          <mesh>
            <sphereGeometry args={[light.radius, 32, 32]} />
            <meshStandardMaterial
              color={light.color}
              emissive={light.color}
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>

          {/* Point light */}
          <pointLight
            color={light.color}
            intensity={3}
            distance={8}
            decay={2}
          />

          {/* Glow halo */}
          <mesh>
            <sphereGeometry args={[light.radius * 1.3, 16, 16]} />
            <meshBasicMaterial color={light.color} transparent opacity={0.15} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Interactive Glass Card - user can rotate this
function InteractiveGlassCard() {
  const groupRef = useRef();
  const isDragging = useRef(false);

  // Subtle floating animation only (no rotation)
  useFrame((state) => {
    if (groupRef.current && !isDragging.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  // Mouse drag to rotate
  const bind = useGesture({
    onDrag: ({ delta: [dx, dy], down }) => {
      isDragging.current = down;
      if (groupRef.current && down) {
        groupRef.current.rotation.y += dx * 0.01;
        groupRef.current.rotation.x += dy * 0.01;
        // Clamp X rotation to prevent flipping
        groupRef.current.rotation.x = Math.max(
          -Math.PI / 4,
          Math.min(Math.PI / 4, groupRef.current.rotation.x)
        );
      }
    },
  });

  return (
    <group ref={groupRef} {...bind()}>
      {/* Glass Card */}
      <RoundedBox
        args={[2.5, 3.5, 0.15]}
        radius={0.12}
        smoothness={4}
        receiveShadow
      >
        <meshPhysicalMaterial
          transmission={1}
          thickness={0.6}
          roughness={0.15}
          ior={1.5}
          reflectivity={0.6}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
        />
      </RoundedBox>

      {/* DROP Patch */}
      <DropPatch />

      {/* Rarity Indicator */}
      <RarityIndicator />
    </group>
  );
}

// DROP Logo Patch Accessory - STATIC (no auto rotation)
function DropPatch() {
  return (
    <group position={[0, 0.2, 0.2]}>
      {/* Patch base - hexagonal shape */}
      <mesh castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 6]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Stitched border effect */}
      <mesh position={[0, 0, 0.026]} castShadow>
        <cylinderGeometry args={[0.48, 0.48, 0.002, 6]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* DROP text - D */}
      <mesh position={[-0.25, 0.1, 0.03]} castShadow>
        <boxGeometry args={[0.08, 0.25, 0.01]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[-0.18, 0.1, 0.03]} castShadow>
        <cylinderGeometry args={[0.125, 0.125, 0.01, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Water droplet icon */}
      <mesh position={[0, -0.1, 0.03]} rotation={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#00d9ff"
          metalness={0.9}
          roughness={0.1}
          emissive="#00d9ff"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Droplet tail */}
      <mesh position={[0, 0.02, 0.03]} rotation={[0, 0, Math.PI]} castShadow>
        <coneGeometry args={[0.08, 0.15, 32]} />
        <meshStandardMaterial
          color="#00d9ff"
          metalness={0.9}
          roughness={0.1}
          emissive="#00d9ff"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Decorative line */}
      <mesh position={[-0.2, -0.05, 0.03]} castShadow>
        <boxGeometry args={[0.3, 0.02, 0.01]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Rarity indicator with controlled glow
function RarityIndicator({ rarity = "rare" }) {
  const goldenColor = "#FFD700";
  const glowRef = useRef();

  useFrame((state) => {
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 1.5;
      glowRef.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <group position={[0, -1.5, 0.2]}>
      {/* Main glowing bar */}
      <mesh ref={glowRef}>
        <boxGeometry args={[1.8, 0.1, 0.04]} />
        <meshStandardMaterial
          color={goldenColor}
          emissive={goldenColor}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* Outer glow lines */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[1.6, 0.02, 0.02]} />
        <meshStandardMaterial
          color={goldenColor}
          emissive={goldenColor}
          emissiveIntensity={0.9}
          toneMapped={false}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[1.6, 0.02, 0.02]} />
        <meshStandardMaterial
          color={goldenColor}
          emissive={goldenColor}
          emissiveIntensity={0.9}
          toneMapped={false}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// Main component
export const GlassCard3D = forwardRef(
  (
    {
      accessoryType = "patch",
      rarity = "rare",
      title = "Genesis Patch",
      description = "Rare",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={`relative ${className}`} {...props}>
        <div className="relative w-full h-[700px] rounded-3xl overflow-hidden bg-gradient-to-b from-gray-50 to-white border border-black/5">
          <Canvas
            shadows
            dpr={[1, 2]}
            gl={{
              alpha: false,
              antialias: true,
              preserveDrawingBuffer: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 0.85,
            }}
          >
            {/* Fixed Camera Position */}
            <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />

            {/* Background */}
            <color attach="background" args={["#fafafa"]} />
            <fog attach="fog" args={["#fafafa", 5, 15]} />

            {/* Lights - repositioned to avoid camera reflection */}
            <ambientLight intensity={0.4} />

            <directionalLight
              position={[-8, 6, 3]}
              intensity={0.8}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />

            <directionalLight position={[6, -4, -6]} intensity={0.4} />

            <directionalLight position={[0, 8, -5]} intensity={0.5} />

            <spotLight
              position={[-3, 10, 2]}
              angle={0.6}
              penumbra={1}
              intensity={0.4}
              castShadow
            />

            <Suspense fallback={null}>
              {/* Environment */}
              <Environment preset="studio" environmentIntensity={0.3} />

              {/* Static background lights */}
              <BackgroundScene />

              {/* Interactive glass card - user can rotate */}
              <InteractiveGlassCard />
            </Suspense>

            {/* Ground plane */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -2, 0]}
              receiveShadow
            >
              <planeGeometry args={[20, 20]} />
              <shadowMaterial opacity={0.06} />
            </mesh>

            {/* Bloom effect */}
            <EffectComposer>
              <Bloom
                intensity={0.6}
                luminanceThreshold={0.85}
                luminanceSmoothing={0.4}
                mipmapBlur
              />
            </EffectComposer>
          </Canvas>

          {/* Drag instruction overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/5 backdrop-blur-sm rounded-full border border-black/10">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">
              Drag to Rotate
            </p>
          </div>
        </div>

        {/* Text below */}
        <div className="mt-8 text-center space-y-2">
          <h3 className="text-2xl font-light text-black tracking-wide">
            {title}
          </h3>
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            {description}
          </p>
        </div>
      </div>
    );
  }
);

GlassCard3D.displayName = "GlassCard3D";
