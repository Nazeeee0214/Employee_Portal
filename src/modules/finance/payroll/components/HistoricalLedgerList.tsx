"use client";

import React from "react";
import { motion } from "framer-motion";
import { Filter, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const historicalData = [
  { month: "SEP 2023", period: "SEP 16 - SEP 30", ledger: "PR-2023-18", gross: 6200, net: 4720.5 },
  { month: "SEP 2023", period: "SEP 01 - SEP 15", ledger: "PR-2023-17", gross: 6200, net: 4720.5 },
  { month: "AUG 2023", period: "AUG 16 - AUG 31", ledger: "PR-2023-16", gross: 6200, net: 4720.5 },
  { month: "AUG 2023", period: "AUG 01 - AUG 15", ledger: "PR-2023-15", gross: 6500, net: 4980.0 },
];

export function HistoricalLedgerList() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
          Previous Pay Periods
        </h3>
        <button className="p-2 border border-outline-variant/20 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <Filter size={16} className="text-zinc-500" />
        </button>
      </div>

      <div className="space-y-1">
        {historicalData.map((item, index) => (
          <motion.div
            key={item.ledger}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-surface-container-lowest dark:bg-zinc-950/30 hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-outline-variant/5 transition-all duration-300 flex items-center justify-between p-6 cursor-pointer rounded-xl"
          >
            <div className="flex items-center gap-10">
              <div className="text-[10px] font-black text-zinc-400 w-14 tracking-tighter uppercase">
                {item.month}
              </div>
              <div>
                <p className="text-sm font-black tracking-tight text-zinc-900 dark:text-zinc-50 uppercase">
                  {item.period}
                </p>
                <p className="text-[10px] font-bold text-zinc-500 tracking-widest mt-1">
                  {item.ledger}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-12">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Gross</p>
                <p className="text-xs font-bold text-zinc-500">{formatCurrency(item.gross)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Net Pay</p>
                <p className="text-sm font-black text-zinc-950 dark:text-zinc-50">{formatCurrency(item.net)}</p>
              </div>
              <ChevronRight size={18} className="text-zinc-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="text-[10px] font-black tracking-[0.3em] py-4 px-10 border border-outline-variant/20 hover:bg-primary hover:text-on-primary transition-all rounded-xl uppercase">
          Load Older Records
        </button>
      </div>
    </section>
  );
}
