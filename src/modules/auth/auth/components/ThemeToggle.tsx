"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 1 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-12 right-12 z-50 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 backdrop-blur-md hover:bg-white/10 dark:hover:bg-white/5 transition-colors group overflow-hidden"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            <Moon size={20} className="text-white" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            <Sun size={20} className="text-zinc-950" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}
