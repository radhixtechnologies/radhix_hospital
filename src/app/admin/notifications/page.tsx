"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, Smartphone, Send, Check } from "lucide-react";

export default function AdminNotificationsPage() {
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [testSent, setTestSent] = useState(false);

  const [confirmTemplate, setConfirmTemplate] = useState(
    "Namaste {{patient_name}}, your appointment with {{doctor_name}} is confirmed for {{date}} at {{time}}. Location: Radhix Clinic Faridabad. Check-in QR: {{qr_link}}"
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
