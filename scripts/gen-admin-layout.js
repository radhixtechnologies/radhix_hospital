const fs = require("fs");

// ADMIN LAYOUT: src/app/admin/layout.tsx
const layoutCode = `import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
`;

fs.writeFileSync("src/app/admin/layout.tsx", layoutCode, "utf8");

// ADMIN DEFAULT REDIRECT: src/app/admin/page.tsx
const adminRedirectCode = `import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  redirect("/admin/dashboard");
}
`;

fs.writeFileSync("src/app/admin/page.tsx", adminRedirectCode, "utf8");

// ADMIN LOGIN: src/app/admin/login/page.tsx
const loginPageCode = `"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, Sparkles, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@radhixclinic.com");
  const [password, setPassword] = useState("••••••••");
  const [selectedRole, setSelectedRole] = useState("Clinic Admin");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/dashboard");
  };

  const handleQuickDemo = (role: string, demoEmail: string) => {
    setSelectedRole(role);
    setEmail(demoEmail);
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-teal-500 flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
              <Activity className="w-7 h-7" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
              Radhix<span className="text-teal-600">Clinic</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Clinic Staff Portal</h2>
          <p className="text-xs text-slate-500">Sign in to manage appointments, schedules, and billing</p>
        </div>

        {/* 1-Click Quick Demo Access */}
        <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>1-Click Demo Login (Pre-authenticated)</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            Select any role to test the live platform without typing credentials:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemo("Super Admin", "superadmin@radhix.com")}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border font-bold text-slate-800 dark:text-slate-200 hover:border-blue-600 transition-colors text-left"
            >
              Super Admin <span className="block text-[10px] text-slate-400">Radhix HQ</span>
            </button>
            <button
              onClick={() => handleQuickDemo("Clinic Admin", "admin@radhixclinic.com")}
              className="p-2 rounded-xl bg-blue-700 text-white font-bold hover:bg-blue-800 transition-colors text-left shadow-sm"
            >
              Clinic Admin <span className="block text-[10px] text-blue-200">Full Access</span>
            </button>
            <button
              onClick={() => handleQuickDemo("Receptionist", "reception@radhixclinic.com")}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border font-bold text-slate-800 dark:text-slate-200 hover:border-blue-600 transition-colors text-left"
            >
              Receptionist <span className="block text-[10px] text-slate-400">Walk-in Desk</span>
            </button>
            <button
              onClick={() => handleQuickDemo("Doctor", "dr.rajesh@radhixclinic.com")}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border font-bold text-slate-800 dark:text-slate-200 hover:border-blue-600 transition-colors text-left"
            >
              Doctor <span className="block text-[10px] text-slate-400">Dr. Rajesh (MD)</span>
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form
          onSubmit={handleLogin}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Password</label>
              <a href="#" className="text-[11px] font-bold text-blue-600 hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-700/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          <Link href="/" className="hover:text-blue-600 font-semibold">← Return to Public Website</Link>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync("src/app/admin/login/page.tsx", loginPageCode, "utf8");
console.log("Created admin layout, redirect, and login pages!");
