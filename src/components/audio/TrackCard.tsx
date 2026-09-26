"use client";

import Image from "next/image";
import { useAudio } from "@/components/providers/AudioProvider";
import type { Track } from "@/lib/tracks";

interface TrackCardProps {
  track: Track;
}

export default function TrackCard({ track }: TrackCardProps) {
  const { currentTrack, isPlaying, togglePlay } = useAudio();
  const isActive = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isActive && isPlaying;

  return (
    <button
      type="button"
      onClick={() => togglePlay(track.id)}
      aria-label={`${isCurrentlyPlaying ? "Pause" : "Play"} ${track.title}`}
      className={`group relative w-full text-left rounded-2xl overflow-hidden bg-bucket-abyss/80 transition-all duration-300 hover:-translate-y-1 ${
        isActive ? "glow-box-pink" : "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
      }`}
    >
      {/* Cover Art */}
      <div className="relative aspect-square">
        <Image
          src={track.coverSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 45vw, 220px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Play/Pause Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
            isCurrentlyPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            {isCurrentlyPlaying ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Track Info */}
      <div className="px-3 py-3 text-center">
        <h3 className="text-sm font-bold truncate font-[family-name:var(--font-space-grotesk)] text-white">
          {track.title}
        </h3>
        <p className="text-xs text-bucket-lavender/60 mt-0.5">Bucket The Kid</p>
      </div>
    </button>
  );
}
