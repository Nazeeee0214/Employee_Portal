"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Receipt } from "lucide-react";
import { PayrollSummary } from "./components/PayrollSummary";
import { ActiveLedgerDetails } from "./components/ActiveLedgerDetails";
import { HistoricalLedgerList } from "./components/HistoricalLedgerList";

export function PayrollPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-2 block"
          >
            Financial Records
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-black tracking-tighter text-zinc-950 dark:text-zinc-50"
          >
            PAYROLL HISTORY
          </motion.h1>
        </div>
        <div className="flex gap-4">
          <motion.button 
            whileHover={{ y: -2 }}
            className="bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant/20 px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Download size={14} />
            Export All (PDF)
          </motion.button>
          <motion.button 
            whileHover={{ y: -2 }}
            className="bg-primary text-on-primary px-6 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase hover:shadow-xl shadow-primary/20 transition-all flex items-center gap-2"
          >
            <Receipt size={14} />
            Tax Documents
          </motion.button>
        </div>
      </section>

      <PayrollSummary />

      <ActiveLedgerDetails />

      <HistoricalLedgerList />

      {/* Info Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="p-6 bg-surface-container-low dark:bg-zinc-900 rounded-2xl border border-outline-variant/10 text-center"
      >
        <p className="text-xs text-zinc-500 font-medium tracking-tight">
          Payments are typically processed 2-3 business days before the pay date. 
          If you notice any discrepancies, please submit a dispute through the detailed ledger view.
        </p>
      </motion.div>
    </div>
  );
}
