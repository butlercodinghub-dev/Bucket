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
  const videoRef = useRef<HTMLVideoElement>(null);
  const stillRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

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

    // Entrance: fade in video
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(video, { opacity: 1, duration: 1.2, ease: "power2.out" })
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.4"
      );

    return () => {
      video.removeEventListener("ended", onVideoEnd);
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
        {/* Single hero video with sound */}
        <video
          ref={videoRef}
          src="/video/hero-main.mp4"
          autoPlay
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover opacity-0"
        />

        {/* Final static hero image — fades in when video ends */}
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
