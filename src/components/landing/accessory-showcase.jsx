// components/landing/accessory-showcase.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlassCard3D } from "./glass-card-3d";

export function AccessoryShowcase() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [80, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, y }}
      className="relative min-h-screen py-32 px-8 md:px-16 flex items-center justify-center"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-6xl md:text-7xl font-light tracking-tighter text-black">
            Earn Rarity
          </h2>
          <p className="text-lg text-gray-500 tracking-wide">
            Verifiable. Tradeable. Yours.
          </p>
        </motion.div>

        {/* Glass card display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <GlassCard3D
            accessoryType="patch"
            rarity="rare"
            title="Genesis Patch"
            description="Rare · Blockchain Verified"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
