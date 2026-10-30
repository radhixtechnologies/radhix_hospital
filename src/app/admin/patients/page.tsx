"use client";

import React, { useState } from "react";
import { DEFAULT_PATIENTS } from "@/lib/store";
import { Search, Phone, Mail, User, Calendar, FileText } from "lucide-react";

export default function AdminPatientsPage() {
  const [patients] = useState(DEFAULT_PATIENTS);
  const [search, setSearch] = useState("");

  const filtered = patients.filter((p) =>
    p.full_name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    (p.email && p.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Patients Directory
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Registered OPD patient records, past consult history, and clinical notes.
        </p>
      </div>

      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by patient name, phone number, or email..."
          className="w-full bg-transparent text-xs font-semibold outline-none"
        />
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <th className="pb-3">Patient Name</th>
              <th className="pb-3">Contact</th>
              <th className="pb-3">Age / Gender</th>
              <th className="pb-3">Blood Group</th>
              <th className="pb-3">Registration Date</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {filtered.map((pat) => (
              <tr key={pat.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                <td className="py-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 flex items-center justify-center font-bold text-[11px]">
                    {pat.full_name[0]}
                  </div>
                  <span>{pat.full_name}</span>
                </td>
                <td className="py-3">
                  <span className="block font-bold text-slate-800 dark:text-slate-200">{pat.phone}</span>
                  <span className="text-slate-400 text-[11px]">{pat.email || "No email"}</span>
                </td>
                <td className="py-3 text-slate-600 dark:text-slate-300">
                  {pat.age ? `${pat.age} yrs` : "N/A"} • {pat.gender || "N/A"}
                </td>
                <td className="py-3 font-bold text-rose-600">{pat.blood_group || "O+"}</td>
                <td className="py-3 text-slate-500">{pat.created_at}</td>
                <td className="py-3 text-right">
                  <button className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]">
                    History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
