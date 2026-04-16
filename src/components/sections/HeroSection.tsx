"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ParallaxStarfield from "@/components/parallax/ParallaxStarfield";
import ParallaxClouds from "@/components/parallax/ParallaxClouds";
import heroStill from "@/assets/images/character-anchor.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const stillRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    const still = stillRef.current;
    if (!v1 || !v2 || !still) return;

    // Pre-buffer video 2: play muted briefly then pause at frame 0
    // so the first frame is decoded and ready for instant display
    v2.load();
    let v2Ready = false;
    const onV2CanPlay = () => {
      v2Ready = true;
    };
    v2.addEventListener("canplaythrough", onV2CanPlay);

    // Start crossfade 0.4s BEFORE video 1 ends to eliminate the gap
    const OVERLAP = 0.4;
    let crossfadeStarted = false;

    const onV1TimeUpdate = () => {
      if (crossfadeStarted) return;
      const remaining = v1.duration - v1.currentTime;
      if (remaining <= OVERLAP && v2Ready) {
        crossfadeStarted = true;

        // Start v2 immediately so it's rendering frames during the fade
        v2.currentTime = 0;
        v2.play();

        // Crossfade both simultaneously
        gsap.to(v1, { opacity: 0, duration: OVERLAP, ease: "none" });
        gsap.to(v2, { opacity: 1, duration: OVERLAP, ease: "none" });
      }
    };

    // Video 2 ends -> crossfade to static hero image
    const onV2End = () => {
      gsap.to(v2, { opacity: 0, duration: 1.2, ease: "power2.inOut" });
      gsap.to(still, { opacity: 1, duration: 1.2, ease: "power2.inOut" });
    };

    v1.addEventListener("timeupdate", onV1TimeUpdate);
    v2.addEventListener("ended", onV2End);

    // Entrance: fade in video 1
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(v1, { opacity: 1, duration: 1.2, ease: "power2.out" })
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.4"
      );

    return () => {
      v1.removeEventListener("timeupdate", onV1TimeUpdate);
      v2.removeEventListener("canplaythrough", onV2CanPlay);
      v2.removeEventListener("ended", onV2End);
    };
  }, []);

  // Scroll parallax
  useGSAP(
    () => {
      if (!sectionRef.current || !videoContainerRef.current) return;

      const trigger = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      };

      gsap.to(videoContainerRef.current, {
        y: "-15%",
        scale: 1.08,
        scrollTrigger: trigger,
      });

      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        scrollTrigger: { ...trigger, end: "20% top" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Layer 0: Void background */}
      <div className="absolute inset-0 bg-bucket-void" />

      {/* Layer 1: Starfield */}
      <div className="absolute inset-0">
        <ParallaxStarfield />
      </div>

      {/* Layer 2: Video + still image container */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        {/* Video Part 1 */}
        <video
          ref={video1Ref}
          src="/video/hero-entrance.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover opacity-0"
        />
        {/* Video Part 2 */}
        <video
          ref={video2Ref}
          src="/video/hero-entrance-pt2.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover opacity-0"
        />
        {/* Final static hero image */}
        <div ref={stillRef} className="absolute inset-0 opacity-0">
          <Image
            src={heroStill}
            alt="Bucket The Kid"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-bucket-void/30 via-transparent to-bucket-void/60"
        style={{ zIndex: 2 }}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--color-bucket-void)_100%)]"
        style={{ zIndex: 2 }}
      />

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ zIndex: 4 }}
      >
        <span className="text-xs text-bucket-lavender/50 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-bucket-lavender/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-bucket-neon-pink animate-bounce-slow" />
        </div>
      </div>

      {/* Rising clouds */}
      <ParallaxClouds triggerRef={sectionRef} />
    </section>
  );
}
