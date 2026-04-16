"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import GlowText from "@/components/ui/GlowText";
import SparkleEffect from "@/components/ui/SparkleEffect";
import characterImg from "@/assets/images/character-anchor.jpg";

gsap.registerPlugin(ScrollTrigger);

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
      className="relative py-24 sm:py-32 4k:py-48 px-4 sm:px-6 lg:px-8 4k:px-16 bg-hero-gradient overflow-hidden"
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
            className="relative aspect-square max-w-md mx-auto md:mx-0"
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

          {/* Bio Text */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-bucket-lavender/80 leading-relaxed"
            >
              Bucket The Kid feels less like a traditional act and more like the
              friend who always controls the aux — and somehow never misses. A
              progressive DJ and bedroom producer by trade, Bucket approaches
              music with a playful curiosity, treating genres less like lanes
              and more like open roads.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-bucket-lavender/80 leading-relaxed"
            >
              His sound moves freely across influences, guided more by feeling
              than by category. Hip-hop, electronic, indie, laid-back grooves —
              if the vibe fits, it rides. There&apos;s an easygoing charm in the way
              he creates — unpretentious, curious, and welcoming.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-bucket-lavender/80 leading-relaxed"
            >
              Operating from the DIY world of bedroom production while thinking
              like a progressive DJ, Bucket The Kid blends experimentation with
              instinct, building tracks that feel spontaneous but intentional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GlowText
                as="p"
                color="pink"
                className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-space-grotesk)] mt-4 block"
              >
                Press play, kick back, and stay awhile.
              </GlowText>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
