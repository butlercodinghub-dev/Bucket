"use client";

interface GlowTextProps {
  children: React.ReactNode;
  color?: "pink" | "purple" | "cyan";
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

const glowMap = {
  pink: "glow-pink",
  purple: "glow-purple",
  cyan: "glow-cyan",
};

export default function GlowText({
  children,
  color = "pink",
  as: Tag = "span",
  className = "",
}: GlowTextProps) {
  return <Tag className={`${glowMap[color]} ${className}`}>{children}</Tag>;
}
