"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import ParallaxStarfield from "@/components/parallax/ParallaxStarfield";
import ParallaxClouds from "@/components/parallax/ParallaxClouds";
import GlowText from "@/components/ui/GlowText";
import NeonGlyphs from "@/components/ui/NeonGlyphs";
import { useAudio } from "@/components/providers/AudioProvider";
import { latestTrack } from "@/lib/tracks";
import heroStill from "@/assets/images/character-anchor.jpg";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Parallax layer — oversized, GSAP moves this
  const parallaxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stillRef = useRef<HTMLDivElement>(null);
  const { currentTrack, isPlaying, togglePlay } = useAudio();
  const isLatestPlaying = currentTrack?.id === latestTrack.id && isPlaying;

  useEffect(() => {
    const video = videoRef.current;
    const still = stillRef.current;
    if (!video || !still) return;

    // Fade to static image when video ends
    const onVideoEnd = () => {
      gsap.to(video, { opacity: 0, duration: 1.5, ease: "power2.inOut" });
      gsap.to(still, { opacity: 1, duration: 1.5, ease: "power2.inOut" });
    };

    video.addEventListener("ended", onVideoEnd);
    gsap.to(video, { opacity: 1, duration: 1.2, delay: 0.3, ease: "power2.out" });

    return () => {
      video.removeEventListener("ended", onVideoEnd);
    };
  }, []);

  // Scroll parallax — applied to oversized inner layer only
  useGSAP(
    () => {
      if (!sectionRef.current || !parallaxRef.current) return;

      gsap.to(parallaxRef.current, {
        y: "-12%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-[100svh] md:p-4 bg-bucket-void"
    >
      {/* Rounded hero card */}
      <div className="relative w-full h-full overflow-hidden md:rounded-3xl md:border md:border-white/5">
        {/* Starfield */}
        <div className="absolute inset-0">
          <ParallaxStarfield />
        </div>

        {/* Media layer — clipped by the card */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          {/* Parallax inner layer — extends beyond the card so scroll
              movement never reveals a gap */}
          <div
            ref={parallaxRef}
            className="absolute"
            style={{ top: "-20%", left: "-5%", right: "-5%", bottom: "-20%" }}
          >
            <video
              ref={videoRef}
              src="/video/hero-main.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0"
            />

            {/* Static hero image — fades in when video ends */}
            <div ref={stillRef} className="absolute inset-0 opacity-0">
              <Image
                src={heroStill}
                alt="Bucket The Kid"
                fill
                priority
                sizes="110vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Readability overlays: left-side fade for the text, bottom fade into the page */}
        <div
          className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-bucket-void/95 from-15% via-bucket-void/75 via-45% to-transparent to-75%"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bucket-void/70 to-transparent"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bucket-void/70 to-transparent"
          style={{ zIndex: 2 }}
        />

        {/* Floating neon glyphs */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          <NeonGlyphs />
        </div>

        {/* Artist text */}
        <div
          className="absolute inset-0 flex items-end md:items-center px-6 pb-24 md:pb-0 sm:px-10 lg:px-20 4k:px-32"
          style={{ zIndex: 4 }}
        >
          <div className="max-w-xl 4k:max-w-3xl">
            {/* Waveform glyph */}
            <motion.svg
              {...fadeUp(0.6)}
              className="w-12 h-6 mb-6 text-bucket-neon-pink drop-shadow-[0_0_6px_var(--color-bucket-neon-pink)]"
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

            <motion.h1
              {...fadeUp(0.7)}
              className="font-[family-name:var(--font-space-grotesk)] font-bold leading-[0.95] tracking-tight text-6xl sm:text-7xl lg:text-8xl 4k:text-[10rem]"
            >
              <span className="block text-white">Bucket</span>
              <GlowText as="span" color="cyan" className="block text-bucket-sky-light">
                The Kid
              </GlowText>
            </motion.h1>

            <motion.p
              {...fadeUp(0.85)}
              className="mt-5 text-sm sm:text-base tracking-[0.35em] uppercase text-bucket-lavender font-[family-name:var(--font-space-grotesk)]"
            >
              New Era DJ
            </motion.p>

            <motion.a
              {...fadeUp(1)}
              href="#music"
              className="mt-8 inline-block text-white text-base sm:text-lg tracking-wide uppercase font-[family-name:var(--font-space-grotesk)]"
            >
              Available now · {latestTrack.title}
              <span className="mt-1 block h-[3px] rounded-full bg-bucket-pink shadow-[0_0_10px_var(--color-bucket-pink)]" />
            </motion.a>

            <motion.div {...fadeUp(1.15)} className="mt-8">
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

        {/* Rising clouds */}
        <ParallaxClouds triggerRef={sectionRef} />
      </div>
    </section>
  );
}
