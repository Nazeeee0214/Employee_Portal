"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, CalendarCheck, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Working Hours", value: "164.5", sub: "Total this month", icon: Clock },
  { label: "Leave Balance", value: "12.5", sub: "Days remaining", icon: CalendarCheck },
  { label: "Punctuality", value: "98%", sub: "On-time rate", icon: CheckCircle2 },
];

export function AttendanceStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-40 shadow-sm border border-outline-variant/10 group hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {stat.label}
            </span>
            <stat.icon size={18} className="text-zinc-400 group-hover:text-primary transition-colors" />
          </div>
          <div>
            <h3 className="text-3xl font-black tracking-tighter text-zinc-950 dark:text-zinc-50">
              {stat.value}
            </h3>
            <p className="text-xs text-zinc-500 font-medium">
              {stat.sub}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
