"use client";

import React, { useState } from "react";
import { Building, CreditCard, Clock, Globe, ShieldCheck, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [clinicName, setClinicName] = useState("Radhix Super-Speciality Clinic");
  const [brandColor, setBrandColor] = useState("#1E40AF");
  const [phone, setPhone] = useState("+91 70427 93777");
  const [email, setEmail] = useState("sales@radhix.com");
  const [razorpayTestMode, setRazorpayTestMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Clinic Profile & Platform Rules
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage clinic brand identity, payment credentials, and operational rules.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Clinic Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-600 mb-1">Clinic Name</label>
              <input
                type="text"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-600 mb-1">Primary Brand Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-10 h-10 p-0 border-none rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="flex-1 h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-600 mb-1">Helpline Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-600 mb-1">Official Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border"
              />
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Razorpay Payment Gateway</h3>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs">
            <div>
              <span className="font-bold block">Sandbox / Test Mode Toggle</span>
              <span className="text-slate-400">Accept demo payments without debiting real bank cards</span>
            </div>
            <input
              type="checkbox"
              checked={razorpayTestMode}
              onChange={(e) => setRazorpayTestMode(e.target.checked)}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {saved && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" /> Settings saved successfully!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
