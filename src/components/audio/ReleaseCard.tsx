"use client";

import Image from "next/image";
import { useAudio } from "@/components/providers/AudioProvider";
import { latestTrack, type Track } from "@/lib/tracks";

interface ReleaseCardProps {
  track: Track;
  /** Show title + play button. Off for dimmed side cards in the carousel. */
  active?: boolean;
  sizes?: string;
  priority?: boolean;
  /** "overlay": caption over the art (carousel). "stacked": square art, caption below. */
  layout?: "overlay" | "stacked";
}

export default function ReleaseCard({
  track,
  active = true,
  sizes = "(max-width: 768px) 300px, 340px",
  priority = false,
  layout = "overlay",
}: ReleaseCardProps) {
  const { currentTrack, isPlaying, togglePlay } = useAudio();
  const isCurrentlyPlaying = currentTrack?.id === track.id && isPlaying;

  const playButton = (
    <button
      type="button"
      onClick={() => togglePlay(track.id)}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={`${isCurrentlyPlaying ? "Pause" : "Play"} ${track.title}`}
      className="shrink-0 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-105"
    >
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
    </button>
  );

  const caption = (
    <div className="min-w-0">
      {/* Rendered (invisible) on every card so titles line up side by side */}
      <p
        aria-hidden={track.id !== latestTrack.id}
        className={`text-[10px] tracking-[0.3em] uppercase text-bucket-neon-pink mb-1 font-[family-name:var(--font-space-grotesk)] ${
          track.id === latestTrack.id ? "" : "invisible"
        }`}
      >
        Latest release
      </p>
      <h3 className="text-2xl sm:text-3xl font-bold text-white truncate font-[family-name:var(--font-space-grotesk)]">
        {track.title}
      </h3>
      <p className="text-sm text-bucket-lavender/80">Bucket The Kid</p>
    </div>
  );

  if (layout === "stacked") {
    return (
      <div>
        <div
          className={`group relative aspect-square rounded-3xl overflow-hidden border border-white/10 transition-shadow duration-500 ${
            isCurrentlyPlaying ? "glow-box-pink" : "glow-box-purple"
          }`}
        >
          <Image
            src={track.coverSrc}
            alt={`${track.title} cover art`}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute top-4 right-4">{playButton}</div>
        </div>
        <div className="mt-5 px-1">{caption}</div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full rounded-3xl overflow-hidden border border-white/10 transition-shadow duration-500 ${
        active ? (isCurrentlyPlaying ? "glow-box-pink" : "glow-box-purple") : ""
      }`}
    >
      <Image
        src={track.coverSrc}
        alt={active ? `${track.title} cover art` : ""}
        fill
        draggable={false}
        sizes={sizes}
        priority={priority}
        className="object-cover select-none"
      />

      {/* Dim side cards */}
      <div
        className={`absolute inset-0 bg-bucket-void transition-opacity duration-500 ${
          active ? "opacity-0" : "opacity-40"
        }`}
      />

      {active && (
        <>
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-bucket-void/95 via-bucket-void/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
            {caption}
            {playButton}
          </div>
        </>
      )}
    </div>
  );
}
