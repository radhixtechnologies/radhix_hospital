"use client";

import React from "react";
import { Building2, ShieldCheck, Users, Activity, Plus } from "lucide-react";
import { DEFAULT_CLINICS } from "@/lib/store";

export default function SuperAdminPage() {
  const clinics = DEFAULT_CLINICS;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Radhix Technologies HQ • SaaS Multi-Tenant Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Clinic Tenants & Subscriptions
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Provision, manage, and monitor all independent clinic accounts running on Radhix Clinic.
          </p>
        </div>

        <button
          onClick={() => alert("Onboard new clinic tenant")}
          className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard New Clinic</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clinics.map((c) => (
          <div key={c.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-600 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded-full">
                  Tenant: {c.slug}
                </span>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-1">{c.name}</h3>
                <p className="text-xs text-slate-400">{c.city}, {c.state}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Active Tier (Enterprise)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-center text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Doctors</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">5 Active</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Monthly OPD</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">600+ Bookings</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Gateway</span>
                <span className="font-bold text-emerald-600">Razorpay OK</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">{c.email}</span>
              <button className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-bold text-slate-700 dark:text-slate-200 text-xs">
                Switch Tenant View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
