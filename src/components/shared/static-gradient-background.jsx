import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function StaticGradientBackground() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Theme-specific configurations
  const themeConfig = {
    light: {
      primaryOrb: "#f59e0b", // amber-500
      secondaryOrb: "#9333ea", // purple-600
      gridOpacity: "opacity-5",
    },
    dark: {
      primaryOrb: "#0f172a", // slate-900
      secondaryOrb: "#f59e0b", // amber-500
      gridOpacity: "opacity-5",
    },
    sunset: {
      primaryOrb: "#f59e0b", // amber-500
      secondaryOrb: "#9333ea", // purple-600
      gridOpacity: "opacity-5",
    },
  };

  const config = themeConfig.dark;

  return (
    <div className="fixed inset-0 -inset-y-30 -z-10 overflow-hidden">
      {/* Base gradient */}
      <motion.div
        className={`absolute inset-0 bg-linear-to-br from-slate-800/90 via-slate-900/80 to-zinc-900/90`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Static gradient orbs */}
      <div className="absolute inset-0 opacity-30">
        {/* Top left orb */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[100px] -top-16 -left-16"
          style={{ backgroundColor: config.primaryOrb }}
        />

        {/* Bottom right orb */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[100px] -bottom-16 -right-32"
          style={{ backgroundColor: config.secondaryOrb }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwTDYwIDAiLz48L2c+PC9zdmc+')] bg-center ${config.gridOpacity}`}
      />
    </div>
  );
}
