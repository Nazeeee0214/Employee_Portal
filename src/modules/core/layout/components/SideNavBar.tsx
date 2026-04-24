"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  LogOut, 
  Settings,
  Clock,
  Wallet,
  ClipboardList
} from "lucide-react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Clock, label: "Attendance", href: "/attendance" },
  { icon: Wallet, label: "Payroll", href: "/payroll" },
  { icon: ClipboardList, label: "Requests", href: "/requests" },
  { icon: Users, label: "Directory", href: "/directory" },
  { icon: FolderOpen, label: "Resources", href: "/resources" },
];

export function SideNavBar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      router.push("/login"); // Fallback redirect
    }
  };

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 pt-20 hidden lg:flex flex-col gap-2 p-4 bg-zinc-50/80 backdrop-blur-md dark:bg-zinc-950/80 border-r border-zinc-200/20 dark:border-zinc-800/20">
      <div className="px-4 mb-6">
        <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">
          ENTERPRISE
        </span>
        <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
          Employee Hub v4.2
        </p>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 relative group",
                isActive
                  ? "text-primary bg-surface-container-high font-bold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon size={20} />
              <span className="text-xs font-medium uppercase tracking-widest">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-2.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-all"
        >
          <Settings size={20} />
          <span className="text-xs font-medium uppercase tracking-widest">
            Settings
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 text-zinc-600 dark:text-zinc-400 hover:text-red-500 transition-all rounded-md"
        >
          <LogOut size={20} />
          <span className="text-xs font-medium uppercase tracking-widest">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
