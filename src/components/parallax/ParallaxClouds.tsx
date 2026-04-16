"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxClouds({
  triggerRef,
}: {
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const cloudsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cloudsRef.current || !triggerRef.current) return;

      const layers = cloudsRef.current.querySelectorAll(".cloud-layer");
      layers.forEach((layer, i) => {
        const speed = (i + 1) * 15;
        gsap.to(layer, {
          y: `${speed}%`,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current!,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: cloudsRef, dependencies: [triggerRef] }
  );

  return (
    <div ref={cloudsRef} className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {/* Far clouds */}
      <div className="cloud-layer absolute -bottom-[20%] left-0 w-full h-[60%]">
        <div className="absolute bottom-0 left-[5%] w-[40%] h-[70%] rounded-full bg-bucket-purple/15 blur-[80px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[35%] h-[50%] rounded-full bg-bucket-pink/10 blur-[60px]" />
      </div>

      {/* Mid clouds */}
      <div className="cloud-layer absolute -bottom-[10%] left-0 w-full h-[50%]">
        <div className="absolute bottom-0 left-[15%] w-[50%] h-[80%] rounded-full bg-bucket-neon-pink/20 blur-[60px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[40%] h-[60%] rounded-full bg-bucket-coral/15 blur-[50px]" />
      </div>

      {/* Near clouds */}
      <div className="cloud-layer absolute -bottom-[5%] left-0 w-full h-[40%]">
        <div className="absolute bottom-0 left-0 w-full h-[100%] bg-gradient-to-t from-bucket-abyss/90 via-bucket-purple/20 to-transparent" />
        <div className="absolute bottom-0 left-[20%] w-[60%] h-[50%] rounded-full bg-bucket-pink/25 blur-[40px]" />
      </div>
    </div>
  );
}
