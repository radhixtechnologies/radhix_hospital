const fs = require("fs");

const dashboardCode = `"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { clinicStore } from "@/lib/store";
import { getStatusBadgeClass } from "@/lib/utils";
import { 
  CalendarDays, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  CreditCard, 
  TrendingUp, 
  Users, 
  UserPlus, 
  ArrowUpRight,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  CartesianGrid 
} from "recharts";

export default function AdminDashboardPage() {
  const stats = clinicStore.getDashboardStats();
  const appointments = clinicStore.getAppointments();

  const todayAppointments = useMemo(() => {
    return appointments.slice(0, 7);
  }, [appointments]);

  // Chart sample data for past 7 days
  const chartData = [
    { day: "Mon", bookings: 12, revenue: 8400 },
    { day: "Tue", bookings: 18, revenue: 12600 },
    { day: "Wed", bookings: 15, revenue: 10500 },
    { day: "Thu", bookings: 22, revenue: 15400 },
    { day: "Fri", bookings: 20, revenue: 14000 },
    { day: "Sat", bookings: 28, revenue: 19600 },
    { day: "Today", bookings: appointments.length, revenue: stats.revenueToday },
  ];

  const handleUpdateStatus = (id: string, status: any, paymentStatus?: any) => {
    clinicStore.updateAppointmentStatus(id, status, paymentStatus);
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Today's Clinical Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time OPD monitor • {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/appointments"
            className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-700/25 flex items-center gap-1.5 transition-all"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Manage All Bookings</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Today */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Today's Visits</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.todayAppointmentsCount}
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14% vs yesterday</span>
          </div>
        </div>

        {/* Confirmed / Active */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Confirmed</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {stats.confirmedCount}
          </div>
          <p className="text-[11px] text-slate-400">Slots locked & verified</p>
        </div>

        {/* Revenue Collected Today */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Revenue Collected</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            ₹{stats.revenueToday}
          </div>
          <p className="text-[11px] text-slate-400">Paid online or collected</p>
        </div>

        {/* Amount Due (Pay at Clinic) */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Amount Due (OPD)</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
            ₹{stats.amountDueToday}
          </div>
          <p className="text-[11px] text-slate-400">{stats.pendingCount} pending payment at desk</p>
        </div>
      </div>

      {/* Charts Section: 7-Day Bookings & Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Bookings Trend Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">7-Day Appointment Bookings</h3>
              <p className="text-xs text-slate-400">Daily patient volume trends</p>
            </div>
            <span className="text-xs font-bold text-blue-600">Past Week</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" fontSize={11} stroke="#94A3B8" />
                <YAxis fontSize={11} stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderColor: "#1E293B",
                    borderRadius: "12px",
                    color: "#FFF",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="bookings" fill="#1E40AF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend Area Chart */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Revenue Growth (₹)</h3>
              <p className="text-xs text-slate-400">Total collection per day</p>
            </div>
            <span className="text-xs font-bold text-teal-600">INR</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" fontSize={11} stroke="#94A3B8" />
                <YAxis fontSize={11} stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderColor: "#1E293B",
                    borderRadius: "12px",
                    color: "#FFF",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#14B8A6" fillOpacity={1} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments Table with Quick Actions */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Active Queue & Today's Schedule</h3>
            <p className="text-xs text-slate-400">Real-time status controls for reception desk</p>
          </div>
          <Link href="/admin/appointments" className="text-xs font-bold text-blue-600 hover:underline">
            View All ({appointments.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Ref ID</th>
                <th className="pb-3">Patient</th>
                <th className="pb-3">Doctor</th>
                <th className="pb-3">Slot</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {todayAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-bold text-blue-700 dark:text-teal-400">{apt.booking_id}</td>
                  <td className="py-3 font-bold text-slate-900 dark:text-white">{apt.patient_name}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">{apt.doctor_name}</td>
                  <td className="py-3 text-slate-700 dark:text-slate-200 font-semibold">{apt.time_slot}</td>
                  <td className="py-3">
                    <span className={\`px-2.5 py-1 rounded-full text-[10px] font-bold border \${getStatusBadgeClass(apt.payment_status)}\`}>
                      {apt.payment_status.toUpperCase()} (₹{apt.total_amount})
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={\`px-2.5 py-1 rounded-full text-[10px] font-bold border \${getStatusBadgeClass(apt.status)}\`}>
                      {apt.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-right space-x-1.5">
                    {apt.status !== "completed" && (
                      <button
                        onClick={() => handleUpdateStatus(apt.id, "completed", "paid")}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold hover:bg-emerald-100 text-[10px]"
                      >
                        Complete
                      </button>
                    )}
                    {apt.payment_status === "due" && (
                      <button
                        onClick={() => handleUpdateStatus(apt.id, apt.status, "paid")}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100 text-[10px]"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync("src/app/admin/dashboard/page.tsx", dashboardCode, "utf8");
console.log("Created src/app/admin/dashboard/page.tsx successfully!");
