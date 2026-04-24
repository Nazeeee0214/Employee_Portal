"use client";

import React from "react";
import { motion } from "framer-motion";
import { FinancialSummary } from "./components/FinancialSummary";
import { QuickActions } from "./components/QuickActions";
import { WeeklySchedule } from "./components/WeeklySchedule";
import { LeaveBalances } from "./components/LeaveBalances";
import { ReceiptText, ShieldCheck, HeartPulse } from "lucide-react";

import { NetPayData, ScheduleData } from "./services/dashboard.service";

interface DashboardPageProps {
  initialNetPay: NetPayData | null;
  initialSchedule: ScheduleData | null;
}

export function DashboardPage({ initialNetPay, initialSchedule }: DashboardPageProps) {
  return (
    <div className="space-y-10">
      <header>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black tracking-tighter text-zinc-950 dark:text-zinc-50"
        >
          Command Center
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-zinc-500 mt-2 font-medium"
        >
          Welcome back, Marcus. System status is operational across all sectors.
        </motion.p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <FinancialSummary data={initialNetPay} />
        <QuickActions />
        
        <WeeklySchedule schedule={initialSchedule} />
        <LeaveBalances />

        {/* Supplementary Quick Cards */}
        <section className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-2xl shadow-sm border border-outline-variant/10"
          >
            <div className="flex items-center gap-3 mb-4 text-zinc-400">
              <ReceiptText size={20} />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Latest Payslip</h3>
            </div>
            <p className="text-xs font-bold text-zinc-950 dark:text-zinc-50 mb-4">Sep 30, 2023</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary underline underline-offset-4 decoration-zinc-200 hover:decoration-primary transition-all">
              DOWNLOAD PDF
            </button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-2xl shadow-sm border border-outline-variant/10"
          >
            <div className="flex items-center gap-3 mb-4 text-zinc-400">
              <ShieldCheck size={20} />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Compliance</h3>
            </div>
            <p className="text-xs font-bold text-zinc-950 dark:text-zinc-50 mb-4">2 Docs Pending</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary underline underline-offset-4 decoration-zinc-200 hover:decoration-primary transition-all">
              VIEW TASKS
            </button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-2xl shadow-sm border border-outline-variant/10"
          >
            <div className="flex items-center gap-3 mb-4 text-zinc-400">
              <HeartPulse size={20} />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Benefits</h3>
            </div>
            <p className="text-xs font-bold text-zinc-950 dark:text-zinc-50 mb-4">Plan Renewed</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary underline underline-offset-4 decoration-zinc-200 hover:decoration-primary transition-all">
              VIEW PACKAGE
            </button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-zinc-950 dark:bg-zinc-50 p-6 rounded-2xl shadow-xl flex flex-col justify-between"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              System Message
            </h3>
            <p className="text-sm text-white dark:text-zinc-950 leading-tight mt-4 font-medium italic">
              &quot;Performance reviews are due this Friday. Please update your logs.&quot;
            </p>
            <span className="text-[9px] text-zinc-600 mt-6">— HR Operations</span>
          </motion.div>
        </section>
      </div>

      <footer className="pt-10 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 pb-12">
        <div className="flex items-center gap-8">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
            © 2024 PRECISION PORTAL
          </span>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-primary transition-colors">Security</a>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 rounded-full border border-green-100 dark:border-green-900/50">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
          <span className="text-[10px] font-black uppercase tracking-tighter text-green-700 dark:text-green-400">
            Node: Operational
          </span>
        </div>
      </footer>
    </div>
  );
}
