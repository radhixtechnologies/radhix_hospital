import React from "react";
import { Phone, Mail, MapPin, Clock, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
              Emergency & Inquiries
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              We are here to assist your family 7 days a week.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Have a question about doctor availability, diagnostic services, or insurance tie-ups?
              Reach out to our patient care desk directly.
            </p>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300">24/7 Medical Emergency Response</p>
                <p className="text-xs text-amber-700/80 dark:text-amber-400/80">Call our direct ambulance line: +91 98765 00999</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <MapPin className="w-5 h-5 text-blue-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Faridabad Clinic (HQ)</h4>
                <p className="text-xs text-slate-500 mt-1">3rd Floor, Vipul plaza, 321, Sector 81, Faridabad, Haryana 121002</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <Clock className="w-5 h-5 text-teal-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Consultation Hours</h4>
                <p className="text-xs text-slate-500 mt-1">Mon - Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Right CTA Card */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-teal-700 text-white shadow-2xl space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to consult a senior specialist?
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Take charge of your health today. Choose your specialist, pick your time, and enjoy zero wait time at Radhix Clinic.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  href="/book"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-blue-800 font-extrabold text-sm shadow-lg hover:bg-blue-50 transition-all text-center"
                >
                  Book Appointment Now
                </Link>
                <Link
                  href="/doctors"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-900/60 hover:bg-blue-900/80 border border-white/20 text-white font-bold text-sm transition-all text-center"
                >
                  Browse All Doctors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
