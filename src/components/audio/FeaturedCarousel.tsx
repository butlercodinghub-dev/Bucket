"use client";

import { useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import ReleaseCard from "@/components/audio/ReleaseCard";
import { tracks } from "@/lib/tracks";

const SWIPE_THRESHOLD = 60;

/** Signed distance from the centre slot, wrapped so the carousel loops. */
function wrappedOffset(i: number, center: number, n: number) {
  let d = i - center;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}

export default function FeaturedCarousel() {
  const [center, setCenter] = useState(0);
  const n = tracks.length;

  const go = (step: number) => setCenter((c) => (c + step + n) % n);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  };

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="All songs"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div className="relative h-[280px] sm:h-[320px] md:h-[360px] 4k:h-[520px]">
        {tracks.map((track, i) => {
          const offset = wrappedOffset(i, center, n);
          const abs = Math.abs(offset);
          const isCenter = offset === 0;

          return (
            <motion.div
              key={track.id}
              className={`absolute top-1/2 left-1/2 w-[260px] sm:w-[300px] md:w-[340px] 4k:w-[500px] aspect-square -ml-[130px] sm:-ml-[150px] md:-ml-[170px] 4k:-ml-[250px] ${
                isCenter ? "cursor-grab active:cursor-grabbing" : "hidden md:block cursor-pointer"
              }`}
              style={{ zIndex: 10 - abs, pointerEvents: abs > 2 ? "none" : "auto" }}
              initial={false}
              animate={{
                x: `${offset * 58}%`,
                y: "-50%",
                scale: 1 - abs * 0.14,
                opacity: abs > 2 ? 0 : 1 - abs * 0.3,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              drag={isCenter ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={isCenter ? onDragEnd : undefined}
              onClick={isCenter ? undefined : () => go(offset)}
              aria-hidden={!isCenter}
            >
              <ReleaseCard track={track} active={isCenter} priority={isCenter} />
            </motion.div>
          );
        })}
      </div>

      {/* Arrows + dots */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <ArrowButton direction="prev" onClick={() => go(-1)} />
        <div className="flex gap-2">
          {tracks.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setCenter(i)}
              aria-label={`Show ${t.title}`}
              aria-current={i === center}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === center ? "w-6 bg-bucket-neon-pink" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <ArrowButton direction="next" onClick={() => go(1)} />
      </div>
    </div>
  );
}

export function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className="w-10 h-10 rounded-full border border-white/15 text-bucket-lavender flex items-center justify-center transition-colors hover:border-bucket-neon-pink hover:text-bucket-neon-pink"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={direction === "prev" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
        />
      </svg>
    </button>
  );
}
