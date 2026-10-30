const fs = require("fs");

// HERO SECTION
const heroCode = `"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  MapPin, 
  ArrowRight,
  UserCheck,
  CheckCircle2
} from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [specialty, setSpecialty] = useState("");
  const [doctorQuery, setDoctorQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (specialty) params.set("specialty", specialty);
    if (doctorQuery) params.set("query", doctorQuery);
    router.push("/doctors?" + params.toString());
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/60 via-teal-50/40 to-transparent dark:from-blue-950/20 dark:via-teal-950/10 dark:to-transparent pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-teal-400/10 dark:bg-teal-400/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 left-10 w-72 h-72 rounded-full bg-blue-600/10 dark:bg-blue-600/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Real-Time Slot Engine • Zero Waiting Queue</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Book your doctor appointment in{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-500 bg-clip-text text-transparent">
                60 seconds.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Find certified specialists, view real-time available consultation slots,
              and receive instant WhatsApp & Google Calendar confirmations.
            </p>

            {/* Search Card */}
            <form 
              onSubmit={handleSearch}
              className="p-3 sm:p-4 rounded-2xl glass-panel shadow-xl shadow-slate-200/50 dark:shadow-black/40 border border-slate-200/90 dark:border-slate-800 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3"
            >
              {/* Specialty Selector */}
              <div className="flex-1 min-w-[180px]">
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 pl-1">
                  Select Specialty
                </label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">All Specialties</option>
                  <option value="Cardiology">Cardiology (Heart)</option>
                  <option value="Dermatology">Dermatology (Skin & Hair)</option>
                  <option value="Orthopedics">Orthopedics (Bones & Joints)</option>
                  <option value="Pediatrics">Pediatrics (Child Health)</option>
                  <option value="Neurology">Neurology (Brain & Nerves)</option>
                </select>
              </div>

              {/* Doctor / Keyword input */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 pl-1">
                  Doctor or Symptom
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={doctorQuery}
                    onChange={(e) => setDoctorQuery(e.target.value)}
                    placeholder="e.g. Dr. Rajesh or Headache"
                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="sm:self-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto h-11 px-6 rounded-xl text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-md shadow-blue-700/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Slots</span>
                </button>
              </div>
            </form>

            {/* Quick feature highlights */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Pay Online or at Clinic
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                No Double Bookings Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Instant Reschedule / Cancel
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Live Doctor & Booking Simulation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl shadow-blue-900/10 border border-slate-200 dark:border-slate-800">
              
              {/* Doctor Header Preview */}
              <div className="flex items-center gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80"
                  alt="Dr. Rajesh Sharma"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-600/30"
                />
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-bold">
                    <span>Cardiology Specialist</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    Dr. Rajesh Sharma
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    MD, DM (AIIMS) • 15 Years Exp
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>4.95</span>
                    <span className="text-slate-400 font-normal">(128 patient reviews)</span>
                  </div>
                </div>
              </div>

              {/* Slot Picker Live Simulation */}
              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-600" /> Today's Open Slots
                  </span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">
                    ● Available Now
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="py-2 text-center text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                    10:30 AM
                  </span>
                  <span className="py-2 text-center text-xs font-semibold rounded-xl bg-blue-700 text-white shadow-sm ring-2 ring-blue-500/50">
                    11:30 AM ✓
                  </span>
                  <span className="py-2 text-center text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 line-through">
                    02:00 PM
                  </span>
                  <span className="py-2 text-center text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                    03:30 PM
                  </span>
                  <span className="py-2 text-center text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                    04:30 PM
                  </span>
                  <span className="py-2 text-center text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                    05:00 PM
                  </span>
                </div>
              </div>

              {/* Consultation Fee & CTA */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Consultation Fee</span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">₹800</span>
                </div>
                <Link
                  href="/book?doctorId=doc-1"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-600/20 flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <span>Book in 60s</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Floating Social Proof Pill */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">40+ Booked Today</p>
                  <p className="text-[10px] text-slate-500">Confirmed without wait</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync("src/components/public/HeroSection.tsx", heroCode, "utf8");
console.log("Created src/components/public/HeroSection.tsx");

// TRUST BADGES
const trustCode = `import React from "react";
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
`;

fs.writeFileSync("src/components/public/TrustBadges.tsx", trustCode, "utf8");
console.log("Created src/components/public/TrustBadges.tsx");
