"use client";

import React from "react";
import { motion } from "framer-motion";
import { Filter, Download, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const logs = [
  { date: "Oct 24, 2023", clockIn: "08:54 AM", clockOut: "06:12 PM", hours: "09:18", status: "Regular" },
  { date: "Oct 23, 2023", clockIn: "09:02 AM", clockOut: "05:45 PM", hours: "08:43", status: "Late" },
  { date: "Oct 22, 2023", clockIn: "08:45 AM", clockOut: "06:30 PM", hours: "09:45", status: "Regular" },
  { date: "Oct 21, 2023", clockIn: "08:50 AM", clockOut: "06:05 PM", hours: "09:15", status: "Regular" },
  { date: "Oct 20, 2023", clockIn: "-- : --", clockOut: "-- : --", hours: "00:00", status: "On Leave" },
  { date: "Oct 19, 2023", clockIn: "08:58 AM", clockOut: "06:15 PM", hours: "09:17", status: "Regular" },
];

export function AttendanceLogs() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel rounded-2xl overflow-hidden shadow-sm border border-outline-variant/10"
    >
      <div className="px-8 py-6 flex justify-between items-center border-b border-outline-variant/10 bg-white/50 dark:bg-zinc-900/50">
        <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Recent Logs
        </h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl transition-all text-zinc-600 dark:text-zinc-400">
            <Filter size={18} />
          </button>
          <button className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl transition-all text-zinc-600 dark:text-zinc-400">
            <Download size={18} />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-container-low dark:bg-zinc-900/80">
              <th className="text-left py-4 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Date</th>
              <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Clock In</th>
              <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Clock Out</th>
              <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Hours</th>
              <th className="text-right py-4 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100/50 dark:divide-zinc-800/30">
            {logs.map((log, index) => (
              <motion.tr 
                key={log.date}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group"
              >
                <td className="py-5 px-8 text-sm font-bold text-zinc-950 dark:text-zinc-50">{log.date}</td>
                <td className="py-5 px-4 text-sm text-zinc-500 font-medium">{log.clockIn}</td>
                <td className="py-5 px-4 text-sm text-zinc-500 font-medium">{log.clockOut}</td>
                <td className="py-5 px-4 text-sm font-mono font-bold text-zinc-900 dark:text-white">{log.hours}</td>
                <td className="py-5 px-8 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-tighter transition-colors",
                      log.status === "Late" ? "text-amber-600" : log.status === "On Leave" ? "text-primary/50" : "text-zinc-400"
                    )}>
                      {log.status}
                    </span>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      log.status === "Late" ? "bg-amber-500" : log.status === "On Leave" ? "bg-primary/20" : "bg-zinc-200 dark:bg-zinc-700"
                    )} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-8 py-5 bg-zinc-50/50 dark:bg-zinc-900/30 flex justify-center border-t border-outline-variant/10">
        <button className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-primary transition-all">
          Load More History
        </button>
      </div>

      {/* Sync Alert */}
      <div className="m-6 flex gap-4 p-5 bg-surface-container-low dark:bg-zinc-900 rounded-2xl border border-outline-variant/10 items-start">
        <Info className="text-primary mt-0.5" size={16} />
        <p className="text-xs text-zinc-500 font-medium leading-relaxed">
          Attendance data is synchronized every 15 minutes. If your recent punch does not appear, please wait or contact <span className="text-zinc-950 dark:text-white font-bold cursor-pointer underline underline-offset-4">HR Support</span>.
        </p>
      </div>
    </motion.div>
  );
}
