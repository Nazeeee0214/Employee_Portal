"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const summaryStats = [
  { label: "YTD Net Earnings", value: 54230.12, sub: "+4.2% FROM PREVIOUS YEAR", isTrend: true },
  { label: "Total Deductions", value: 12840.45, sub: "INCL. TAXES, HEALTH, RETIREMENT", isTrend: false },
  { label: "Next Pay Period", value: "Oct 30, 2023", sub: "SCHEDULED VIA DIRECT DEBIT", isTrend: false },
];

export function PayrollSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryStats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-surface-container-lowest dark:bg-zinc-950/50 p-6 rounded-2xl border border-outline-variant/10 shadow-sm"
        >
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">
            {stat.label}
          </p>
          <h3 className="text-2xl font-black tracking-tighter text-zinc-950 dark:text-zinc-50">
            {typeof stat.value === "number" ? formatCurrency(stat.value) : stat.value}
          </h3>
          <div className="mt-4 flex items-center gap-1.5">
            {stat.isTrend && <TrendingUp size={12} className="text-green-600" />}
            <p className={stat.isTrend ? "text-[10px] text-green-600 font-bold" : "text-[10px] text-zinc-500 font-medium uppercase tracking-tight"}>
              {stat.sub}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
