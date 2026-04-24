"use client";

import React from "react";
import { motion } from "framer-motion";

const leaves = [
  { label: "Vacation", total: 20, balance: 12, sub: "Renewed on Jan 1st", color: "bg-primary" },
  { label: "Sick", total: 12, balance: 8.5, sub: "Renewed on Jan 1st", color: "bg-primary" },
  { label: "Personal", total: 5, balance: 2, sub: "Floating Balance", color: "bg-primary" }
];

export function LeaveBalances() {
  return (
    <motion.section 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="col-span-12 lg:col-span-4 glass-panel rounded-2xl border border-outline-variant/10 p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950 dark:text-zinc-50">
          Leave Balances
        </h2>
      </div>

      <div className="space-y-8">
        {leaves.map((leave, index) => {
          const percentage = (leave.balance / leave.total) * 100;
          return (
            <div key={leave.label} className="space-y-3">
              <div className="flex items-center justify-between group">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                    {leave.label} Leave
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    {leave.sub}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-zinc-950 dark:text-zinc-50 tracking-tighter">
                    {leave.balance.toFixed(1)}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-400 ml-1">DAYS</span>
                </div>
              </div>
              
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                  className={`${leave.color} h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-10 text-[10px] font-black uppercase tracking-widest py-4 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all rounded-xl shadow-sm"
      >
        View Detailed History
      </motion.button>
    </motion.section>
  );
}
