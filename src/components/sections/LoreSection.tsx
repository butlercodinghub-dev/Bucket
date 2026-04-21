"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAudio } from "@/components/providers/AudioProvider";
import { loreChapters } from "@/lib/lore";
import { tracks } from "@/lib/tracks";
import GlowText from "@/components/ui/GlowText";
import SparkleEffect from "@/components/ui/SparkleEffect";
import logoImg from "@/assets/images/logo-hat.png";

gsap.registerPlugin(ScrollTrigger);

export default function LoreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const { togglePlay } = useAudio();

  useGSAP(
    () => {
      if (!sectionRef.current || !pinnedRef.current) return;

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const chapters =
            pinnedRef.current!.querySelectorAll(".lore-chapter");

          const tl = gsap.timeline();

          chapters.forEach((chapter, i) => {
            if (i === 0) {
              tl.fromTo(chapter, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 });
              tl.to(chapter, { opacity: 1, duration: 0.5 });
              tl.to(chapter, { opacity: 0, y: -40, duration: 0.5 });
            } else {
              tl.fromTo(chapter, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5 });
              tl.to(chapter, { opacity: 1, duration: 0.5 });
              if (i < chapters.length - 1) {
                tl.to(chapter, { opacity: 0, y: -40, duration: 0.5 });
              }
            }
          });

          ScrollTrigger.create({
            trigger: sectionRef.current!,
            start: "top top",
            end: `+=${(loreChapters.length - 1) * 100}%`,
            pin: pinnedRef.current!,
            scrub: 1,
            animation: tl,
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="lore"
      className="relative bg-bucket-void"
      style={{ minHeight: `${(loreChapters.length - 1) * 100}vh` }}
    >

      {/* ── DESKTOP: pinned scroll experience (md+) ── */}
      <div
        ref={pinnedRef}
        className="hidden md:block relative w-full h-screen overflow-hidden"
      >
        <SparkleEffect count={30} />

        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <p className="text-bucket-cyan text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            The Odyssey of Sound
          </p>
        </div>

        {loreChapters.map((chapter) => (
          <div
            key={chapter.id}
            className={`lore-chapter absolute inset-0 flex items-center justify-center px-12 ${chapter.bgClass} opacity-0`}
          >
            {/* Chapter scene image background */}
            {chapter.imageSrc && (
              <div className="absolute inset-0">
                <Image
                  src={chapter.imageSrc}
                  alt={chapter.title}
                  fill
                  className="object-cover object-center opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bucket-void/80 via-bucket-void/40 to-bucket-void/60" />
              </div>
            )}
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <span className="text-bucket-cyan/60 text-sm tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)]">
                {chapter.number}
              </span>
              <GlowText
                as="h3"
                color={
                  chapter.id === "chapter-3" || chapter.id === "chapter-3b"
                    ? "cyan"
                    : chapter.id === "chapter-2"
                    ? "coral" as "pink"
                    : "purple"
                }
                className="text-4xl md:text-5xl 4k:text-7xl font-bold mt-3 mb-8 font-[family-name:var(--font-space-grotesk)] block"
              >
                {chapter.title}
              </GlowText>
              {chapter.id === "chapter-1" && (
                <div className="mx-auto mb-8 w-24 h-24 relative animate-float">
                  <Image src={logoImg} alt="The Bucket Hat" fill className="object-contain rounded-full" />
                </div>
              )}
              <p className="text-lg text-bucket-lavender/80 leading-relaxed max-w-2xl mx-auto">
                &ldquo;{chapter.excerpt}&rdquo;
              </p>
              {chapter.trackId && (
                <button
                  onClick={() => togglePlay(chapter.trackId!)}
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-bucket-pink/40 bg-bucket-pink/10 text-bucket-neon-pink hover:bg-bucket-pink/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="text-sm font-semibold tracking-wide">
                    Listen to {tracks.find((t) => t.id === chapter.trackId)?.title}
                  </span>
                </button>
              )}
              {chapter.id === "chapter-4" && (
                <p className="mt-6 text-bucket-lavender/40 text-sm italic">
                  New chapters drop with new tracks...
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── MOBILE: flowing chapters (<md) ── */}
      <div className="block md:hidden">
        {/* Sticky header */}
        <div className="sticky top-0 z-20 py-4 text-center bg-bucket-void/80 backdrop-blur-md border-b border-white/5">
          <p className="text-bucket-cyan text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            The Odyssey of Sound
          </p>
        </div>

        {loreChapters.map((chapter) => (
          <div
            key={`mob-${chapter.id}`}
            className={`relative min-h-screen flex items-center justify-center px-6 py-20 ${chapter.bgClass}`}
          >
            {chapter.imageSrc && (
              <div className="absolute inset-0">
                <Image
                  src={chapter.imageSrc}
                  alt={chapter.title}
                  fill
                  className="object-cover object-center opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bucket-void/80 via-bucket-void/40 to-bucket-void/60" />
              </div>
            )}
            <div className="max-w-sm mx-auto text-center relative z-10">
              <span className="text-bucket-cyan/60 text-xs tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)]">
                {chapter.number}
              </span>

              <h3 className="text-2xl font-bold mt-3 mb-6 text-white font-[family-name:var(--font-space-grotesk)] leading-tight">
                {chapter.title}
              </h3>

              {chapter.id === "chapter-1" && (
                <div className="mx-auto mb-6 w-20 h-20 relative animate-float">
                  <Image src={logoImg} alt="The Bucket Hat" fill className="object-contain rounded-full" />
                </div>
              )}

              <p className="text-sm text-bucket-lavender/80 leading-relaxed">
                &ldquo;{chapter.excerpt}&rdquo;
              </p>

              {chapter.trackId && (
                <button
                  onClick={() => togglePlay(chapter.trackId!)}
                  className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-bucket-pink/40 bg-bucket-pink/10 text-bucket-neon-pink active:scale-95 transition-transform"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="text-sm font-semibold tracking-wide">
                    Listen to {tracks.find((t) => t.id === chapter.trackId)?.title}
                  </span>
                </button>
              )}

              {chapter.id === "chapter-4" && (
                <p className="mt-5 text-bucket-lavender/40 text-xs italic">
                  New chapters drop with new tracks...
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
