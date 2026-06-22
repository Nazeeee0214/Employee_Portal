"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Download, Info } from "lucide-react";
import { cn } from "@/lib/utils";

import { AttendanceLogEntry, fetchRecentLogs } from "../services/attendance.service";

interface AttendanceLogsProps {
  logs: AttendanceLogEntry[];
}

export function AttendanceLogs({ logs: initialLogs }: AttendanceLogsProps) {
  const [logs, setLogs] = useState<AttendanceLogEntry[]>(initialLogs);
  const [offset, setOffset] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialLogs.length === 10);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const moreLogs = await fetchRecentLogs(offset);
      if (moreLogs.length < 10) setHasMore(false);
      setLogs((prev) => [...prev, ...moreLogs]);
      setOffset((prev) => prev + 10);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
                key={log.id}
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
                      log.status === "Late" ? "text-amber-600" : (log.status === "Leave" || log.status === "Holiday") ? "text-primary/50" : "text-zinc-400"
                    )}>
                      {log.status}
                    </span>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      log.status === "Late" ? "bg-amber-500" : (log.status === "Leave" || log.status === "Holiday") ? "bg-primary/20" : "bg-zinc-200 dark:bg-zinc-700"
                    )} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-8 py-5 bg-zinc-50/50 dark:bg-zinc-900/30 flex justify-center border-t border-outline-variant/10">
        {hasMore ? (
          <button 
            onClick={handleLoadMore}
            disabled={loading}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-primary transition-all disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More History"}
          </button>
        ) : (
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-700">
            End of History
          </span>
        )}
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
