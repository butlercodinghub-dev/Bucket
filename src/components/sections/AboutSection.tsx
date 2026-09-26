"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import GlowText from "@/components/ui/GlowText";
import NeonButton from "@/components/ui/NeonButton";
import SparkleEffect from "@/components/ui/SparkleEffect";
import { platforms } from "@/lib/platforms";
import characterImg from "@/assets/images/character-anchor.jpg";

gsap.registerPlugin(ScrollTrigger);

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay },
});

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!imageRef.current || !sectionRef.current) return;

      gsap.fromTo(
        imageRef.current,
        { y: 60 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 4k:py-48 px-4 sm:px-6 lg:px-8 4k:px-16 bg-gradient-to-b from-[#4c1d95] via-bucket-abyss to-bucket-void overflow-hidden"
    >
      <SparkleEffect count={25} />

      <div className="max-w-6xl 4k:max-w-[1800px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 4k:gap-24 items-center">
          {/* Character Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square w-full max-w-md mx-auto md:mx-0"
          >
            <Image
              src={characterImg}
              alt="Bucket The Kid"
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover rounded-3xl"
            />
            <div className="absolute inset-0 rounded-3xl glow-box-purple" />
          </motion.div>

          {/* Bio + links */}
          <div className="space-y-6">
            <motion.div {...reveal()}>
              <p className="text-bucket-cyan text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-space-grotesk)]">
                About
              </p>
              <GlowText
                as="h2"
                color="purple"
                className="text-3xl sm:text-4xl md:text-5xl 4k:text-7xl font-extrabold font-[family-name:var(--font-space-grotesk)] block"
              >
                Who is Bucket?
              </GlowText>
            </motion.div>

            <motion.p
              {...reveal(0.1)}
              className="text-bucket-lavender/80 leading-relaxed text-lg"
            >
              Bucket The Kid is the friend who always controls the aux — and
              somehow never misses. A progressive DJ and bedroom producer, he
              treats genres like open roads: hip-hop, electronic, indie,
              laid-back grooves. If the vibe fits, it rides.
            </motion.p>

            <motion.div {...reveal(0.2)}>
              <GlowText
                as="p"
                color="pink"
                className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-space-grotesk)] block"
              >
                Press play, kick back, and stay awhile.
              </GlowText>
            </motion.div>

            <motion.div {...reveal(0.3)} className="pt-2">
              <p className="text-bucket-lavender/50 text-xs tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-space-grotesk)]">
                Listen &amp; follow
              </p>
              <div className="flex flex-wrap gap-3">
                {platforms.map((p) => (
                  <NeonButton key={p.name} href={p.href} color={p.color} className="px-5 py-2.5">
                    {p.icon}
                    {p.name}
                  </NeonButton>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
