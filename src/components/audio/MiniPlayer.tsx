"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/providers/AudioProvider";

const formatTime = (secs: number) => {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export default function MiniPlayer() {
  const { currentTrack, isPlaying, progress, duration, togglePlay, seek, next, prev } =
    useAudio();

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    seek(ratio * duration);
  };

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-bucket-abyss/90 backdrop-blur-xl border-t border-white/5"
        >
          {/* Thin progress bar — mobile only (desktop has the scrubber) */}
          <div className="sm:hidden h-1 bg-white/10" onClick={handleSeek}>
            <div
              className="h-full bg-gradient-to-r from-bucket-pink to-bucket-neon-pink"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="max-w-6xl 4k:max-w-[1800px] mx-auto flex items-center gap-4 sm:gap-8 px-4 sm:px-6 py-3">
            {/* Track info */}
            <div className="flex items-center gap-3 flex-1 sm:flex-none sm:w-56 min-w-0">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 glow-box-purple">
                <Image src={currentTrack.coverSrc} alt="" fill sizes="44px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate font-[family-name:var(--font-space-grotesk)]">
                  {currentTrack.title}
                </p>
                <p className="text-xs text-bucket-lavender/60">Bucket The Kid</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={prev}
                aria-label="Previous track"
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              <button
                onClick={() => togglePlay()}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="w-11 h-11 rounded-full bg-white/15 border border-white/20 flex items-center justify-center hover:bg-bucket-pink/30 hover:border-bucket-pink/50 transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button
                onClick={next}
                aria-label="Next track"
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zm10-12v12h2V6h-2z" />
                </svg>
              </button>
            </div>

            {/* Scrubber — sm and up */}
            <div className="hidden sm:flex flex-1 items-center gap-3 text-xs text-bucket-lavender/60 tabular-nums">
              <span className="w-9 text-right">{formatTime(progress)}</span>
              <div
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(progress)}
                tabIndex={0}
                onClick={handleSeek}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") seek(Math.min(progress + 5, duration));
                  if (e.key === "ArrowLeft") seek(Math.max(progress - 5, 0));
                }}
                className="group relative flex-1 h-4 flex items-center cursor-pointer"
              >
                <div className="w-full h-1 rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-bucket-pink to-bucket-neon-pink"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div
                  className="absolute w-3 h-3 -ml-1.5 rounded-full bg-white shadow-[0_0_8px_var(--color-bucket-neon-pink)] opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${pct}%` }}
                />
              </div>
              <span className="w-9">{formatTime(duration)}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
