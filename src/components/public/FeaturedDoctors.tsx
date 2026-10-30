"use client";

import React from "react";
import Link from "next/link";
import { Star, Calendar, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { DEFAULT_DOCTORS } from "@/lib/store";

export default function FeaturedDoctors() {
  const doctors = DEFAULT_DOCTORS.slice(0, 4);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
              Verified Specialists
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Senior Physicians
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Select your specialist and pick an immediate appointment slot.
            </p>
          </div>

          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-blue-700 dark:text-teal-400 border border-blue-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            <span>View All Doctors (5)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Doctor Photo */}
                <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden group">
                  <img
                    src={doc.avatar_url}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>Verified</span>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{doc.rating}</span>
                    <span className="text-slate-300">({doc.review_count})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400 block uppercase tracking-wide">
                    {doc.specialty}
                  </span>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-snug">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {doc.qualification}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 pt-1 leading-relaxed">
                    {doc.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Card Area */}
              <div className="p-5 pt-0">
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Fee</span>
                    <p className="text-lg font-black text-slate-900 dark:text-white">₹{doc.consultation_fee}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Experience</span>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{doc.experience_years} Years</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/doctors/${doc.id}`}
                    className="py-2.5 rounded-xl text-xs font-bold text-center text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
                  >
                    View Bio
                  </Link>
                  <Link
                    href={`/book?doctorId=${doc.id}`}
                    className="py-2.5 rounded-xl text-xs font-bold text-center text-white bg-blue-700 hover:bg-blue-800 shadow-md shadow-blue-700/20 transition-all hover:scale-[1.02]"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
