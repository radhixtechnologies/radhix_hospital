import React from "react";
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
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${srv.color} flex items-center justify-center shadow-inner`}>
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
                    href={`/book?serviceId=${srv.id}`}
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
