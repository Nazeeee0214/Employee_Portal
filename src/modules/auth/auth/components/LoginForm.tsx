"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

import { toast } from "sonner";

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [isInitializing, setIsInitializing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Authentication failed");
        return;
      }

      // Success - Trigger cinematic sequence
      setIsInitializing(true);
      const duration = 2500;
      const interval = 50;
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const p = Math.min((currentStep / steps) * 100, 100);
        setProgress(p);

        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => onLogin(), 500);
        }
      }, interval);

    } catch (error) {
      toast.error("A network error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-[90vw] sm:max-w-md px-4">
      <AnimatePresence mode="wait">
        {!isInitializing ? (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-8 sm:p-10 rounded-3xl shadow-2xl border border-zinc-950/5 dark:border-white/10"
          >
            <div className="mb-10 text-center">
              <div className="w-16 h-16 bg-zinc-950/5 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 ring-1 ring-zinc-950/10 dark:ring-white/10">
                <ShieldCheck className="text-zinc-950 dark:text-white" size={32} />
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-zinc-950 dark:text-white uppercase">
                Access Gateway
              </h1>
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.3em] mt-2">
                Secure Enterprise Authentication
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 px-1">
                  Terminal Identity
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@precision.io"
                  className="w-full bg-zinc-950/5 dark:bg-white/5 border border-zinc-950/10 dark:border-white/10 rounded-xl px-5 py-4 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-950/20 dark:focus:ring-white/20 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 px-1">
                  Security Passkey
                </label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950/5 dark:bg-white/5 border border-zinc-950/10 dark:border-white/10 rounded-xl px-5 py-4 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-950/20 dark:focus:ring-white/20 transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-zinc-950 dark:bg-white text-white dark:text-black py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors mt-8 group"
              >
                Initalize Session
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-zinc-950/5 dark:border-white/5 flex justify-center">
              <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest">
                  Horizon Engine v4.2 // Active
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="init-sequence"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className="text-zinc-950/10 dark:text-white/10"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  strokeDasharray="376.8"
                  strokeDashoffset={376.8 - (376.8 * progress) / 100}
                  className="text-zinc-950 dark:text-white"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu className="text-zinc-950 dark:text-white animate-pulse" size={32} />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-zinc-950 dark:text-white uppercase tracking-tighter">
                Synchronizing Identity
              </h2>
              <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.3em]">
                <span className={cn(progress > 20 ? "text-zinc-950 dark:text-white" : "")}>Decrypting</span>
                <span>/</span>
                <span className={cn(progress > 50 ? "text-zinc-950 dark:text-white" : "")}>Validating</span>
                <span>/</span>
                <span className={cn(progress > 80 ? "text-zinc-950 dark:text-white" : "")}>Authorized</span>
              </div>
            </div>

            <div className="w-64 h-[1px] bg-zinc-950/10 dark:bg-white/10 mx-auto overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-zinc-950 dark:bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-[9px] font-medium text-zinc-500 dark:text-zinc-600 font-mono italic">
              {progress < 30 ? "Connecting to nodal gateway..." :
                progress < 60 ? "Reconstructing neural profile..." :
                  progress < 90 ? "Establishing encrypted handshake..." :
                    "Welcome back. Redirection imminent."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
