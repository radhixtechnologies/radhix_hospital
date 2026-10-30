import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Arjun Malhotra",
      treatment: "Cardiac Consultation",
      doctor: "Dr. Rajesh Sharma",
      rating: 5,
      comment: "Dr. Rajesh explained my father's 12-lead ECG with utmost clarity. The slot was completely on time without waiting. The online booking and WhatsApp alerts are fabulous.",
      city: "Bengaluru",
    },
    {
      name: "Sneha Kapoor",
      treatment: "Acne Scar Laser Therapy",
      doctor: "Dr. Priya Patel",
      rating: 5,
      comment: "Best dermatology experience in the city. The clinic has clinical grade hygiene and Dr. Priya gave me a realistic 6-week treatment plan that worked like magic.",
      city: "Bengaluru",
    },
    {
      name: "Manish Gupta",
      treatment: "Joint Mobility Assessment",
      doctor: "Dr. Amit Verma",
      rating: 5,
      comment: "Dr. Amit's consultation for knee arthroscopy was reassuring and modern. Received my digital invoice and prescription on WhatsApp within seconds.",
      city: "Bengaluru",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            Patient Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by 50,000+ Happy Patients
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Read real feedback from patients who booked through Radhix Clinic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    {r.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  </h4>
                  <p className="text-xs text-slate-500">
                    {r.treatment} • {r.city}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-blue-700 dark:text-teal-400">
                  {r.doctor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
