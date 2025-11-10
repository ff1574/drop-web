// components/landing/scroll-indicator.jsx
import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-white/50 uppercase font-mono tracking-wider">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-3 bg-white/50 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}
