// components/landing/hero-section.jsx
import { useRef, Suspense } from "react";
import { motion, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
} from "@react-three/drei";
import { JacketModel } from "./jacket-model";

export function HeroSection({ scrollProgress }) {
  const heroRef = useRef(null);

  // Smooth opacity and scale transforms
  const opacity = useTransform(scrollProgress, [0, 0.5], [1, 0], {
    clamp: true,
  });
  const scale = useTransform(scrollProgress, [0, 0.5], [1, 0.95], {
    clamp: true,
  });

  // Model rotation based on scroll
  const modelRotation = useTransform(scrollProgress, [0, 1], [0, Math.PI * 2]);
  const modelY = useTransform(scrollProgress, [0, 0.5], [0, 2], {
    clamp: false,
  });

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-8 md:px-16"
    >
      <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left side - Minimal Typography */}
        <motion.div
          style={{ opacity, scale }}
          className="space-y-12 lg:space-y-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Brand name */}
            <h1 className="text-[10rem] md:text-[12rem] lg:text-[14rem] font-light tracking-tighter leading-none">
              <span className="block text-black">DROP</span>
            </h1>

            {/* Single powerful statement */}
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-md leading-relaxed tracking-wide">
              Modular fashion.
              <br />
              Verified ownership.
              <br />
              <span className="text-black">Earn your rarity.</span>
            </p>
          </motion.div>

          {/* Minimalist stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex gap-16 border-t border-black/10 pt-8"
          >
            <div>
              <div className="text-5xl font-light text-black mb-2">08</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">
                Base
              </div>
            </div>
            <div>
              <div className="text-5xl font-light text-black mb-2">156</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">
                Modules
              </div>
            </div>
            <div>
              <div className="text-5xl font-light text-black mb-2">
                0.5<span className="text-2xl">%</span>
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">
                Ultra Rare
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - 3D Product with smooth scroll interaction */}
        <motion.div
          style={{ opacity }}
          className="relative h-[600px] lg:h-[800px] w-full"
        >
          <Canvas className="absolute inset-0">
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

            {/* Lighting setup for luxury feel */}
            <ambientLight intensity={0.8} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.5}
              castShadow
            />
            <directionalLight
              position={[-10, -10, -5]}
              intensity={0.5}
              color="#cccccc"
            />
            <spotLight
              position={[0, 10, 0]}
              angle={0.3}
              penumbra={1}
              intensity={0.8}
            />

            <Suspense fallback={null}>
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                <JacketModel
                  scrollProgress={scrollProgress}
                  rotation={modelRotation}
                  yPosition={modelY}
                />
              </Float>
              <Environment preset="studio" />
            </Suspense>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.8}
            />
          </Canvas>
        </motion.div>
      </div>

      {/* Scroll indicator - minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-black/30"
        />
      </motion.div>
    </section>
  );
}
