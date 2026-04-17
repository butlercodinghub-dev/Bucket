"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TrackCard from "@/components/audio/TrackCard";
import GlowText from "@/components/ui/GlowText";
import { tracks } from "@/lib/tracks";

gsap.registerPlugin(ScrollTrigger);

export default function MusicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headingRef.current) return;

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="music"
      className="relative py-24 sm:py-32 4k:py-48 px-4 sm:px-6 lg:px-8 4k:px-16 bg-island-gradient"
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-bucket-purple/10 blur-[100px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-[30%] right-[5%] w-[400px] h-[400px] rounded-full bg-bucket-pink/8 blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-6xl 4k:max-w-[1800px] mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-20 opacity-0">
          <p className="text-bucket-cyan text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-space-grotesk)]">
            The Music
          </p>
          <GlowText
            as="h2"
            color="pink"
            className="text-4xl sm:text-5xl md:text-6xl 4k:text-8xl font-extrabold font-[family-name:var(--font-space-grotesk)]"
          >
            Sounds from the Bucketverse
          </GlowText>
          <p className="mt-4 text-bucket-lavender/60 max-w-md mx-auto">
            Each track is a chapter. Each beat is a step deeper into the story.
          </p>
        </div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {tracks.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
