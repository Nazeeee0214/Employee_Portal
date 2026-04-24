"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LoginBackground } from "./components/LoginBackground";
import { LoginForm } from "./components/LoginForm";
import { motion } from "framer-motion";

export function AuthPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    // Navigate to dashboard after cinematic pause
    router.push("/");
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Cinematic Starfield Background */}
      <LoginBackground />

      {/* Floating UI Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="mb-12 flex flex-col items-center"
        >
          <div className="text-[11px] font-black uppercase tracking-[0.6em] text-white/40 mb-4 bg-white/5 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm">
            Operational Protocol v4.2
          </div>
        </motion.div>

        <LoginForm onLogin={handleLoginSuccess} />
      </div>

      {/* Scanline Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-20 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      
      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-20 shadow-[inset_0_0_15vw_rgba(0,0,0,0.8)]" />
    </main>
  );
}
