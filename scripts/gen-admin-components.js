const fs = require("fs");

// ADMIN SIDEBAR: src/components/admin/AdminSidebar.tsx
const sidebarCode = `"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Activity, 
  LayoutDashboard, 
  CalendarDays, 
  UserCheck, 
  Users, 
  CreditCard, 
  Stethoscope, 
  BarChart3, 
  Bell, 
  Settings, 
  Globe, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Shield,
  Sparkles,
  Building2
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Appointments", href: "/admin/appointments", icon: CalendarDays },
    { label: "Doctors & Schedules", href: "/admin/doctors", icon: UserCheck },
    { label: "Patients", href: "/admin/patients", icon: Users },
    { label: "Payments & Invoices", href: "/admin/payments", icon: CreditCard },
    { label: "Clinic Services", href: "/admin/services", icon: Stethoscope },
    { label: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
    { label: "Notifications", href: "/admin/notifications", icon: Bell },
    { label: "Clinic Settings", href: "/admin/settings", icon: Settings },
    { label: "Super Admin (Multi-Tenant)", href: "/admin/super-admin", icon: Building2 },
  ];

  return (
    <aside
      className={\`h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 z-40 flex flex-col justify-between \${
        collapsed ? "w-20" : "w-64"
      }\`}
    >
      <div>
        {/* Brand header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-100 dark:border-slate-800">
          <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-teal-500 flex items-center justify-center text-white shrink-0 shadow-md">
              <Activity className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div>
                <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight block">
                  Radhix<span className="text-teal-600">Admin</span>
                </span>
                <span className="text-[10px] text-slate-400 block -mt-1 font-medium">
                  Clinic Management OS
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={\`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all \${
                  isActive
                    ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }\`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Globe className="w-4 h-4 shrink-0 text-teal-600" />
          {!collapsed && <span>Public Website ↗</span>}
        </Link>

        <Link
          href="/admin/login"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </Link>
      </div>
    </aside>
  );
}
`;

fs.writeFileSync("src/components/admin/AdminSidebar.tsx", sidebarCode, "utf8");

// ADMIN TOPBAR: src/components/admin/AdminTopbar.tsx
const topbarCode = `"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  UserCheck, 
  Building,
  RotateCcw
} from "lucide-react";
import { clinicStore } from "@/lib/store";

export default function AdminTopbar() {
  const [role, setRole] = useState("Clinic Admin");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState("Radhix Super-Speciality (Indiranagar)");

  const handleResetData = () => {
    if (confirm("Reset demo data to default clean state?")) {
      clinicStore.resetToDemoData();
      window.location.reload();
    }
  };

  return (
    <header className="h-20 px-6 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4 sticky top-0 z-30">
      
      {/* Clinic Selector & Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
          <Building className="w-4 h-4 text-blue-600" />
          <select
            value={selectedClinic}
            onChange={(e) => setSelectedClinic(e.target.value)}
            className="bg-transparent border-none outline-none cursor-pointer"
          >
            <option value="Radhix Super-Speciality (Indiranagar)">Radhix Main Clinic (Bengaluru)</option>
            <option value="Radhix MediCare Centre (Pune)">Radhix MediCare (Pune)</option>
          </select>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        
        {/* Reset Demo Data button */}
        <button
          onClick={handleResetData}
          title="Reset sample data"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>

        {/* Demo Role Switcher */}
        <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-bold">Role:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent font-bold outline-none cursor-pointer text-amber-800 dark:text-amber-300"
          >
            <option value="Clinic Admin">Clinic Admin</option>
            <option value="Super Admin (Radhix)">Super Admin (Radhix)</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Recent Activity</span>
                <span className="text-[10px] text-teal-600 font-bold">Mark all read</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-blue-50/60 dark:bg-blue-950/40">
                  <p className="font-bold text-slate-800 dark:text-slate-200">New Booking: RDX-2026-013</p>
                  <p className="text-slate-500 text-[11px]">Rohan Bhatia booked Dr. Amit Verma</p>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40">
                  <p className="font-bold text-slate-800 dark:text-slate-200">Razorpay Payment Captured</p>
                  <p className="text-slate-500 text-[11px]">₹800 received for RDX-2026-009</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2 pl-2">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Admin"
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-600/30"
          />
          <div className="hidden lg:block text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">Admin Demo</span>
            <span className="text-[10px] text-slate-400 font-medium">{role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
`;

fs.writeFileSync("src/components/admin/AdminTopbar.tsx", topbarCode, "utf8");
console.log("Created AdminSidebar.tsx and AdminTopbar.tsx!");
