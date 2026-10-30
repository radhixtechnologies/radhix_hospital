const fs = require("fs");

// 1. REPORTS & ANALYTICS: src/app/admin/reports/page.tsx
const reportsCode = `"use client";

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
                    <Cell key={\`cell-\${index}\`} fill={entry.color} />
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
`;

fs.writeFileSync("src/app/admin/reports/page.tsx", reportsCode, "utf8");

// 2. NOTIFICATIONS: src/app/admin/notifications/page.tsx
const notificationsCode = `"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, Smartphone, Send, Check } from "lucide-react";

export default function AdminNotificationsPage() {
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const [confirmTemplate, setConfirmTemplate] = useState(
    "Namaste {{patient_name}}, your appointment with {{doctor_name}} is confirmed for {{date}} at {{time}}. Location: Radhix Clinic Indiranagar. Check-in QR: {{qr_link}}"
  );

  const handleSendTest = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Patient Notification Automation
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Automated WhatsApp, Email (Resend), and SMS alerts for booking confirmations and reminders.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <input
              type="checkbox"
              checked={whatsappEnabled}
              onChange={(e) => setWhatsappEnabled(e.target.checked)}
              className="w-5 h-5 accent-emerald-600 cursor-pointer"
            />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">WhatsApp Cloud API</h3>
          <p className="text-xs text-slate-500">Delivers booking confirmation, reminder & check-in QR pass.</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="checkbox"
              checked={emailEnabled}
              onChange={(e) => setEmailEnabled(e.target.checked)}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Resend Email Gateway</h3>
          <p className="text-xs text-slate-500">Sends digital receipt PDF and calendar invite (.ics).</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <input
              type="checkbox"
              checked={smsEnabled}
              onChange={(e) => setSmsEnabled(e.target.checked)}
              className="w-5 h-5 accent-amber-600 cursor-pointer"
            />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Transactional SMS</h3>
          <p className="text-xs text-slate-500">DND-compliant backup alerts for urgent schedule changes.</p>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">Booking Confirmation Template</h3>
        <p className="text-xs text-slate-400">Available variables: {'{{patient_name}}, {{doctor_name}}, {{date}}, {{time}}, {{booking_id}}, {{qr_link}}'}</p>
        
        <textarea
          rows={4}
          value={confirmTemplate}
          onChange={(e) => setConfirmTemplate(e.target.value)}
          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border text-xs font-mono leading-relaxed"
        />

        <div className="flex justify-between items-center pt-2">
          {testSent && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" /> Test WhatsApp message dispatched!
            </span>
          )}
          <button
            onClick={handleSendTest}
            className="ml-auto px-5 py-2.5 rounded-xl bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Send Test Alert to Admin Phone</span>
          </button>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync("src/app/admin/notifications/page.tsx", notificationsCode, "utf8");

// 3. SETTINGS: src/app/admin/settings/page.tsx
const settingsCode = `"use client";

import React, { useState } from "react";
import { Building, CreditCard, Clock, Globe, ShieldCheck, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [clinicName, setClinicName] = useState("Radhix Super-Speciality Clinic");
  const [brandColor, setBrandColor] = useState("#1E40AF");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("care@radhixclinic.com");
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
`;

fs.writeFileSync("src/app/admin/settings/page.tsx", settingsCode, "utf8");

// 4. SUPER ADMIN MULTI-TENANT: src/app/admin/super-admin/page.tsx
const superAdminCode = `"use client";

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
`;

fs.writeFileSync("src/app/admin/super-admin/page.tsx", superAdminCode, "utf8");
console.log("Created reports, notifications, settings, and super-admin modules!");
