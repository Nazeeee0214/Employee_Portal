"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wallet, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function ActiveLedgerDetails() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface-container-lowest dark:bg-zinc-950/80 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-outline-variant/10"
    >
      {/* Expanded Header */}
      <div className="bg-surface-container-low dark:bg-zinc-900 px-8 py-8 flex justify-between items-center border-b border-outline-variant/10">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
            <Wallet size={28} />
          </div>
          <div>
            <h4 className="font-black text-xl tracking-tighter text-zinc-950 dark:text-zinc-50 uppercase">
              OCT 01 - OCT 15, 2023
            </h4>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">
              Payroll Ledger #PR-2023-19
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black text-zinc-400 block mb-1 uppercase tracking-widest">
            Net Paid
          </span>
          <span className="text-4xl font-black tracking-tighter text-zinc-950 dark:text-zinc-50">
            $4,850.00
          </span>
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Earnings */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10 mb-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-950 dark:text-zinc-50">Earnings</h5>
              <span className="text-xs font-black text-zinc-950 dark:text-zinc-50">$6,400.00</span>
            </div>
            <div className="space-y-5">
              {[
                { label: "Base Salary (80 hrs)", amount: 5800 },
                { label: "Holiday Pay (8 hrs)", amount: 450 },
                { label: "Adjustment (Stipend)", amount: 150 },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-zinc-500 font-medium">{item.label}</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10 mb-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Employer Paid Benefits</h5>
              <span className="text-xs font-bold text-zinc-400">$1,200.00</span>
            </div>
            <div className="space-y-5 opacity-60">
              {[
                { label: "Health Insurance Contribution", amount: 850 },
                { label: "401(k) Matching", amount: 350 },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm italic">
                  <span className="text-zinc-500">{item.label}</span>
                  <span className="font-medium">{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Deductions */}
        <div className="flex flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10 mb-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Deductions</h5>
              <span className="text-xs font-black text-red-500">-$1,550.00</span>
            </div>
            <div className="space-y-5">
              {[
                { label: "Federal Income Tax", amount: -890 },
                { label: "Social Security / FICA", amount: -396 },
                { label: "Health Premium (Pre-tax)", amount: -164 },
                { label: "Personal Loan Repayment", amount: -100 },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-zinc-500 font-medium">{item.label}</span>
                  <span className="font-bold text-red-500">{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Final Calculation */}
          <div className="mt-12 p-8 bg-surface-container-low dark:bg-zinc-900/50 rounded-2xl border border-outline-variant/5">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">
              <span>Total Gross</span>
              <span>$6,400.00</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-red-500 mb-6">
              <span>Total Deductions</span>
              <span>-$1,550.00</span>
            </div>
            <div className="h-px bg-outline-variant/20 mb-6" />
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-950 dark:text-zinc-50">Final Net Amount</span>
              <span className="text-3xl font-black tracking-tighter text-zinc-950 dark:text-zinc-50">$4,850.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-10 py-6 bg-zinc-50 dark:bg-zinc-900/80 border-t border-outline-variant/10 flex justify-end items-center gap-6">
        <button className="text-[10px] font-black tracking-[0.2em] text-zinc-400 hover:text-red-500 transition-colors uppercase">
          Raise Dispute
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 text-[10px] font-black rounded-xl tracking-[0.2em] uppercase hover:scale-105 transition-all shadow-lg active:scale-95">
          <Download size={14} />
          Download Payslip
        </button>
      </div>
    </motion.div>
  );
}
