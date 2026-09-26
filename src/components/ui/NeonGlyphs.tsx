"use client";

import { motion } from "framer-motion";

// Neon line glyphs in the style of the hero's pink zigzag
const shapes = {
  zigzag: { viewBox: "0 0 48 24", d: "M2 12 L8 4 L14 20 L20 4 L26 20 L32 4 L38 20 L46 12" },
  wave: { viewBox: "0 0 48 24", d: "M2 12 C8 2 14 2 20 12 S32 22 38 12 S44 4 46 8" },
  squiggle: { viewBox: "0 0 40 24", d: "M2 16 Q8 4 14 14 T26 12 T38 8" },
  spark: { viewBox: "0 0 24 24", d: "M12 2 V22 M2 12 H22 M5 5 L19 19 M19 5 L5 19" },
  peaks: { viewBox: "0 0 32 24", d: "M2 20 L10 6 L16 16 L22 4 L30 20" },
} as const;

const colors = {
  pink: "text-bucket-neon-pink",
  cyan: "text-bucket-sky-light",
  purple: "text-bucket-purple",
  coral: "text-bucket-coral",
  lavender: "text-bucket-lavender",
} as const;

interface Glyph {
  shape: keyof typeof shapes;
  color: keyof typeof colors;
  /** Tailwind position + size classes */
  className: string;
  rotate: number;
  delay: number;
}

// Kept to the edges and away from the centre, where the character sits
const glyphs: Glyph[] = [
  { shape: "wave", color: "cyan", className: "top-[11%] left-[24%] w-16", rotate: -8, delay: 0.9 },
  { shape: "spark", color: "lavender", className: "top-[16%] right-[7%] w-7", rotate: 0, delay: 1.1 },
  { shape: "zigzag", color: "cyan", className: "top-[46%] right-[4%] w-16", rotate: 12, delay: 1.3 },
  { shape: "squiggle", color: "coral", className: "bottom-[24%] right-[14%] w-16", rotate: -10, delay: 1.5 },
  { shape: "peaks", color: "purple", className: "bottom-[10%] left-[8%] w-12", rotate: 6, delay: 1.7 },
  { shape: "wave", color: "coral", className: "bottom-[20%] left-[30%] w-12 hidden md:block", rotate: 14, delay: 1.4 },
  { shape: "spark", color: "cyan", className: "bottom-[12%] right-[40%] w-5 hidden md:block", rotate: 20, delay: 1.2 },
  { shape: "zigzag", color: "lavender", className: "top-[64%] right-[30%] w-12 hidden lg:block", rotate: -14, delay: 1.6 },
];

export default function NeonGlyphs() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {glyphs.map((g, i) => {
        const shape = shapes[g.shape];
        return (
          <motion.div
            key={i}
            className={`absolute ${g.className}`}
            initial={{ opacity: 0, scale: 0.6, rotate: g.rotate }}
            animate={{ opacity: [0, 0.9, 0.9], scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: g.delay },
              scale: { duration: 0.8, delay: g.delay, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 4 + (i % 3), delay: g.delay, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <svg
              className={`w-full h-auto ${colors[g.color]} drop-shadow-[0_0_2px_rgba(10,1,24,0.9)] drop-shadow-[0_0_8px_currentColor]`}
              viewBox={shape.viewBox}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={shape.d} />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
