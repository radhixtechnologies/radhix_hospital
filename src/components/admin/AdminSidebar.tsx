"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Activity, 
  LayoutDashboard, 
  Users, 
  Boxes, 
  CalendarDays, 
  UserCheck, 
  CreditCard, 
  Stethoscope, 
  BarChart3, 
  Bell, 
  Settings, 
  Globe, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  ShieldAlert
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "HRM & Staff (Payroll)", href: "/admin/hrm", icon: Users, badge: "HRM" },
    { label: "Hospital Inventory & Beds", href: "/admin/inventory", icon: Boxes, badge: "Live" },
    { label: "Appointments & OPD", href: "/admin/appointments", icon: CalendarDays },
    { label: "Doctors & Schedules", href: "/admin/doctors", icon: UserCheck },
    { label: "Patient Directory", href: "/admin/patients", icon: Activity },
    { label: "Billing & Accounts", href: "/admin/payments", icon: CreditCard },
    { label: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
    { label: "Hospital Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside
      className={`h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 z-40 flex flex-col justify-between ${
        collapsed ? "w-20" : "w-64"
      }`}
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
                  Radhix<span className="text-teal-600">Hospital</span>
                </span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase block -mt-1">
                  Hospital Admin OS
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
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300"
                  }`}>
                    {item.badge}
                  </span>
                )}
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
