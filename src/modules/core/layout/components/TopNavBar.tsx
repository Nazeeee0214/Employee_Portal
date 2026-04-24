"use client";

import React from "react";
import { Bell, Search } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

export function TopNavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="flex justify-between items-center h-16 px-6 w-full">
        <div className="flex items-center gap-8">
          <span className="text-lg font-bold tracking-tighter text-zinc-950 dark:text-zinc-50">
            Employee Portal
          </span>
          <div className="hidden md:flex items-center gap-6">
            <Link
              className="text-sm font-semibold border-b-2 border-primary text-foreground"
              href="/"
            >
              Command Center
            </Link>
            <Link
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors px-2 py-1 rounded-md"
              href="/attendance"
            >
              Attendance
            </Link>
            <Link
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors px-2 py-1 rounded-md"
              href="/payroll"
            >
              Payroll
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400">
              <Search size={18} />
            </span>
            <input
              className="bg-surface-container-low border-none text-xs rounded-md pl-10 pr-4 py-2 w-48 focus:ring-1 focus:ring-outline-variant/50"
              placeholder="Search CMD+K"
              type="text"
            />
          </div>

          <button className="p-2 text-zinc-500 hover:bg-zinc-100/50 rounded-md transition-colors">
            <Bell size={20} />
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-zinc-500 hover:bg-zinc-100/50 rounded-md transition-colors"
          >
            {!mounted ? (
              <div className="w-5 h-5" /> // Placeholder to prevent shift
            ) : theme === "dark" ? (
              <span className="material-symbols-outlined">light_mode</span>
            ) : (
              <span className="material-symbols-outlined">dark_mode</span>
            )}
          </button>

          <div className="w-8 h-8 rounded-full border border-outline-variant/20 overflow-hidden relative">
            <Image
              alt="User avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPvDnoNHqIwqugJHlcsAbarc8x9T04Fbz8T7XkVp_-pjR_CmypHIaAvv-kliCt28PY4BBcE6G8sgzn5GivZ0yQHg6u_Lbfh-x72EngvPHLbtdonMK9rc-PK5etjOa2rCZtaDlU6_fweKGWLhp5KqJOHlX4jYpe5r1uTHwC9-FWBK-YJb5EI8GiYTh8pdV-jOe7HXTeuPRjGAWx_rvOMjTGmHITr4wI_zxkg1VDZGxpUJ_errgpz78-svD04XOaYrytlc4tp3umgfWr"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
