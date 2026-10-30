"use client";

import React, { useState } from "react";
import { DEFAULT_SERVICES } from "@/lib/store";
import { Plus, Edit2, Check, Clock } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState(DEFAULT_SERVICES);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Clinic Services & Consultation Packages
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure clinical department fees and duration limits.
          </p>
        </div>

        <button
          onClick={() => alert("Add service package dialog")}
          className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md shadow-blue-700/25 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div key={srv.id} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-teal-600 bg-teal-50 dark:bg-teal-950 px-2.5 py-0.5 rounded-full">
                {srv.department}
              </span>
              <span className="text-lg font-black text-slate-900 dark:text-white">₹{srv.fee}</span>
            </div>

            <h3 className="font-bold text-base text-slate-900 dark:text-white">{srv.name}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{srv.description}</p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5" />
                {srv.duration_minutes} Mins
              </span>
              <button className="text-blue-600 font-bold hover:underline">Edit Price</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
