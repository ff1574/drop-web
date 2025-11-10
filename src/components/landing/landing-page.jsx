// components/landing/landing-page.jsx
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { HeroSection } from "./hero-section";
import { AccessoryShowcase } from "./accessory-showcase";

export function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-white overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10">
        <HeroSection scrollProgress={smoothProgress} />
        <AccessoryShowcase />
      </div>
    </div>
  );
}
