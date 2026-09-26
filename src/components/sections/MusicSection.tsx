"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import TrackCard from "@/components/audio/TrackCard";
import FeaturedCarousel, { ArrowButton } from "@/components/audio/FeaturedCarousel";
import GlowText from "@/components/ui/GlowText";
import { tracks } from "@/lib/tracks";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function MusicSection() {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollRow = (dir: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : row.clientWidth * 0.8;
    row.scrollBy({ left: dir * step, behavior: "smooth" });
  };

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
            The Music
          </p>
          <GlowText
            as="h2"
            color="pink"
            className="text-4xl sm:text-5xl md:text-6xl 4k:text-8xl font-extrabold font-[family-name:var(--font-space-grotesk)]"
          >
            New Releases
          </GlowText>
        </motion.div>

        {/* Featured coverflow */}
        <motion.div {...reveal}>
          <FeaturedCarousel />
        </motion.div>

        {/* All songs row */}
        <motion.div {...reveal} className="mt-20 sm:mt-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">
              All Songs
            </h3>
            <div className="flex gap-3">
              <ArrowButton direction="prev" onClick={() => scrollRow(-1)} />
              <ArrowButton direction="next" onClick={() => scrollRow(1)} />
            </div>
          </div>

          <div
            ref={rowRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tracks.map((track) => (
              <div key={track.id} className="snap-start shrink-0 w-[42vw] sm:w-[200px] 4k:w-[300px]">
                <TrackCard track={track} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
