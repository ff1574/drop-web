// components/landing/glass-card-variants.jsx
// Additional accessory types you can use

// Bluetooth Speaker variant
export function SpeakerAccessory({ position = [0, 0, 0.1] }) {
  const itemRef = useRef();

  useFrame((state) => {
    if (itemRef.current) {
      itemRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={itemRef} position={position} scale={0.8}>
      {/* Speaker body */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.7}
          roughness={0.3}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Speaker grille */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.02, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* LED indicator */}
      <mesh position={[0.3, 0, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Attachment clip */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.6, 0.08, 0.08]} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Patch variant
export function PatchAccessory({ position = [0, 0, 0.1] }) {
  const itemRef = useRef();

  useFrame((state) => {
    if (itemRef.current) {
      itemRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={itemRef} position={position}>
      {/* Patch base - hexagonal */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.03, 6]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Embroidered design */}
      <mesh position={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.3, 0.3, 0.01, 6]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}
