"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NetPayData } from "../services/dashboard.service";

interface FinancialSummaryProps {
  data: NetPayData | null;
}

export function FinancialSummary({ data }: FinancialSummaryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for the background blobs
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-12 md:col-span-4 glass-panel p-8 flex flex-col justify-center relative overflow-hidden h-72 rounded-2xl group shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* Parallax Background Blobs */}
      <motion.div 
        style={{ y: blob1Y }}
        className="absolute top-0 right-0 w-40 h-40 bg-zinc-200/50 dark:bg-zinc-800/30 rounded-full -mr-20 -mt-10 blur-3xl" 
      />
      <motion.div 
        style={{ y: blob2Y }}
        className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-10 -mb-10 blur-2xl" 
      />

      <div className="relative z-10">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 block">
          Latest Net Pay
        </label>
        
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-extrabold tracking-tighter text-zinc-950 dark:text-zinc-50">
            ₱{data ? Math.floor(data.net_pay).toLocaleString() : "0"}.
          </span>
          <span className="text-2xl font-bold text-zinc-400 tracking-tighter">
            {data ? (data.net_pay % 1).toFixed(2).split('.')[1] : "00"}
          </span>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-tight">
              {data && data.cutoff_end ? `Cutoff: ${data.cutoff_end}` : "Next Pay: Pending"}
            </span>
          </div>
          <button className="p-2 rounded-full bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:scale-110 transition-transform active:scale-95 shadow-lg">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
