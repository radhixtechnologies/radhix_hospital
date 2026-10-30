import React from "react";
import { UserCheck, CalendarDays, CheckCircle2, QrCode } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choose Doctor & Service",
      desc: "Explore verified doctor credentials, experience, patient reviews, and transparent consultation fees.",
      icon: UserCheck,
    },
    {
      step: "02",
      title: "Select Live Slot & Pay",
      desc: "Pick your preferred date and exact time slot. Pay online via Razorpay (UPI/Card) or choose Pay at Clinic.",
      icon: CalendarDays,
    },
    {
      step: "03",
      title: "Instant QR Confirmation",
      desc: "Receive booking ID, WhatsApp & Email confirmations, and a digital QR code for instant zero-wait check-in.",
      icon: QrCode,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
            Effortless Healthcare
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Radhix Clinic Works in 3 Simple Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Designed for frictionless booking without waiting lines or manual phone calls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-700/25">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-slate-300 dark:text-slate-700">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
