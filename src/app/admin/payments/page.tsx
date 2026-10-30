"use client";

import React, { useState } from "react";
import { clinicStore } from "@/lib/store";
import { formatCurrency, getStatusBadgeClass } from "@/lib/utils";
import { CreditCard, Download, CheckCircle2, Clock, Filter } from "lucide-react";

export default function AdminPaymentsPage() {
  const appointments = clinicStore.getAppointments();
  const [filter, setFilter] = useState("all");

  const transactions = appointments.filter((a) => {
    if (filter === "online") return a.payment_method === "online";
    if (filter === "pay_at_clinic") return a.payment_method === "pay_at_clinic";
    if (filter === "paid") return a.payment_status === "paid";
    if (filter === "due") return a.payment_status === "due";
    return true;
  });

  const totalCollected = appointments
    .filter((a) => a.payment_status === "paid")
    .reduce((sum, a) => sum + a.total_amount, 0);

  const totalDue = appointments
    .filter((a) => a.payment_status === "due" && a.status !== "cancelled")
    .reduce((sum, a) => sum + a.total_amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Payments & Collections
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Razorpay settlements, cash-at-desk logs, and digital GST receipts.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Print Financial Summary</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Total Collected</span>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">₹{totalCollected}</p>
          <p className="text-[11px] text-slate-400">Online & verified desk cash</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Uncollected / Desk Due</span>
          <p className="text-3xl font-black text-amber-600 dark:text-amber-400">₹{totalDue}</p>
          <p className="text-[11px] text-slate-400">Patients arriving today</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500">Razorpay Gateway Status</span>
          <p className="text-lg font-bold text-blue-600 flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Active (Test Mode)</span>
          </p>
          <p className="text-[11px] text-slate-400">UPI, Netbanking & Cards enabled</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200">Transaction History</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
          >
            <option value="all">All Payments</option>
            <option value="online">Online (Razorpay)</option>
            <option value="pay_at_clinic">Pay at Clinic</option>
            <option value="paid">Status: Paid</option>
            <option value="due">Status: Due</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Booking ID</th>
                <th className="pb-3">Patient</th>
                <th className="pb-3">Doctor</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Method</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-bold text-blue-700 dark:text-teal-400">{t.booking_id}</td>
                  <td className="py-3 font-bold text-slate-900 dark:text-white">{t.patient_name}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">{t.doctor_name}</td>
                  <td className="py-3 font-black text-slate-900 dark:text-white">₹{t.total_amount}</td>
                  <td className="py-3 uppercase text-[11px] font-bold text-slate-500">
                    {t.payment_method === "online" ? "Online (UPI/Card)" : "Cash / Desk"}
                  </td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(t.payment_status)}`}>
                      {t.payment_status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => alert("Printing invoice receipt for " + t.booking_id)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-[10px]"
                    >
                      Invoice PDF
                    </button>
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
