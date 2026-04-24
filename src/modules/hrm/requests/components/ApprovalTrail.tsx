"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ApprovalStep } from "@/modules/hrm/requests/types/requests";

interface ApprovalTrailProps {
  requestId: string;
  steps: ApprovalStep[];
}

export function ApprovalTrail({ requestId, steps }: ApprovalTrailProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-24 glass-panel rounded-2xl p-8 lg:p-10 shadow-sm border border-outline-variant/10"
    >
      <header className="mb-12">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">
          Approval Trail: {requestId}
        </h2>
        <div className="h-px w-10 bg-primary/20" />
      </header>

      <div className="relative space-y-12">
        {/* Vertical Line */}
        <div className="absolute left-[9px] top-2 bottom-2 w-[1px] bg-zinc-100 dark:bg-zinc-800" />

        {steps.map((step) => (
          <div key={step.id} className={cn(
            "relative flex gap-8 transition-opacity duration-500",
            step.status === "Future" ? "opacity-30" : "opacity-100"
          )}>
            {/* Step Marker */}
            <div className={cn(
              "relative z-10 w-5 h-5 rounded-full border-4 border-white dark:border-zinc-950 ring-1 flex items-center justify-center shrink-0 mt-1",
              step.status === "Approved" ? "bg-zinc-950 dark:bg-zinc-50 ring-zinc-950 dark:ring-zinc-50" : 
              step.status === "Pending" ? "bg-white dark:bg-zinc-900 ring-zinc-900 dark:ring-zinc-100" :
              "bg-zinc-100 dark:bg-zinc-800 ring-zinc-200 dark:ring-zinc-700"
            )}>
              {step.status === "Approved" && <Check className="text-white dark:text-zinc-950" size={10} strokeWidth={4} />}
              {step.status === "Pending" && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-zinc-50 animate-pulse" />}
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                <h4 className={cn(
                  "text-sm font-black uppercase tracking-tight",
                  step.status === "Future" ? "text-zinc-400" : "text-zinc-950 dark:text-zinc-50"
                )}>
                  {step.label}
                </h4>
                {step.date && (
                  <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1">
                    {step.date} • {step.time}
                  </span>
                )}
                {step.status === "Pending" && (
                  <span className="text-[9px] font-black text-primary uppercase tracking-widest mt-1">
                    Pending Review
                  </span>
                )}
              </div>
              
              <p className="text-xs text-zinc-500 font-medium lowercase first-letter:uppercase">
                {step.status === "Approved" ? "Approved by" : step.status === "Pending" ? "Awaiting review from" : "Scheduled review by"}{" "}
                <span className="text-zinc-950 dark:text-zinc-50 font-bold">{step.approver}</span>
              </p>

              {step.comment && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl border border-zinc-100 dark:border-zinc-800"
                >
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed italic font-medium">
                    &quot;{step.comment}&quot;
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-10 border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-col sm:flex-row gap-3">
        <button className="flex-1 text-[10px] font-black uppercase tracking-[0.2em] border border-outline-variant/20 py-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-zinc-500 dark:text-zinc-400">
          Withdraw
        </button>
        <button className="flex-1 text-[10px] font-black uppercase tracking-[0.2em] border border-outline-variant/20 py-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-zinc-900 dark:text-zinc-100">
          Edit Details
        </button>
      </div>
    </motion.div>
  );
}
