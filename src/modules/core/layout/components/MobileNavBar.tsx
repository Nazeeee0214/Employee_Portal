"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, Clock, Wallet, ClipboardList, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Clock, label: "Attendance", href: "/attendance" },
  { icon: Wallet, label: "Payroll", href: "/payroll" },
  { icon: ClipboardList, label: "Requests", href: "/requests" },
  { icon: Users, label: "Directory", href: "/directory" },
];

export function MobileNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top Mobile Bar */}
      <nav className="lg:hidden fixed top-0 left-0 w-full glass h-16 flex justify-between items-center px-6 z-[60]">
        <span className="text-sm font-black tracking-tighter text-zinc-950 dark:text-zinc-50">
          PRECISION PORTAL
        </span>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-zinc-900 dark:text-zinc-100"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] lg:hidden"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white dark:bg-zinc-950 z-[80] lg:hidden p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Navigation</span>
                <button onClick={() => setIsOpen(false)} className="text-zinc-400"><X size={20} /></button>
              </div>

              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-4 px-4 py-4 rounded-xl transition-all",
                        isActive 
                          ? "bg-zinc-950 text-white dark:bg-zinc-50 dark:text-black font-black" 
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      )}
                    >
                      <item.icon size={20} />
                      <span className="text-xs uppercase tracking-widest">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pt-8 border-t border-zinc-100 dark:border-zinc-900">
                <button className="flex items-center gap-4 px-4 py-4 text-red-500 font-bold">
                  <LogOut size={20} />
                  <span className="text-xs uppercase tracking-widest">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
