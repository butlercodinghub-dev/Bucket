"use client";

import { useRef, useEffect, useState } from "react";
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
  const [isMuted, setIsMuted] = useState(true);

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

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

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
        className="absolute inset-0 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Hero video — starts muted for autoplay, user can unmute */}
        <video
          ref={videoRef}
          src="/video/hero-main.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="opacity-0"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
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

      {/* Mute / Unmute button */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute bottom-8 right-6 z-10 flex items-center gap-2 px-3 py-2 rounded-full bg-bucket-void/60 border border-bucket-lavender/20 backdrop-blur-sm text-bucket-lavender/70 hover:text-bucket-neon-pink hover:border-bucket-neon-pink/40 transition-all duration-300"
        style={{ zIndex: 4 }}
      >
        {isMuted ? (
          /* Muted icon */
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 18l2 2L21 18.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          /* Unmuted icon */
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
        <span className="text-xs tracking-wide font-[family-name:var(--font-space-grotesk)]">
          {isMuted ? "UNMUTE" : "MUTE"}
        </span>
      </button>

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
