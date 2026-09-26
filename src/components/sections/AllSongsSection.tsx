"use client";

import { motion } from "framer-motion";
import FeaturedCarousel from "@/components/audio/FeaturedCarousel";
import GlowText from "@/components/ui/GlowText";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function AllSongsSection() {
  return (
    <section
      id="songs"
      className="relative py-24 sm:py-32 4k:py-48 px-4 sm:px-6 lg:px-8 4k:px-16 bg-gradient-to-b from-[#4c1d95] via-[#3b1580] to-[#4c1d95] overflow-hidden"
    >
      {/* Ambient glow orb */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-bucket-cyan/10 blur-[120px] animate-pulse-glow pointer-events-none" />

      <div className="relative max-w-6xl 4k:max-w-[1800px] mx-auto">
        {/* Heading */}
        <motion.div {...reveal} className="text-center mb-12 sm:mb-16">
          <p className="text-bucket-cyan text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-space-grotesk)]">
            The Catalog
          </p>
          <GlowText
            as="h2"
            color="cyan"
            className="text-4xl sm:text-5xl md:text-6xl 4k:text-8xl font-extrabold font-[family-name:var(--font-space-grotesk)]"
          >
            All Songs
          </GlowText>
        </motion.div>

        <motion.div {...reveal}>
          <FeaturedCarousel />
        </motion.div>
      </div>
    </section>
  );
}
