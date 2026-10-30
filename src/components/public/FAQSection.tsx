"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      q: "Can I reschedule or cancel my appointment?",
      a: "Yes! You can reschedule or cancel anytime up to 4 hours before your scheduled slot. Just visit the 'My Appointments' page, enter your booking ID or phone number, and choose a new date or cancel.",
    },
    {
      q: "Do I have to pay online when booking?",
      a: "No, pre-payment is completely optional. You can choose 'Pay Online via Razorpay' (UPI, credit/debit card, netbanking) or select 'Pay at Clinic' to pay via cash, card, or UPI at the front desk when you arrive.",
    },
    {
      q: "How does the zero double-booking guarantee work?",
      a: "Our slot engine uses atomic PostgreSQL constraints to lock slots in real-time. Once an appointment is placed, that slot is instantly disabled across all devices.",
    },
    {
      q: "Will I get confirmation and reminder notifications?",
      a: "Yes. You receive an instant WhatsApp message & email containing your booking ID, doctor details, Google Calendar link, and check-in QR code.",
    },
    {
      q: "Can our clinic embed this booking widget into our existing website?",
      a: "Yes! We provide an embeddable widget snippet that you can paste into WordPress, Webflow, or custom websites in seconds.",
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Everything you need to know about booking, payments, and clinic visits.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white"
                >
                  <span className="text-sm sm:text-base">{f.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
