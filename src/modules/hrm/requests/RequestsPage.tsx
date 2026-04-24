"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Info, History, Headphones } from "lucide-react";
import { RequestCard } from "./components/RequestCard";
import { ApprovalTrail } from "./components/ApprovalTrail";
import { UserRequest } from "./types/requests";

const mockRequests: UserRequest[] = [
  {
    id: "REQ-8821",
    title: "Professional Development Grant",
    status: "Processing",
    date: "Oct 24, 2023",
    amount: 2450.0,
    progress: 66,
    trail: [
      { id: "1", label: "Direct Manager Approval", approver: "Sarah Jenkins", status: "Approved", date: "Oct 24", time: "09:12 AM", comment: "The proposed training aligns perfectly with our Q4 goals for the engineering team. Full support." },
      { id: "2", label: "Department Head Review", approver: "David Marcus", status: "Approved", date: "Oct 25", time: "02:45 PM" },
      { id: "3", label: "Finance & Budgeting", approver: "Finance Queue A", status: "Pending" },
      { id: "4", label: "HR Final Finalization", approver: "TBD", status: "Future" },
    ]
  },
  {
    id: "REQ-7902",
    title: "Workstation Equipment Upgrade",
    status: "Approved",
    date: "Sep 12, 2023",
    category: "Hardware",
    progress: 100,
  },
  {
    id: "REQ-7811",
    title: "Annual Leave - Q4",
    status: "Approved",
    date: "Aug 30, 2023",
    duration: "12 Days",
    progress: 100,
  }
];

export function RequestsPage() {
  const [activeRequestId, setActiveRequestId] = useState(mockRequests[0].id);
  const activeRequest = mockRequests.find(r => r.id === activeRequestId);

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <header>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Human Resources</span>
          <span className="text-zinc-300 dark:text-zinc-800">/</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-950 dark:text-zinc-50">Requests</span>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black tracking-tighter text-zinc-950 dark:text-zinc-50"
        >
          Request Tracking
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-zinc-500 mt-4 max-w-2xl font-medium"
        >
          Manage and monitor your internal organizational requests, approvals, and history in a centralized clinical interface.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        {/* Left Column: Request List */}
        <section className="xl:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 uppercase">Active Requests</h2>
            <button className="bg-primary text-on-primary px-6 py-3 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase hover:shadow-xl shadow-primary/20 transition-all flex items-center gap-2">
              <Plus size={14} strokeWidth={4} />
              New Request
            </button>
          </div>

          <div className="space-y-4">
            {mockRequests.map((req) => (
              <RequestCard 
                key={req.id} 
                request={req} 
                isActive={activeRequestId === req.id}
                onClick={() => setActiveRequestId(req.id)}
              />
            ))}
          </div>
        </section>

        {/* Right Column: Approval Trail */}
        <section className="xl:col-span-5 relative">
          {activeRequest?.trail ? (
            <ApprovalTrail requestId={activeRequest.id} steps={activeRequest.trail} />
          ) : (
            <div className="sticky top-24 glass-panel rounded-2xl p-12 text-center border border-outline-variant/10">
              <History className="mx-auto text-zinc-200 mb-6" size={48} />
              <h3 className="text-sm font-black uppercase text-zinc-400 tracking-widest mb-2">Request Settled</h3>
              <p className="text-xs text-zinc-500 font-medium tracking-tight">This request has been finalized. View the full audit log in your history.</p>
            </div>
          )}
        </section>
      </div>

      {/* Contextual Information (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Info, title: "Request Policy", dec: "Ensure all professional development requests are submitted at least 30 days prior to the event date to ensure budget availability." },
          { icon: History, title: "Audit Logs", dec: "Your request history is maintained for 5 fiscal years in accordance with our organizational compliance standards." },
          { icon: Headphones, title: "Help Desk", dec: "Stuck? Contact our HR support line for assistance with the approval workflow or budget classifications." }
        ].map((item) => (
          <motion.div 
            key={item.title}
            whileHover={{ y: -5 }}
            className="bg-surface-container-low dark:bg-zinc-900/50 p-8 rounded-2xl border border-outline-variant/5 shadow-sm"
          >
            <item.icon className="text-zinc-400 mb-6" size={24} />
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-950 dark:text-zinc-50 mb-3">{item.title}</h3>
            <p className="text-xs text-zinc-500 font-medium leading-relaxed italic pr-4">&quot;{item.dec}&quot;</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
