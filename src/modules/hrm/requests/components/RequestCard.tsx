"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, CreditCard, Layers, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRequest } from "@/modules/hrm/requests/types/requests";

interface RequestCardProps {
  request: UserRequest;
  isActive?: boolean;
  onClick?: () => void;
}

export function RequestCard({ request, isActive, onClick }: RequestCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-2xl p-6 border transition-all duration-300",
        isActive 
          ? "bg-surface-container-lowest dark:bg-zinc-950/80 border-primary ring-1 ring-primary/20 shadow-xl" 
          : "bg-white dark:bg-zinc-900 border-outline-variant/10 hover:border-zinc-300 dark:hover:border-zinc-700 opacity-80 hover:opacity-100"
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter mb-2 inline-block">
            {request.id}
          </span>
          <h3 className="text-xl font-black text-zinc-950 dark:text-zinc-50 tracking-tighter uppercase transition-colors">
            {request.title}
          </h3>
        </div>
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
          request.status === "Processing" 
            ? "bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 shadow-lg" 
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700"
        )}>
          {request.status === "Processing" && (
            <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-zinc-950 animate-pulse" />
          )}
          {request.status}
        </div>
      </div>

      <div className="flex items-center gap-6 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-8">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-zinc-300" />
          {request.date}
        </div>
        {request.amount && (
          <div className="flex items-center gap-2">
            <CreditCard size={14} className="text-zinc-300" />
            ${request.amount.toLocaleString()}
          </div>
        )}
        {request.duration && (
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-zinc-300" />
            {request.duration}
          </div>
        )}
        {request.category && (
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-zinc-300" />
            {request.category}
          </div>
        )}
      </div>

      {request.status === "Processing" && (
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800 transition-colors">
          <div className="flex justify-between text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">
            <span>Approval Progress</span>
            <span className="text-zinc-950 dark:text-zinc-50">{request.progress}%</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${request.progress}%` }}
              transition={{ duration: 1 }}
              className="bg-zinc-950 dark:bg-zinc-50 h-full" 
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
