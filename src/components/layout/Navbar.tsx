"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/images/logo.jpg";

const navLinks = [
  { label: "Music", href: "#music" },
  { label: "Lore", href: "#lore" },
  { label: "About", href: "#about" },
  { label: "Listen", href: "#listen" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-bucket-abyss/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 relative rounded-full overflow-hidden">
              <Image
                src={logoImg}
                alt="Bucket The Kid"
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden sm:inline text-sm font-bold tracking-wide text-bucket-lavender font-[family-name:var(--font-space-grotesk)]">
              BUCKET THE KID
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-base font-bold text-bucket-lavender hover:text-bucket-neon-pink tracking-wide font-[family-name:var(--font-space-grotesk)] transition-all duration-300 hover:drop-shadow-[0_0_8px_var(--color-bucket-neon-pink)] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-bucket-neon-pink after:shadow-[0_0_6px_var(--color-bucket-neon-pink)] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-bucket-lavender p-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-bucket-void/95 backdrop-blur-xl flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-bold text-bucket-lavender hover:text-bucket-neon-pink transition-colors font-[family-name:var(--font-space-grotesk)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
