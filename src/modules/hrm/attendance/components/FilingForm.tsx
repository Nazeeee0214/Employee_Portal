"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";

type FilingType = "Leave" | "OT" | "UT";

export function FilingForm() {
  const [activeTab, setActiveTab] = useState<FilingType>("Leave");

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-surface-container-lowest dark:bg-zinc-950/50 rounded-2xl p-8 shadow-sm border border-outline-variant/10"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          New Filing
        </h2>
        <div className="flex gap-1 p-1 bg-surface-container-low dark:bg-zinc-900 rounded-xl">
          {(["Leave", "OT", "UT"] as FilingType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={cn(
                "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg",
                activeTab === type 
                  ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <form className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {activeTab === "Leave" && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-1">
                  Type of Leave
                </label>
                <select className="w-full bg-surface-container-low dark:bg-zinc-900 border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none text-zinc-900 dark:text-zinc-100">
                  <option>Vacation Leave</option>
                  <option>Sick Leave</option>
                  <option>Emergency Leave</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-1">
                  Start Date
                </label>
                <input 
                  className="w-full bg-surface-container-low dark:bg-zinc-900 border border-outline-variant/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-zinc-900 dark:text-zinc-100" 
                  type="date" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-1">
                  End Date
                </label>
                <input 
                  className="w-full bg-surface-container-low dark:bg-zinc-900 border border-outline-variant/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-zinc-900 dark:text-zinc-100" 
                  type="date" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-1">
                Reason / Explanation
              </label>
              <textarea 
                className="w-full bg-surface-container-low dark:bg-zinc-900 border border-outline-variant/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-zinc-900 dark:text-zinc-100 min-h-[100px] resize-none" 
                placeholder="Provide brief explanation for this filing..." 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-1">
                Supporting Documents
              </label>
              <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer group">
                <CloudUpload className="text-zinc-300 group-hover:text-primary transition-colors mb-2" size={32} />
                <p className="text-xs text-zinc-500 font-medium group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                  Drag and drop or <span className="text-primary font-bold underline underline-offset-4">browse files</span>
                </p>
                <p className="text-[10px] text-zinc-400 mt-2">Support for PDF, PNG, JPG (Max 10MB)</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="button"
          className="w-full bg-primary text-on-primary py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity mt-4"
        >
          Submit {activeTab} Request
        </motion.button>
      </form>
    </motion.div>
  );
}
