const fs = require("fs");

// 1. NAVBAR.TSX
const navbarCode = `"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Activity, 
  Calendar, 
  Stethoscope, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  Moon, 
  Sun, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                  Radhix<span className="text-teal-600 dark:text-teal-400">Clinic</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  SaaS
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5">
                By Radhix Technologies
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            <Link 
              href="/doctors" 
              className="text-sm font-semibold text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-400 transition-colors"
            >
              Doctors
            </Link>
            <Link 
              href="/#services" 
              className="text-sm font-semibold text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-400 transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/my-appointments" 
              className="text-sm font-semibold text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-400 transition-colors"
            >
              My Appointments
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-semibold text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-400 transition-colors"
            >
              About Clinic
            </Link>
            <Link 
              href="/contact" 
              className="text-sm font-semibold text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-teal-400 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Try Demo Button */}
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Try Demo Admin</span>
            </Link>

            {/* Book Now Primary Button */}
            <Link
              href="/book"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-md shadow-blue-700/25 transition-all hover:shadow-lg hover:shadow-blue-700/35 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            <Link 
              href="/doctors" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Doctors Directory
            </Link>
            <Link 
              href="/#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Services & Specialties
            </Link>
            <Link 
              href="/my-appointments" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              My Appointments
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              About Radhix Clinic
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Contact Us
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-amber-800 bg-amber-100 dark:bg-amber-950 dark:text-amber-300"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Try Demo Admin Panel</span>
              </Link>
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-blue-700"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Now</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
`;

fs.writeFileSync("src/components/public/Navbar.tsx", navbarCode, "utf8");
console.log("Created src/components/public/Navbar.tsx");

// 2. FOOTER.TSX
const footerCode = `import React from "react";
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
                <span>Indiranagar, Bengaluru, KA 560038</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-semibold text-white">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>care@radhixclinic.com</span>
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
`;

fs.writeFileSync("src/components/public/Footer.tsx", footerCode, "utf8");
console.log("Created src/components/public/Footer.tsx");
