// components/landing/jacket-model.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function JacketModel({ scrollProgress, rotation, yPosition }) {
  const groupRef = useRef();
  const sleeveLeftRef = useRef();
  const sleeveRightRef = useRef();
  const collarRef = useRef();
  const zipperRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const scrollRot = rotation.get();
      groupRef.current.rotation.y = scrollRot;

      const scrollY = yPosition.get();
      groupRef.current.position.y = scrollY * 0.5;

      // Subtle breathing animation
      const breathe = Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
      groupRef.current.scale.setScalar(1 + breathe);

      // Animate sleeves slightly
      if (sleeveLeftRef.current && sleeveRightRef.current) {
        sleeveLeftRef.current.rotation.z =
          -0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        sleeveRightRef.current.rotation.z =
          0.2 - Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      }

      // Collar subtle movement
      if (collarRef.current) {
        collarRef.current.rotation.x =
          Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main jacket body with better proportions */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2.8, 0.7]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.15}
          roughness={0.35}
          envMapIntensity={1}
        />
      </mesh>

      {/* Front panels - split design */}
      <mesh castShadow receiveShadow position={[-0.52, 0, 0.36]}>
        <boxGeometry args={[0.9, 2.6, 0.05]} />
        <meshStandardMaterial color="#151515" metalness={0.2} roughness={0.3} />
      </mesh>

      <mesh castShadow receiveShadow position={[0.52, 0, 0.36]}>
        <boxGeometry args={[0.9, 2.6, 0.05]} />
        <meshStandardMaterial color="#151515" metalness={0.2} roughness={0.3} />
      </mesh>

      {/* Zipper detail */}
      <group ref={zipperRef}>
        <mesh position={[0, 0, 0.39]}>
          <boxGeometry args={[0.04, 2.4, 0.02]} />
          <meshStandardMaterial
            color="#888888"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Zipper pull */}
        <mesh position={[0, 0.8, 0.41]}>
          <boxGeometry args={[0.08, 0.15, 0.03]} />
          <meshStandardMaterial color="#cccccc" metalness={1} roughness={0} />
        </mesh>
      </group>

      {/* Left sleeve with improved shape */}
      <group
        ref={sleeveLeftRef}
        position={[-1.25, 0.3, 0]}
        rotation={[0, 0, -0.2]}
      >
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.28, 0.24, 2.2, 32]} />
          <meshStandardMaterial
            color="#080808"
            metalness={0.18}
            roughness={0.32}
          />
        </mesh>

        {/* Sleeve cuff */}
        <mesh position={[0, -1.1, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>

        {/* Modular attachment ring */}
        <mesh position={[0, -0.6, 0]}>
          <torusGeometry args={[0.26, 0.025, 16, 32]} />
          <meshStandardMaterial
            color="#666666"
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Right sleeve */}
      <group
        ref={sleeveRightRef}
        position={[1.25, 0.3, 0]}
        rotation={[0, 0, 0.2]}
      >
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.28, 0.24, 2.2, 32]} />
          <meshStandardMaterial
            color="#080808"
            metalness={0.18}
            roughness={0.32}
          />
        </mesh>

        <mesh position={[0, -1.1, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>

        <mesh position={[0, -0.6, 0]}>
          <torusGeometry args={[0.26, 0.025, 16, 32]} />
          <meshStandardMaterial
            color="#666666"
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Collar detail */}
      <group ref={collarRef} position={[0, 1.5, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.1, 0.25, 0.75]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.25}
            roughness={0.28}
          />
        </mesh>

        {/* Collar fold */}
        <mesh position={[0, 0, 0.2]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[2.1, 0.3, 0.1]} />
          <meshStandardMaterial
            color="#0f0f0f"
            metalness={0.2}
            roughness={0.35}
          />
        </mesh>
      </group>

      {/* Shoulder details */}
      <mesh castShadow position={[-0.9, 1.2, 0]}>
        <boxGeometry args={[0.4, 0.15, 0.72]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.4} roughness={0.5} />
      </mesh>

      <mesh castShadow position={[0.9, 1.2, 0]}>
        <boxGeometry args={[0.4, 0.15, 0.72]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Accent line - glowing detail */}
      <mesh position={[0, 0.5, 0.36]}>
        <boxGeometry args={[1.8, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Bottom modular attachment points */}
      <group position={[0, -1.3, 0.36]}>
        {[-0.7, 0, 0.7].map((x, idx) => (
          <group key={idx} position={[x, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
              <meshStandardMaterial
                color="#888888"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Attachment ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.06, 0.015, 8, 16]} />
              <meshStandardMaterial
                color="#aaaaaa"
                metalness={0.95}
                roughness={0.05}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Pocket details */}
      <mesh castShadow position={[-0.5, -0.5, 0.36]}>
        <boxGeometry args={[0.6, 0.5, 0.02]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.15}
          roughness={0.4}
        />
      </mesh>

      <mesh castShadow position={[0.5, -0.5, 0.36]}>
        <boxGeometry args={[0.6, 0.5, 0.02]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.15}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}
