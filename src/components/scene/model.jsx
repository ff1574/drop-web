import React, { useRef } from "react";
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";

export default function Model() {
  const { nodes } = useGLTF("/medias/base.glb");
  const { viewport } = useThree();
  const torus = useRef(null);
  console.log("Available nodes:", Object.keys(nodes));

  useFrame(() => {
    torus.current.rotation.y += 0.006;
  });

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
  });

  return (
    <group scale={viewport.width / 6}>
      <Text
        position={[0, 0, -1]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        DROP
      </Text>
      <mesh ref={torus} {...nodes.o_model}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
