"use client";

import { motion } from "framer-motion";
import ReleaseCard from "@/components/audio/ReleaseCard";
import GlowText from "@/components/ui/GlowText";
import { newReleases } from "@/lib/tracks";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function MusicSection() {
  return (
    <section
      id="music"
      className="relative py-24 sm:py-32 4k:py-48 px-4 sm:px-6 lg:px-8 4k:px-16 bg-hero-gradient overflow-hidden"
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full bg-bucket-purple/10 blur-[100px] animate-pulse-glow pointer-events-none" />
      <div
        className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-bucket-pink/10 blur-[120px] animate-pulse-glow pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative max-w-6xl 4k:max-w-[1800px] mx-auto">
        {/* Heading */}
        <motion.div {...reveal} className="text-center mb-12 sm:mb-16">
          <p className="text-bucket-cyan text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-space-grotesk)]">
            Out now
          </p>
          <GlowText
            as="h2"
            color="pink"
            className="text-4xl sm:text-5xl md:text-6xl 4k:text-8xl font-extrabold font-[family-name:var(--font-space-grotesk)]"
          >
            New Releases
          </GlowText>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-10 lg:gap-16 max-w-4xl 4k:max-w-6xl mx-auto">
          {newReleases.map((track, i) => (
            <motion.div
              key={track.id}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.15 }}
            >
              <ReleaseCard
                track={track}
                layout="stacked"
                priority={i === 0}
                sizes="(max-width: 640px) 90vw, 440px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
