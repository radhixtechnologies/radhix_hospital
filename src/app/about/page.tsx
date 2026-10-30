import React from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { ShieldCheck, Award, Heart, Activity, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-500/20">
              About Radhix Clinic
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Transforming Outpatient Healthcare with Technology
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Founded under Radhix Technologies, Radhix Clinic brings human empathy and enterprise-grade software together to eliminate clinic queues, double bookings, and diagnostic delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <Award className="w-8 h-8 text-blue-600" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Senior Doctors Only</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                All clinical staff have verified medical council registrations and minimum 8+ years post-graduate clinical experience.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <Activity className="w-8 h-8 text-teal-600" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Instant Slot Sync</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Atomic database constraints ensure your booked slot is exclusively reserved. Zero overlapping appointments.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Data Privacy Guaranteed</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Patient records and prescription histories are protected with enterprise 256-bit encryption adhering to global healthcare security standards.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-700 to-teal-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold">Are you a healthcare practitioner?</h2>
              <p className="text-xs text-blue-100 mt-1">Get Radhix Clinic SaaS set up for your practice in under 24 hours.</p>
            </div>
            <Link href="/contact" className="px-6 py-3 rounded-xl bg-white text-blue-800 font-bold text-xs shadow-lg hover:bg-blue-50 transition-all">
              Contact Medical Desk
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
