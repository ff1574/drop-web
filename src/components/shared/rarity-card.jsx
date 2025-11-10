// components/landing/rarity-card.jsx
import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";

export function RarityCard({ rarity }) {
  const glowColors = {
    gray: "shadow-gray-500/50",
    green: "shadow-green-500/50",
    blue: "shadow-blue-500/50",
    purple: "shadow-purple-500/50",
    yellow: "shadow-yellow-500/50",
    pink: "shadow-pink-500/50",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard
        className={`p-6 hover:bg-white/10 transition-all duration-300 ${glowColors[rarity.glow]}`}
      >
        {/* Colored bar */}
        <div
          className={`h-1 w-full rounded-full bg-gradient-to-r ${rarity.color} mb-4`}
        />

        {/* Rarity name */}
        <div className="text-white font-bold text-sm mb-2 tracking-tight">
          {rarity.name}
        </div>

        {/* Drop chance */}
        <div className="text-2xl font-black text-white font-mono">
          {rarity.chance}
        </div>

        {/* Label */}
        <div className="text-xs text-white/50 uppercase font-mono mt-1">
          Drop Rate
        </div>
      </GlassCard>
    </motion.div>
  );
}
