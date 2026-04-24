"use client";

import React from "react";
import { motion } from "framer-motion";
import { AttendanceStats } from "./components/AttendanceStats";
import { FilingForm } from "./components/FilingForm";
import { AttendanceLogs } from "./components/AttendanceLogs";

export function AttendancePage() {
  return (
    <div className="space-y-10">
      <header>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black tracking-tighter text-zinc-950 dark:text-zinc-50"
        >
          Attendance & Filing
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-zinc-500 mt-2 font-medium"
        >
          Manage your daily logs, leave requests, and overtime submissions in real-time.
        </motion.p>
      </header>

      <AttendanceStats />

      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 lg:col-span-5">
          <FilingForm />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <AttendanceLogs />
        </div>
      </div>
    </div>
  );
}
