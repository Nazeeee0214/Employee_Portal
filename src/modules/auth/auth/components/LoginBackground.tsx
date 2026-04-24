"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function LoginBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const starCount = 400;
    const stars: { x: number; y: number; z: number; o: number }[] = [];

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        o: Math.random(),
      });
    }

    let velocity = 0.5;
    let frameId: number;

    const render = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      stars.forEach((star) => {
        star.z -= velocity;

        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        const scale = 120 / star.z;
        const x = star.x * scale + centerX;
        const y = star.y * scale + centerY;

        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          const opacity = (1 - star.z / width) * 0.8;
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, scale * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      frameId = requestAnimationFrame(render);
    };

    render();

    // Speed up effect when component is active / transitioning
    const speedTl = gsap.to({ v: 0.5 }, {
      v: 25,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      onUpdate: function() {
        velocity = this.targets()[0].v;
      }
    });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      speedTl.kill();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-black -z-10"
    />
  );
}
