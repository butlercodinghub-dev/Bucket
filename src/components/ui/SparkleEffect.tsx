"use client";

import { useEffect, useRef } from "react";

export default function SparkleEffect({ count = 40 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#F472B6", "#C4B5FD", "#67E8F9", "#8B5CF6", "#EC4899"];

    const sparkles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      size: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random(),
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      sparkles.forEach((s) => {
        s.opacity += s.opacityDir * 0.008;
        if (s.opacity >= 1) s.opacityDir = -1;
        if (s.opacity <= 0) s.opacityDir = 1;

        s.y -= s.speed;
        if (s.y < -5) {
          s.y = canvas.offsetHeight + 5;
          s.x = Math.random() * canvas.offsetWidth;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.opacity);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
