"use client";

import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { Download, TrendingUp, Users, CalendarCheck, Clock } from "lucide-react";

export default function AdminReportsPage() {
  const busiestHoursData = [
    { hour: "9-10 AM", patients: 14 },
    { hour: "10-11 AM", patients: 26 },
    { hour: "11-12 PM", patients: 32 },
    { hour: "12-1 PM", patients: 20 },
    { hour: "2-3 PM", patients: 12 },
    { hour: "3-4 PM", patients: 22 },
    { hour: "4-5 PM", patients: 28 },
    { hour: "5-6 PM", patients: 18 },
  ];

  const departmentData = [
    { name: "Cardiology", value: 38, color: "#1E40AF" },
    { name: "Dermatology", value: 26, color: "#14B8A6" },
    { name: "Orthopedics", value: 20, color: "#F59E0B" },
    { name: "Pediatrics", value: 16, color: "#10B981" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Clinical Analytics & Operational Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track peak hours, department share, conversion rates, and revenue performance.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Monthly Footfall</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">642</p>
          <p className="text-[11px] text-emerald-600 font-bold">+18% MoM Growth</p>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Peak OPD Slot</span>
          <p className="text-2xl font-black text-blue-700 dark:text-teal-400">11:00 AM</p>
          <p className="text-[11px] text-slate-400">96% occupancy</p>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Cancellation Rate</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">3.2%</p>
          <p className="text-[11px] text-emerald-600 font-bold">Lowest in industry</p>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Online Payment Ratio</span>
          <p className="text-2xl font-black text-teal-600 dark:text-teal-400">74%</p>
          <p className="text-[11px] text-slate-400">Razorpay UPI & Cards</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Busiest OPD Consultation Hours</h3>
            <span className="text-xs text-slate-400">Daily average distribution</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={busiestHoursData}>
                <XAxis dataKey="hour" fontSize={10} stroke="#94A3B8" />
                <YAxis fontSize={10} stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F172A", borderRadius: "12px", color: "#FFF", fontSize: "12px" }}
                />
                <Bar dataKey="patients" fill="#1E40AF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Department Patient Share</h3>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={departmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} fill="#8884d8">
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {departmentData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="font-bold text-slate-700 dark:text-slate-300">{d.name} ({d.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
