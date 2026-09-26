"use client";

import Image from "next/image";
import { useAudio } from "@/components/providers/AudioProvider";
import { platforms } from "@/lib/platforms";
import logoImg from "@/assets/images/logo.jpg";

export default function Footer() {
  const { currentTrack } = useAudio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // Extra bottom padding while the player bar is showing so it never covers the footer
    <footer
      className={`relative pt-12 px-4 bg-bucket-void border-t border-white/5 ${
        currentTrack ? "pb-32" : "pb-12"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="mx-auto mb-6 w-16 h-16 relative rounded-full overflow-hidden hover:scale-110 transition-transform duration-300 glow-box-purple"
        >
          <Image src={logoImg} alt="" fill sizes="64px" className="object-contain" />
        </button>

        {/* Platform icons */}
        <div className="flex justify-center gap-5 mb-6">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.name}
              className="text-bucket-lavender/50 hover:text-bucket-neon-pink transition-colors"
            >
              {p.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-bucket-lavender/30 text-sm">
          &copy; {new Date().getFullYear()} Bucket The Kid. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
