import React from "react";
import { Users, Clock, Star, ShieldCheck, HeartHandshake, Award } from "lucide-react";

export default function TrustBadges() {
  const stats = [
    { label: "Happy Patients Treated", value: "50,000+", icon: Users, sub: "Across all clinical departments" },
    { label: "Verified Specialists", value: "25+", icon: Award, sub: "Trained at AIIMS & premier institutes" },
    { label: "Average Patient Rating", value: "4.92 / 5", icon: Star, sub: "From 1,200+ verified Google reviews" },
    { label: "Average Wait Time", value: "< 7 Mins", icon: Clock, sub: "Guaranteed slot adherence" },
  ];

  return (
    <section className="py-10 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {s.value}
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {s.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
