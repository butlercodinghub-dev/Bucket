"use client";

import Image from "next/image";
import logoImg from "@/assets/images/logo.jpg";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-4 bg-bucket-void border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="mx-auto mb-6 w-16 h-16 relative rounded-full overflow-hidden hover:scale-110 transition-transform duration-300 glow-box-purple"
        >
          <Image
            src={logoImg}
            alt="Bucket The Kid"
            fill
            className="object-contain"
          />
        </button>

        {/* Copyright */}
        <p className="text-bucket-lavender/30 text-sm">
          &copy; {new Date().getFullYear()} Bucket The Kid. All rights reserved.
        </p>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="mt-6 text-xs text-bucket-lavender/40 hover:text-bucket-neon-pink transition-colors tracking-widest uppercase"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}
