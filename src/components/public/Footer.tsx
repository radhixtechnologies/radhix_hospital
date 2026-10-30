import React from "react";
import Link from "next/link";
import { Activity, Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white shadow-lg">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Radhix<span className="text-teal-400">Clinic</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Next-generation clinical appointment booking and management SaaS platform.
              Empowering healthcare providers with real-time slot scheduling, digital payments,
              and patient delight.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>HIPAA Compliant & ISO 27001 Certified Architecture</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Patient Portal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/book" className="hover:text-teal-400 transition-colors">Book Appointment</Link></li>
              <li><Link href="/doctors" className="hover:text-teal-400 transition-colors">Find Doctors</Link></li>
              <li><Link href="/my-appointments" className="hover:text-teal-400 transition-colors">Track My Booking</Link></li>
              <li><Link href="/my-appointments" className="hover:text-teal-400 transition-colors">Reschedule / Cancel</Link></li>
              <li><Link href="/widget-embed" className="hover:text-teal-400 transition-colors">Embed Widget</Link></li>
            </ul>
          </div>

          {/* Specialties */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Specialties</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/doctors?specialty=Cardiology" className="hover:text-teal-400 transition-colors">Cardiology</Link></li>
              <li><Link href="/doctors?specialty=Dermatology" className="hover:text-teal-400 transition-colors">Dermatology</Link></li>
              <li><Link href="/doctors?specialty=Orthopedics" className="hover:text-teal-400 transition-colors">Orthopedics</Link></li>
              <li><Link href="/doctors?specialty=Pediatrics" className="hover:text-teal-400 transition-colors">Pediatrics</Link></li>
              <li><Link href="/doctors?specialty=Neurology" className="hover:text-teal-400 transition-colors">Neurology</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white">Clinic Hours & Helpline</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>3rd Floor, Vipul plaza, 321, Sector 81, Faridabad, Haryana 121002</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-semibold text-white">+91 70427 93777</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>sales@radhix.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Powered by Radhix Technologies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 Radhix Clinic. All rights reserved.</span>
            <span>•</span>
            <span className="font-semibold text-teal-400">Powered by Radhix Technologies</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/admin/login" className="text-amber-400 hover:text-amber-300 font-semibold">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
