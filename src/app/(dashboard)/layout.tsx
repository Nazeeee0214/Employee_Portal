"use client";

import { SideNavBar } from "@/modules/core/layout/components/SideNavBar";
import { TopNavBar } from "@/modules/core/layout/components/TopNavBar";
import { MobileNavBar } from "@/modules/core/layout/components/MobileNavBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-background">
      <TopNavBar />
      <SideNavBar />
      <MobileNavBar />
      <main className="lg:ml-64 pt-20 lg:pt-24 px-6 pb-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
      
      {/* Mobile Bottom Bar - Simplified for high-end look */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full glass h-16 flex justify-around items-center px-4 z-50">
        <Link href="/" className={cn("flex flex-col items-center gap-1", pathname === "/" ? "text-primary" : "text-zinc-400")}>
          <span className="material-symbols-outlined text-[20px]">dashboard</span>
          <span className="text-[10px] uppercase font-bold tracking-tight">Home</span>
        </Link>
        <Link href="/attendance" className={cn("flex flex-col items-center gap-1", pathname === "/attendance" ? "text-primary" : "text-zinc-400")}>
          <span className="material-symbols-outlined text-[20px]">clock_loader_60</span>
          <span className="text-[10px] uppercase font-bold tracking-tight">Logs</span>
        </Link>
        <Link href="/requests" className={cn("flex flex-col items-center gap-1", pathname === "/requests" ? "text-primary" : "text-zinc-400")}>
          <span className="material-symbols-outlined text-[20px]">list_alt</span>
          <span className="text-[10px] uppercase font-bold tracking-tight">Docs</span>
        </Link>
      </nav>
    </div>
  );
}
