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

  const updateProgress = useCallback(() => {
    if (howlRef.current && howlRef.current.playing()) {
      setProgress(howlRef.current.seek() as number);
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  const play = useCallback(
    (trackId: string) => {
      const track = tracks.find((t) => t.id === trackId);
      if (!track) return;

      if (howlRef.current) {
        howlRef.current.fade(1, 0, 400);
        setTimeout(() => {
          howlRef.current?.unload();
        }, 400);
      }

      cancelAnimationFrame(rafRef.current);

      const howl = new Howl({
        src: [track.audioSrc],
        html5: true,
        volume: 0,
        onplay: () => {
          setIsPlaying(true);
          setDuration(howl.duration());
          howl.fade(0, 1, 500);
          rafRef.current = requestAnimationFrame(updateProgress);
        },
        onend: () => {
          setIsPlaying(false);
          setProgress(0);
        },
        onpause: () => {
          setIsPlaying(false);
        },
        onstop: () => {
          setIsPlaying(false);
          setProgress(0);
        },
        onload: () => {
          setDuration(howl.duration());
        },
      });

      howlRef.current = howl;
      setCurrentTrack(track);
      howl.play();
    },
    [updateProgress]
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
