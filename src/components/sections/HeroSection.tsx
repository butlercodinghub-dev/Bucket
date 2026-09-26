"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import NeonGlyphs from "@/components/ui/NeonGlyphs";
import { useAudio } from "@/components/providers/AudioProvider";
import { latestTrack } from "@/lib/tracks";
import heroArt from "@/assets/images/hero-21x9.jpg";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const spring = { stiffness: 80, damping: 20, mass: 0.6 };

export default function HeroSection() {
  const { currentTrack, isPlaying, togglePlay } = useAudio();
  const isLatestPlaying = currentTrack?.id === latestTrack.id && isPlaying;
  const reduceMotion = useReducedMotion();

  // Pointer position across the hero, -0.5 … 0.5 (0 = centre)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  // Artwork drifts against the cursor and tilts slightly — depth without motion when idle
  const artX = useTransform(sx, (v) => v * -26);
  const artY = useTransform(sy, (v) => v * -14);
  const rotateY = useTransform(sx, (v) => v * 4);
  const rotateX = useTransform(sy, (v) => v * -3);

  // Glyphs sit "in front", so they move with the cursor and further
  const glyphX = useTransform(sx, (v) => v * 50);
  const glyphY = useTransform(sy, (v) => v * 30);

  // Soft light that follows the cursor
  const glowX = useTransform(sx, (v) => `${(v + 0.5) * 100}%`);
  const glowY = useTransform(sy, (v) => `${(v + 0.5) * 100}%`);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, rgba(244,114,182,0.28), rgba(103,232,249,0.12) 40%, transparent 70%)`;

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      id="home"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative w-full bg-bucket-void lg:px-4 lg:pt-4"
    >
      {/* 21:9 card on wide screens; full-height crop on tablets and phones */}
      <div
        className="relative w-full h-[100svh] lg:h-auto lg:aspect-[21/9] lg:min-h-[560px] lg:max-h-[calc(100svh-2rem)] overflow-hidden lg:rounded-3xl lg:border lg:border-white/5"
        style={{ perspective: 1200 }}
      >
        {/* Artwork — oversized so drifting never reveals an edge */}
        <motion.div
          className="absolute -inset-[2.5%]"
          style={{ x: artX, y: artY, rotateX, rotateY }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={heroArt}
            alt="Bucket The Kid standing in a neon flower field under his name written in the clouds"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[50%_15%]"
          />
        </motion.div>

        {/* Cursor light */}
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-screen hidden lg:block"
          style={{ backgroundImage: glow, zIndex: 2 }}
        />

        {/* Readability overlays: left fade for the text, top fade for the nav */}
        <div
          className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-bucket-void/90 from-5% via-bucket-void/45 via-25% to-transparent to-50% lg:to-40%"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bucket-void/60 to-transparent"
          style={{ zIndex: 2 }}
        />

        {/* Floating neon glyphs */}
        <motion.div className="absolute inset-0" style={{ x: glyphX, y: glyphY, zIndex: 3 }}>
          <NeonGlyphs />
        </motion.div>

        {/* Artist text — the name itself is painted into the artwork */}
        <div
          className="absolute inset-0 flex items-end lg:items-center px-6 pb-20 lg:pb-0 lg:pt-16 sm:px-10 lg:px-16 4k:px-32"
          style={{ zIndex: 4 }}
        >
          <div className="max-w-sm 4k:max-w-xl">
            {/* Visible on narrow screens, where the crop cuts off the painted name */}
            <motion.h1
              {...fadeUp(0.45)}
              className="lg:sr-only mb-4 text-5xl sm:text-6xl font-bold leading-[0.95] tracking-tight text-white font-[family-name:var(--font-space-grotesk)] drop-shadow-[0_2px_12px_rgba(10,1,24,0.8)]"
            >
              Bucket <span className="block text-bucket-sky-light glow-cyan">The Kid</span>
            </motion.h1>

            {/* Waveform glyph */}
            <motion.svg
              {...fadeUp(0.5)}
              className="w-12 h-6 mb-5 text-bucket-neon-pink drop-shadow-[0_0_6px_var(--color-bucket-neon-pink)]"
              viewBox="0 0 48 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 12 L8 4 L14 20 L20 4 L26 20 L32 4 L38 20 L46 12" />
            </motion.svg>

            <motion.p
              {...fadeUp(0.6)}
              className="text-sm sm:text-base tracking-[0.35em] uppercase text-bucket-lavender font-[family-name:var(--font-space-grotesk)]"
            >
              New Era DJ
            </motion.p>

            <motion.a
              {...fadeUp(0.75)}
              href="#music"
              className="mt-6 block text-white font-[family-name:var(--font-space-grotesk)]"
            >
              <span className="block text-xs tracking-[0.3em] uppercase text-bucket-lavender/70">
                Available now
              </span>
              <span className="mt-1 inline-block text-3xl sm:text-4xl lg:text-5xl 4k:text-7xl font-bold leading-tight">
                {latestTrack.title}
                <span className="mt-2 block h-[3px] rounded-full bg-bucket-pink shadow-[0_0_10px_var(--color-bucket-pink)]" />
              </span>
            </motion.a>

            <motion.div {...fadeUp(0.9)} className="mt-8">
              <button
                type="button"
                onClick={() => togglePlay(latestTrack.id)}
                className="inline-flex items-center gap-3 pl-6 pr-8 py-3 rounded-full bg-bucket-lavender text-bucket-void font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(196,181,253,0.5)]"
              >
                {isLatestPlaying ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
                {isLatestPlaying ? "Pause" : "Play"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
