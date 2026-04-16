"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useAudio } from "@/components/providers/AudioProvider";
import type { Track } from "@/lib/tracks";

interface TrackCardProps {
  track: Track;
  index: number;
}

export default function TrackCard({ track, index }: TrackCardProps) {
  const { currentTrack, isPlaying, togglePlay } = useAudio();
  const isActive = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isActive && isPlaying;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div
        onClick={() => togglePlay(track.id)}
        className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
          isActive ? "glow-box-pink" : "glow-box-purple"
        } hover:scale-[1.03] hover:glow-box-pink`}
      >
        {/* Cover Art */}
        <div className="relative aspect-square">
          <Image
            src={track.coverSrc}
            alt={track.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          {/* Play/Pause Overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
              isCurrentlyPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              {isCurrentlyPlaying ? (
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>

          {/* Active Indicator */}
          {isCurrentlyPlaying && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-bucket-neon-pink rounded-full"
                  animate={{ height: [8, 20, 8] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="p-4 bg-bucket-abyss/80 backdrop-blur-sm">
          <h3 className="text-lg font-bold font-[family-name:var(--font-space-grotesk)] text-white">
            {track.title}
          </h3>
          {track.loreChapter && (
            <p className="text-sm text-bucket-lavender/70 mt-1">
              {track.loreChapter}: {track.loreTitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
