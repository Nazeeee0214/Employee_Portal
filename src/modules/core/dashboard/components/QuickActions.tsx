"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarX, Timer, History } from "lucide-react";
import { FileLeaveModal } from "./modals/FileLeaveModal";
import { FileOTModal } from "./modals/FileOTModal";
import { FileUTModal } from "./modals/FileUTModal";

type ModalType = "leave" | "ot" | "ut" | null;

const actions: { icon: any, label: string, color: string, type: ModalType }[] = [
  { icon: CalendarX, label: "File Leave", color: "text-red-500", type: "leave" },
  { icon: Timer, label: "File OT", color: "text-amber-500", type: "ot" },
  { icon: History, label: "File UT", color: "text-blue-500", type: "ut" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};

export function QuickActions() {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const handleClose = () => setOpenModal(null);

  return (
    <>
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {actions.map((action) => (
          <motion.button
            key={action.label}
            onClick={() => setOpenModal(action.type)}
            variants={item}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group bg-surface-container-low dark:bg-zinc-900 shadow-sm hover:bg-primary transition-all duration-300 flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-outline-variant/10 h-full relative overflow-hidden"
        >
          {/* Animated Background Overlay */}
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <action.icon 
            size={40} 
            className={`${action.color} group-hover:text-white transition-colors duration-300 relative z-10`} 
          />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-950 dark:text-zinc-50 group-hover:text-white transition-colors duration-300 relative z-10">
            {action.label}
          </span>
        </motion.button>
      ))}
      </motion.section>

      {/* Render Modals */}
      <FileLeaveModal isOpen={openModal === "leave"} onClose={handleClose} />
      <FileOTModal isOpen={openModal === "ot"} onClose={handleClose} />
      <FileUTModal isOpen={openModal === "ut"} onClose={handleClose} />
    </>
  );
}
