"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LoginBackground } from "./components/LoginBackground";
import { LoginForm } from "./components/LoginForm";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemeTransitionLoader } from "./components/ThemeTransitionLoader";
import { motion } from "framer-motion";

export function AuthPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    // Navigate to dashboard after cinematic pause
    router.push("/");
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden transition-colors duration-700">
      {/* Cinematic Starfield Background */}
      <LoginBackground />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Full Screen Theme Loader */}
      <ThemeTransitionLoader />

      {/* Floating UI Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="mb-12 flex flex-col items-center"
        >
          <div className="text-[11px] font-black uppercase tracking-[0.6em] text-zinc-950/40 dark:text-white/40 mb-4 bg-zinc-950/5 dark:bg-white/5 px-6 py-2 rounded-full border border-zinc-950/5 dark:border-white/5 backdrop-blur-sm">
            Operational Protocol v4.2
          </div>
        </motion.div>

        <LoginForm onLogin={handleLoginSuccess} />
      </div>

      {/* Scanline Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-20 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,0,0,0.06),rgba(0,0,0,0.02),rgba(0,0,0,0.06))] dark:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      
      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-20 shadow-[inset_0_0_15vw_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_15vw_rgba(0,0,0,0.8)]" />
    </main>
  );
}
