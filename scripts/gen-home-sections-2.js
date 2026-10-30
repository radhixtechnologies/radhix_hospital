const fs = require("fs");

// SERVICES SECTION
const servicesCode = `import React from "react";
import Link from "next/link";
import { Heart, Sparkles, Activity, Baby, Brain, Stethoscope, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      id: "srv-1",
      name: "Cardiology & Heart Care",
      desc: "Complete cardiac evaluation including 12-lead digital ECG, hypertension protocol, and preventive cardiology.",
      fee: "₹800",
      duration: "30 Mins",
      icon: Heart,
      color: "from-rose-500/20 to-red-500/10 text-rose-600 dark:text-rose-400",
      doctorLink: "/doctors?specialty=Cardiology",
    },
    {
      id: "srv-2",
      name: "Dermatology & Skin Clinic",
      desc: "Advanced acne treatment, aesthetic cosmetology, eczema relief, and personalized hair loss restoration.",
      fee: "₹600",
      duration: "20 Mins",
      icon: Sparkles,
      color: "from-amber-500/20 to-yellow-500/10 text-amber-600 dark:text-amber-400",
      doctorLink: "/doctors?specialty=Dermatology",
    },
    {
      id: "srv-3",
      name: "Orthopedics & Joint Care",
      desc: "Robotic joint evaluations, arthroscopy consultations, arthritis therapy, and sports injury rehabilitation.",
      fee: "₹750",
      duration: "30 Mins",
      icon: Activity,
      color: "from-blue-500/20 to-indigo-500/10 text-blue-600 dark:text-blue-400",
      doctorLink: "/doctors?specialty=Orthopedics",
    },
    {
      id: "srv-4",
      name: "Pediatrics & Child Health",
      desc: "Comprehensive child growth monitoring, national vaccination schedules, neonatal advice, and allergy care.",
      fee: "₹500",
      duration: "20 Mins",
      icon: Baby,
      color: "from-teal-500/20 to-emerald-500/10 text-teal-600 dark:text-teal-400",
      doctorLink: "/doctors?specialty=Pediatrics",
    },
    {
      id: "srv-5",
      name: "Neurology & Nerve Health",
      desc: "Comprehensive migraine evaluation, nerve conduction assessments, stroke rehabilitation, and epilepsy care.",
      fee: "₹900",
      duration: "30 Mins",
      icon: Brain,
      color: "from-purple-500/20 to-violet-500/10 text-purple-600 dark:text-purple-400",
      doctorLink: "/doctors?specialty=Neurology",
    },
    {
      id: "srv-6",
      name: "Preventive Health Checkup",
      desc: "Vital signs review, random blood sugar test, BMI evaluation, and full physician health counseling.",
      fee: "₹450",
      duration: "25 Mins",
      icon: Stethoscope,
      color: "from-sky-500/20 to-cyan-500/10 text-sky-600 dark:text-sky-400",
      doctorLink: "/book",
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            Clinical Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Specialized Medical Departments
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Transparent pricing, modern diagnostic equipment, and senior consultants for your family.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="group relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={\`w-12 h-12 rounded-2xl bg-gradient-to-br \${srv.color} flex items-center justify-center shadow-inner\`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">{srv.fee}</span>
                    <span className="block text-[11px] text-slate-400 font-medium">{srv.duration}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors">
                  {srv.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {srv.desc}
                </p>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={srv.doctorLink}
                    className="text-xs font-bold text-blue-600 dark:text-teal-400 flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    <span>View Specialists</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={\`/book?serviceId=\${srv.id}\`}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors"
                  >
                    Book Slot
                  </Link>
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

fs.writeFileSync("src/components/public/ServicesSection.tsx", servicesCode, "utf8");
console.log("Created src/components/public/ServicesSection.tsx");

// HOW IT WORKS SECTION
const howItWorksCode = `import React from "react";
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
`;

fs.writeFileSync("src/components/public/HowItWorks.tsx", howItWorksCode, "utf8");
console.log("Created src/components/public/HowItWorks.tsx");

// FEATURED DOCTORS
const featuredDoctorsCode = `"use client";

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
                    href={\`/doctors/\${doc.id}\`}
                    className="py-2.5 rounded-xl text-xs font-bold text-center text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
                  >
                    View Bio
                  </Link>
                  <Link
                    href={\`/book?doctorId=\${doc.id}\`}
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
`;

fs.writeFileSync("src/components/public/FeaturedDoctors.tsx", featuredDoctorsCode, "utf8");
console.log("Created src/components/public/FeaturedDoctors.tsx");

// TESTIMONIALS
const testimonialsCode = `import React from "react";
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
`;

fs.writeFileSync("src/components/public/TestimonialsSection.tsx", testimonialsCode, "utf8");
console.log("Created src/components/public/TestimonialsSection.tsx");

// FAQ SECTION
const faqCode = `"use client";

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
                    className={\`w-5 h-5 text-slate-400 transition-transform duration-200 \${isOpen ? "rotate-180 text-blue-600" : ""}\`}
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
`;

fs.writeFileSync("src/components/public/FAQSection.tsx", faqCode, "utf8");
console.log("Created src/components/public/FAQSection.tsx");

// CONTACT SECTION
const contactCode = `import React from "react";
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
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Bengaluru Main Clinic</h4>
                <p className="text-xs text-slate-500 mt-1">Plot 42, Tech Park Blvd, Indiranagar</p>
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
`;

fs.writeFileSync("src/components/public/ContactSection.tsx", contactCode, "utf8");
console.log("Created src/components/public/ContactSection.tsx");
