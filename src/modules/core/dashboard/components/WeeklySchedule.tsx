"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScheduleData } from "../services/dashboard.service";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";

interface WeeklyScheduleProps {
  schedule: ScheduleData | null;
}

// Helper to convert time "09:00:00" to "09:00 AM"
function formatTime(timeStr: string) {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(':');
  let h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12;
  return `${h.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

export function WeeklySchedule({ schedule }: WeeklyScheduleProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  // Generate current week view
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
  
  // Parse workdays
  let workdaysArray: string[] = [];
  if (schedule?.workdays) {
    workdaysArray = schedule.workdays.split(',').map((d: string) => d.trim().substring(0, 3)); // "Mon", "Tue"
  } else if (schedule?.workdays_note) {
    // "Mon-Sat", "Mon–Fri", etc.
    const note = schedule.workdays_note.replace('–', '-').replace(' ', '');
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    if (note.includes('-')) {
      const [start, end] = note.split('-');
      const startIndex = dayNames.indexOf(start.substring(0, 3));
      const endIndex = dayNames.indexOf(end.substring(0, 3));
      if (startIndex !== -1 && endIndex !== -1) {
        for (let i = startIndex; i <= endIndex; i++) {
          workdaysArray.push(dayNames[i]);
        }
      }
    }
  }

  const shiftTime = schedule ? `${formatTime(schedule.work_start)} - ${formatTime(schedule.work_end)}` : "Core Shift";

  const days = Array.from({ length: 7 }).map((_, i) => {
    const dayDate = addDays(weekStart, i);
    const name = format(dayDate, "EEE"); // "Mon"
    const date = format(dayDate, "dd"); // "07"
    const active = isSameDay(dayDate, new Date());
    
    // Check if it's a workday
    const isWorkday = workdaysArray.length > 0 
      ? workdaysArray.includes(name) 
      : (name !== "Sat" && name !== "Sun"); // Default to Mon-Fri if no parsing

    return {
      name,
      date,
      active,
      shift: isWorkday ? "Core Shift" : null,
      time: isWorkday ? shiftTime : null
    };
  });
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-12 lg:col-span-8 glass-panel rounded-2xl overflow-hidden shadow-sm border border-outline-variant/10"
    >
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-white/50 dark:bg-zinc-900/50">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950 dark:text-zinc-50">
          Weekly Schedule
        </h2>
        <div className="flex gap-1">
          <button onClick={() => setCurrentDate(addDays(currentDate, -7))} className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors text-zinc-400">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => setCurrentDate(addDays(currentDate, 7))} className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors text-zinc-400">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 divide-x divide-zinc-100 dark:divide-zinc-800 h-80">
        {days.map((day) => (
          <div 
            key={day.name} 
            className={cn(
              "p-4 flex flex-col gap-4 group transition-colors duration-300",
              day.active ? "bg-zinc-100/50 dark:bg-zinc-900/50" : "hover:bg-zinc-50 dark:hover:bg-zinc-900/30",
              (day.name === "Sat" || day.name === "Sun") && "bg-zinc-50/50 dark:bg-zinc-950/50"
            )}
          >
            <div className="flex flex-col items-center gap-2">
              <span className={cn(
                "text-[10px] font-medium uppercase tracking-widest",
                day.active ? "text-primary font-bold" : "text-zinc-400"
              )}>
                {day.name}
              </span>
              <span className={cn(
                "text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full transition-all",
                day.active ? "bg-primary text-on-primary scale-110 shadow-lg shadow-primary/20" : "text-zinc-900 dark:text-zinc-100"
              )}>
                {day.date}
              </span>
            </div>

            {day.shift && (
              <motion.div 
                whileHover={{ y: -2 }}
                className={cn(
                  "p-3 rounded-xl text-[10px] border-l-4 shadow-sm",
                  day.active 
                    ? "bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 border-primary" 
                    : "bg-surface-container-low dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                )}
              >
                <span className="block font-black uppercase tracking-tighter mb-1 truncate">{day.time}</span>
                <span className="block opacity-70 font-medium">{day.shift}</span>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
