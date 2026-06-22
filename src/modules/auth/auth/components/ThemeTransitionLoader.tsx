"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, RefreshCcw } from "lucide-react";

export function ThemeTransitionLoader() {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentDisplayTheme, setCurrentDisplayTheme] = useState<string | undefined>(undefined);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastThemeRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (lastThemeRef.current === undefined && theme !== undefined) {
      lastThemeRef.current = theme;
      return;
    }

    if (theme && theme !== lastThemeRef.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      lastThemeRef.current = theme;
      setCurrentDisplayTheme(theme);
      setIsTransitioning(true);
      timerRef.current = setTimeout(() => {
        setIsTransitioning(false);
        timerRef.current = null;
      }, 1800); // Slightly longer for more dramatic impact
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [theme]);

  // Emergency safety
  useEffect(() => {
    if (isTransitioning) {
      const emergencyTimer = setTimeout(() => setIsTransitioning(false), 5000);
      return () => clearTimeout(emergencyTimer);
    }
  }, [isTransitioning]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl overflow-hidden"
        >
          {/* Animated HUD Brackets */}
          <div className="absolute inset-12 pointer-events-none">
             {/* Top Left */}
             <motion.div 
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="absolute top-0 left-0 border-t-2 border-l-2 border-white/20 w-12 h-12 rounded-tl-xl"
             />
             {/* Top Right */}
             <motion.div 
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="absolute top-0 right-0 border-t-2 border-r-2 border-white/20 w-12 h-12 rounded-tr-xl"
             />
             {/* Bottom Left */}
             <motion.div 
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="absolute bottom-0 left-0 border-b-2 border-l-2 border-white/20 w-12 h-12 rounded-bl-xl"
             />
             {/* Bottom Right */}
              <motion.div 
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="absolute bottom-0 right-0 border-b-2 border-r-2 border-white/20 w-12 h-12 rounded-br-xl"
             />
          </div>

          {/* Full Screen Scan Swipe */}
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] pointer-events-none"
          />

          {/* Drifting Holographic Particles */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ 
                        x: Math.random() * 100 + "%", 
                        y: Math.random() * 100 + "%",
                        opacity: 0,
                        scale: 0.5
                    }}
                    animate={{ 
                        y: ["-10%", "110%"],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                        duration: Math.random() * 2 + 1, 
                        repeat: Infinity,
                        delay: Math.random() * 1
                    }}
                    className="absolute w-[1px] h-[40px] bg-gradient-to-b from-white to-transparent"
                />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10">
            <div className="text-center space-y-8">
               {/* Mode Switcher Badge */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="px-8 py-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md relative group overflow-hidden"
               >
                 <span className="text-xs text-white font-black uppercase tracking-[0.5em] relative z-10">
                   Shift to {currentDisplayTheme === "dark" ? "Dark Protocol" : "Light Interface"}
                 </span>
                 <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-white/5"
                 />
               </motion.div>

              <div className="space-y-4">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white font-black uppercase tracking-[0.8em] text-[10px] opacity-40"
                >
                  Environment Synchronization
                </motion.h2>
                
                {/* Technical Loading Bar */}
                <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative mx-auto">
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-y-0 left-0 bg-white shadow-[0_0_15px_white]"
                    />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-[9px] font-mono text-white/30 tracking-widest uppercase italic">
                    Initializing neural layer re-render...
                </p>
                <div className="flex gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div 
                            key={i}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            className="w-1 h-1 bg-white"
                        />
                    ))}
                </div>
              </div>
            </div>
            
            {/* System Telemetry */}
            <div className="fixed bottom-12 inset-x-12 flex justify-between items-end opacity-20 pointer-events-none">
                <div className="space-y-2">
                    <div className="text-[9px] font-mono text-white flex gap-4">
                        <span className="opacity-50">ALLOC</span> {Math.random().toString(16).slice(2, 10).toUpperCase()}
                    </div>
                    <div className="text-[9px] font-mono text-white flex gap-4">
                        <span className="opacity-50">TRANS</span> MODE_{currentDisplayTheme?.toUpperCase()}
                    </div>
                </div>
                <div className="text-right space-y-2">
                    <div className="text-[9px] font-mono text-white">RE_SYNC: ACTIVE</div>
                    <div className="text-[10px] font-mono text-white font-black border-b border-white/20 pb-1">PROTOCOL REV 5.2</div>
                </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
