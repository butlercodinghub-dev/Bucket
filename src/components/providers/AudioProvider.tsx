"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { Howl } from "howler";
import { tracks, type Track } from "@/lib/tracks";

interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  play: (trackId: string) => void;
  pause: () => void;
  resume: () => void;
  togglePlay: (trackId?: string) => void;
  seek: (position: number) => void;
  next: () => void;
  prev: () => void;
}

const AudioContext = createContext<AudioState | null>(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}

export default function AudioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const howlRef = useRef<Howl | null>(null);
  const rafRef = useRef<number>(0);

  const startProgressLoop = useCallback(() => {
    const tick = () => {
      if (howlRef.current && howlRef.current.playing()) {
        setProgress(howlRef.current.seek() as number);
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const play = useCallback(
    function playTrack(trackId: string) {
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return;

      // Capture the outgoing howl: by the time the timeout fires,
      // howlRef.current already points at the new track.
      const outgoing = howlRef.current;
      if (outgoing) {
        outgoing.fade(outgoing.volume(), 0, 400);
        setTimeout(() => outgoing.unload(), 400);
      }

      cancelAnimationFrame(rafRef.current);

      // Ignore events from a howl that has since been replaced (e.g. the
      // outgoing track firing "stop" when it unloads after a switch).
      const isCurrent = () => howlRef.current === howl;

      const howl = new Howl({
        src: [track.audioSrc],
        html5: true,
        volume: 0,
        onplay: () => {
          if (!isCurrent()) return;
          setIsPlaying(true);
          setDuration(howl.duration());
          howl.fade(0, 1, 500);
          startProgressLoop();
        },
        onend: () => {
          if (!isCurrent()) return;
          setIsPlaying(false);
          setProgress(0);
          // Auto-advance to the next track in the list
          const idx = tracks.findIndex((t) => t.id === track.id);
          playTrack(tracks[(idx + 1) % tracks.length].id);
        },
        onpause: () => {
          if (isCurrent()) setIsPlaying(false);
        },
        onstop: () => {
          if (!isCurrent()) return;
          setIsPlaying(false);
          setProgress(0);
        },
        onload: () => {
          if (isCurrent()) setDuration(howl.duration());
        },
      });

      howlRef.current = howl;
      setCurrentTrack(track);
      howl.play();
    },
    [startProgressLoop]
  );

  const pause = useCallback(() => {
    howlRef.current?.pause();
    cancelAnimationFrame(rafRef.current);
  }, []);

  const resume = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.play();
    }
  }, []);

  const togglePlay = useCallback(
    (trackId?: string) => {
      if (trackId && (!currentTrack || currentTrack.id !== trackId)) {
        play(trackId);
      } else if (isPlaying) {
        pause();
      } else {
        resume();
      }
    },
    [currentTrack, isPlaying, play, pause, resume]
  );

  const seek = useCallback((position: number) => {
    if (howlRef.current) {
      howlRef.current.seek(position);
      setProgress(position);
    }
  }, []);

  const next = useCallback(() => {
    if (!currentTrack) return;
    const idx = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextTrack = tracks[(idx + 1) % tracks.length];
    play(nextTrack.id);
  }, [currentTrack, play]);

  const prev = useCallback(() => {
    if (!currentTrack) return;
    const idx = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevTrack = tracks[(idx - 1 + tracks.length) % tracks.length];
    play(prevTrack.id);
  }, [currentTrack, play]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      howlRef.current?.unload();
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        play,
        pause,
        resume,
        togglePlay,
        seek,
        next,
        prev,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
