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
  X,
  ShieldCheck
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
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

  const handleLinkClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* ===================================================================== */}
      {/* 1. MOBILE OFF-CANVAS OVERLAY & DRAWER (Visible on < lg screens) */}
      {/* ===================================================================== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <aside className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-200">
            <div>
              {/* Mobile Drawer Header */}
              <div className="h-20 flex items-center justify-between px-5 border-b border-slate-100 dark:border-slate-800">
                <Link
                  href="/admin/dashboard"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-teal-500 flex items-center justify-center text-white shrink-0 shadow-md">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight block">
                      Radhix<span className="text-teal-600">Hospital</span>
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase block -mt-1">
                      Hospital Admin OS
                    </span>
                  </div>
                </Link>

                <button
                  onClick={onCloseMobile}
                  className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list */}
              <nav className="p-3 space-y-1.5 max-h-[calc(100vh-180px)] overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/50">
              <Link
                href="/patient-portal"
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Globe className="w-4 h-4 shrink-0 text-teal-600" />
                <span>Patient Portal & Booking ↗</span>
              </Link>

              <Link
                href="/admin/login"
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Sign Out</span>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. DESKTOP DOCKED SIDEBAR (Hidden on mobile, flex on >= lg) */}
      {/* ===================================================================== */}
      <aside
        className={`hidden lg:flex flex-col justify-between h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 z-40 shrink-0 ${
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
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
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
                  title={collapsed ? item.label : undefined}
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
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300"
                      }`}
                    >
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
            href="/patient-portal"
            target="_blank"
            title={collapsed ? "Patient Portal" : undefined}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Globe className="w-4 h-4 shrink-0 text-teal-600" />
            {!collapsed && <span>Patient Portal ↗</span>}
          </Link>

          <Link
            href="/admin/login"
            title={collapsed ? "Sign Out" : undefined}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
