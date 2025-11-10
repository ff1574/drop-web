// components/landing/loot-box-section.jsx
import { motion } from "framer-motion";
import {
  LootBoxStyle1,
  LootBoxStyle2,
  LootBoxStyle3,
  LootBoxStyle4,
} from "../ui/lootbox-variations";

export function LootBoxSection() {
  const handleBoxClick = (variant) => {
    console.log(`${variant} crate clicked`);
  };

  const styles = [
    { Component: LootBoxStyle1, title: "3D Interactive" },
    { Component: LootBoxStyle2, title: "Minimal Flat" },
    { Component: LootBoxStyle3, title: "Neon Cyberpunk" },
    { Component: LootBoxStyle4, title: "Luxury Embossed" },
  ];

  const variants = ["default", "premium", "elite"];

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 mb-32">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24 space-y-4"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-black">
            Unlock Modules
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Random drops. Verified ownership. True rarity.
          </p>
        </motion.div>

        {/* Display each style variation */}
        {styles.map((style, styleIdx) => (
          <div key={styleIdx} className="mb-24 last:mb-0">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-light text-center mb-8 text-gray-600"
            >
              Style {styleIdx + 1}: {style.title}
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {variants.map((variant) => (
                <style.Component
                  key={variant}
                  variant={variant}
                  onClick={() => handleBoxClick(variant)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
