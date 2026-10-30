"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  ShieldCheck,
  Building,
  RotateCcw,
  Sparkles,
  Globe
} from "lucide-react";
import { clinicStore } from "@/lib/store";

interface AdminTopbarProps {
  onOpenMobile?: () => void;
}

export default function AdminTopbar({ onOpenMobile }: AdminTopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleResetData = () => {
    if (confirm("Reset hospital demo data to default clean state?")) {
      clinicStore.resetToDemoData();
      window.location.reload();
    }
  };

  return (
    <header className="h-16 sm:h-20 px-3.5 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-30 shrink-0">
      
      {/* Left: Hamburger (mobile) + Hospital Identity */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Hospital Identity Pill */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 min-w-0">
          <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
          <span className="hidden md:inline truncate">
            Radhix Super-Speciality Hospital & Research Center
          </span>
          <span className="md:hidden truncate">
            Radhix Hospital
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold shrink-0">
            Live Facility
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

        {/* Reset Demo Data button (hidden on mobile) */}
        <button
          onClick={handleResetData}
          title="Reset hospital demo data"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>

        {/* Link to Patient Portal (Quick button) */}
        <Link
          href="/patient-portal"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-xs text-teal-700 dark:text-teal-300 font-bold hover:bg-teal-100 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-teal-600" />
          <span className="hidden lg:inline">Patient Booking</span>
          <span className="lg:hidden">Portal</span>
        </Link>

        {/* Dedicated Admin Badge */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs text-blue-700 dark:text-blue-300 font-bold shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
          <span className="hidden sm:inline">Hospital Administrator</span>
          <span className="sm:hidden text-[11px]">Admin</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Recent Activity</span>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[10px] text-teal-600 font-bold hover:underline"
                >
                  Mark read
                </button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40">
                  <p className="font-bold text-slate-800 dark:text-slate-200">New Booking: RDX-2026-013</p>
                  <p className="text-slate-500 text-[11px]">Rohan Bhatia booked Dr. Amit Verma</p>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40">
                  <p className="font-bold text-slate-800 dark:text-slate-200">Razorpay Payment Captured</p>
                  <p className="text-slate-500 text-[11px]">₹800 received for RDX-2026-009</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2 pl-1">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Admin"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover ring-2 ring-blue-600/30 shrink-0"
          />
          <div className="hidden xl:block text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">Hospital Admin</span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">Chief Administrator</span>
          </div>
        </div>

      </div>
    </header>
  );
}
