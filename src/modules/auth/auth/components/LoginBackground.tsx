"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "next-themes";

export function LoginBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // --- Starfield State ---
    const starCount = 400;
    const stars: { x: number; y: number; z: number; ox: number; oy: number }[] = [];
    for (let i = 0; i < starCount; i++) {
      const sx = Math.random() * width - width / 2;
      const sy = Math.random() * height - height / 2;
      stars.push({
        x: sx,
        y: sy,
        ox: sx, // baseline for parallax
        oy: sy,
        z: Math.random() * width,
      });
    }

    // --- Grid State ---
    const gridSize = 60;
    let offset = 0;
    const nodes: { r: number; c: number; a: number; v: number }[] = [];
    for (let r = 0; r < Math.ceil(height / gridSize) + 1; r++) {
      for (let c = 0; c < Math.ceil(width / gridSize) + 1; c++) {
        if (Math.random() > 0.92) {
          nodes.push({ r, c, a: Math.random() * Math.PI, v: 0.02 + Math.random() * 0.03 });
        }
      }
    }

    let velocity = 0.1; // Start slow
    let mixAlpha = theme === "dark" ? 0 : 1;
    const transitionProxy = { val: mixAlpha };
    let frameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (transitionProxy.val < 1) {
        ctx.globalAlpha = 1 - transitionProxy.val;
        const currentVel = velocity + (transitionProxy.val * 80);
        renderStars(ctx, width, height, stars, currentVel, transitionProxy.val);
      }

      if (transitionProxy.val > 0) {
        ctx.globalAlpha = transitionProxy.val;
        renderGrid(ctx, width, height, nodes, offset);
        offset = (offset + 0.4) % gridSize;
      }

      ctx.globalAlpha = 1.0;
      frameId = requestAnimationFrame(render);
    };

    const renderStars = (ctx: CanvasRenderingContext2D, w: number, h: number, starsArr: any[], vel: number, mix: number) => {
      ctx.fillStyle = "#0a0a0c";
      ctx.fillRect(0, 0, w, h);

      const centerX = w / 2;
      const centerY = h / 2;

      // Mouse Parallax factor
      const mx = (mouseRef.current.x - w / 2) * 0.05;
      const my = (mouseRef.current.y - h / 2) * 0.05;

      starsArr.forEach((star) => {
        star.z -= vel;
        if (star.z <= 0) {
          star.z = w;
          star.x = Math.random() * w - w / 2;
          star.y = Math.random() * h - h / 2;
        }

        const scale = 120 / star.z;
        const x = (star.x + mx * scale) * scale + centerX;
        const y = (star.y + my * scale) * scale + centerY;

        if (x >= 0 && x <= w && y >= 0 && y <= h) {
          const opacity = (1 - star.z / w) * (1 - mix);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;

          // Show streaks if velocity is high (intro phase or manual transition)
          if (vel > 2 || mix > 0.05) {
            ctx.lineWidth = scale * 1.5;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * (vel / 30)})`;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + (star.x * scale * 0.1 * (vel / 30)), y + (star.y * scale * 0.1 * (vel / 30)));
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(x, y, Math.max(scale * 1.2, 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const renderGrid = (ctx: CanvasRenderingContext2D, w: number, h: number, nodesArr: any[], off: number) => {
      ctx.fillStyle = "#f9f9fb";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;

      for (let x = off; x < w; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = off; y < h; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      nodesArr.forEach(node => {
        node.a += node.v;
        const alpha = (Math.sin(node.a) + 1) / 2 * 0.3;
        const x = (node.c * gridSize + off) % (w + gridSize);
        const y = (node.r * gridSize + off) % (h + gridSize);
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
      });

      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h));
      grad.addColorStop(0, "rgba(255, 255, 255, 0)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0.02)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    };

    render();

    // --- Animations ---

    // 1. "Slingshot" Intro Timeline (Slow -> Warp -> Float)
    const introTl = gsap.timeline({ delay: 1 });

    introTl
      .to({ v: 0.1 }, {
        v: 30, // Accelerated Warp
        duration: 2.5,
        ease: "power2.in",
        onUpdate: function () {
          velocity = this.targets()[0].v;
        }
      })
      .to({ v: 30 }, {
        v: 0.05, // Settle to post-intro float
        duration: 4,
        ease: "power3.out",
        onUpdate: function () {
          velocity = this.targets()[0].v;
        }
      });

    const themeTransition = gsap.to(transitionProxy, {
      val: theme === "dark" ? 0 : 1,
      duration: 1.2,
      ease: "power2.inOut"
    });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      introTl.kill();
      themeTransition.kill();
    };
  }, [theme, mounted]);

  if (!mounted) return <div className="fixed inset-0 bg-black" />;

  return (
    <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
  );
}
