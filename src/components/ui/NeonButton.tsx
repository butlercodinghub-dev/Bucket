"use client";

import { motion } from "framer-motion";

interface NeonButtonProps {
  href: string;
  children: React.ReactNode;
  color?: "pink" | "purple" | "cyan" | "coral";
  className?: string;
}

const colorMap = {
  pink: {
    border: "border-bucket-pink/50",
    hover: "hover:border-bucket-pink hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]",
    text: "text-bucket-neon-pink",
  },
  purple: {
    border: "border-bucket-purple/50",
    hover: "hover:border-bucket-purple hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]",
    text: "text-bucket-purple",
  },
  cyan: {
    border: "border-bucket-cyan/50",
    hover: "hover:border-bucket-cyan hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]",
    text: "text-bucket-cyan",
  },
  coral: {
    border: "border-bucket-coral/50",
    hover: "hover:border-bucket-coral hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]",
    text: "text-bucket-coral",
  },
};

export default function NeonButton({
  href,
  children,
  color = "pink",
  className = "",
}: NeonButtonProps) {
  const c = colorMap[color];
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-sm bg-white/5 transition-all duration-300 ${c.border} ${c.hover} ${c.text} ${className}`}
    >
      {children}
    </motion.a>
  );
}
