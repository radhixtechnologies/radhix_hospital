"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { DEFAULT_DOCTORS } from "@/lib/store";
import { Star, Search, Filter, ShieldCheck, Calendar, ArrowRight, Clock, Award } from "lucide-react";

import { Suspense } from "react";

function DoctorsContent() {
  const searchParams = useSearchParams();
  const initialSpecialty = searchParams.get("specialty") || "";
  const initialQuery = searchParams.get("query") || "";

  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [maxFee, setMaxFee] = useState<number>(1000);

  const filteredDoctors = useMemo(() => {
    return DEFAULT_DOCTORS.filter((doc) => {
      const matchSpecialty = selectedSpecialty ? doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()) : true;
      const matchQuery = searchQuery
        ? doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.bio.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchFee = doc.consultation_fee <= maxFee;
      return matchSpecialty && matchQuery && matchFee;
    });
  }, [selectedSpecialty, searchQuery, maxFee]);

  const specialties = [
    "All Specialties",
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Pediatrics",
    "Neurology",
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Our Medical Specialists
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Consult experienced physicians with transparent consultation fees and instant live slot booking.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctor name or symptom..."
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Specialty selector */}
              <div>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value === "All Specialties" ? "" : e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {specialties.map((s, idx) => (
                    <option key={idx} value={s === "All Specialties" ? "" : s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Max Fee Slider */}
              <div className="flex items-center gap-3 px-3">
                <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Max Fee: ₹{maxFee}</span>
                <input
                  type="range"
                  min="400"
                  max="1200"
                  step="50"
                  value={maxFee}
                  onChange={(e) => setMaxFee(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Filter Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filters:
              </span>
              {specialties.slice(1).map((spec, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSpecialty(selectedSpecialty === spec ? "" : spec)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedSpecialty === spec
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {spec}
                </button>
              ))}
              {(selectedSpecialty || searchQuery || maxFee < 1000) && (
                <button
                  onClick={() => {
                    setSelectedSpecialty("");
                    setSearchQuery("");
                    setMaxFee(1000);
                  }}
                  className="text-xs font-bold text-rose-600 hover:underline ml-auto"
                >
                  Reset All
                </button>
              )}
            </div>
          </div>

          {/* Doctors Grid */}
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="text-lg font-bold text-slate-700 dark:text-slate-300">No doctors match your criteria.</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting the specialty or increasing the fee filter.</p>
              <button
                onClick={() => {
                  setSelectedSpecialty("");
                  setSearchQuery("");
                  setMaxFee(1000);
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-60 w-full bg-slate-100 dark:bg-slate-800">
                      <img
                        src={doc.avatar_url}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-200/50 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                        <span>Available Today</span>
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-amber-400 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{doc.rating}</span>
                        <span className="text-slate-300">({doc.review_count})</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-2">
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide">
                        {doc.specialty}
                      </span>
                      <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {doc.qualification}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 pt-1 leading-relaxed">
                        {doc.bio}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Consultation Fee</span>
                        <p className="text-xl font-black text-slate-900 dark:text-white">₹{doc.consultation_fee}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Experience</span>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{doc.experience_years} Years</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/doctors/${doc.id}`}
                        className="py-3 rounded-xl text-xs font-bold text-center text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
                      >
                        Profile & Reviews
                      </Link>
                      <Link
                        href={`/book?doctorId=${doc.id}`}
                        className="py-3 rounded-xl text-xs font-bold text-center text-white bg-blue-700 hover:bg-blue-800 shadow-md shadow-blue-700/25 transition-all hover:scale-[1.02]"
                      >
                        Book Slot
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}


export default function DoctorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-500">Loading doctors directory...</div>}>
      <DoctorsContent />
    </Suspense>
  );
}
