"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/providers/AudioProvider";

export default function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    togglePlay,
    seek,
    next,
    prev,
  } = useAudio();

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    seek(pct * duration);
  };

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Progress Bar */}
          <div
            className="h-1 bg-white/10 cursor-pointer group"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-gradient-to-r from-bucket-pink to-bucket-neon-pink transition-all group-hover:h-1.5"
              style={{
                width: duration > 0 ? `${(progress / duration) * 100}%` : "0%",
              }}
            />
          </div>

          {/* Player Bar */}
          <div className="flex items-center gap-4 px-4 sm:px-6 py-3 bg-bucket-abyss/90 backdrop-blur-xl border-t border-white/5">
            {/* Track Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0 glow-box-purple"
                style={{
                  backgroundImage: `url(${currentTrack.coverSrc})`,
                }}
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate font-[family-name:var(--font-space-grotesk)]">
                  {currentTrack.title}
                </p>
                <p className="text-xs text-bucket-lavender/60">
                  Bucket The Kid
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              <button
                onClick={() => togglePlay()}
                className="w-10 h-10 rounded-full bg-bucket-pink/20 border border-bucket-pink/40 flex items-center justify-center hover:bg-bucket-pink/30 transition-colors"
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
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zm10-12v12h2V6h-2z" />
                </svg>
              </button>
            </div>

            {/* Time */}
            <div className="hidden sm:flex text-xs text-bucket-lavender/50 gap-1 tabular-nums">
              <span>{formatTime(progress)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
