const fs = require("fs");

// ABOUT PAGE: src/app/about/page.tsx
const aboutCode = `import React from "react";
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
            <Link href="/admin/login" className="px-6 py-3 rounded-xl bg-white text-blue-800 font-bold text-xs shadow-lg hover:bg-blue-50 transition-all">
              Try SaaS Demo Panel
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
`;

fs.writeFileSync("src/app/about/page.tsx", aboutCode, "utf8");

// CONTACT PAGE: src/app/contact/page.tsx
const contactPageCode = `import React from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Get in Touch</h1>
            <p className="text-sm text-slate-500">We respond to inquiries within 15 minutes during operating hours.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Clinic Headquarters</h3>
              <p className="text-xs text-slate-500">Plot 42, Tech Park Boulevard, Indiranagar, Bengaluru, KA 560038</p>
              <div className="pt-2 space-y-2 text-xs">
                <p><strong>Appointments Helpline:</strong> +91 98765 43210</p>
                <p><strong>Emergency Ambulance:</strong> +91 98765 00999</p>
                <p><strong>Email:</strong> care@radhixclinic.com</p>
                <p><strong>Hours:</strong> Mon - Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Quick Inquiry Form</h3>
              <form className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-800 dark:text-slate-200 outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-800 dark:text-slate-200 outline-none"
                />
                <textarea
                  rows={3}
                  placeholder="Your Question or Feedback"
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-800 dark:text-slate-200 outline-none"
                />
                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl bg-blue-700 text-white font-bold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
`;

fs.writeFileSync("src/app/contact/page.tsx", contactPageCode, "utf8");

// EMBED WIDGET PAGE: src/app/widget-embed/page.tsx
const widgetCode = `"use client";

import React, { useState } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { Copy, Check, Code2, Globe } from "lucide-react";

export default function WidgetEmbedPage() {
  const [copied, setCopied] = useState(false);

  const embedSnippet = \`<iframe 
  src="https://radhixclinic.com/book" 
  width="100%" 
  height="700" 
  frameborder="0" 
  style="border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);" 
  allow="payment"
></iframe>\`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 dark:bg-teal-950 px-3 py-1 rounded-full border border-teal-500/20">
              Developer & Clinic Tools
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Embeddable Clinic Booking Widget
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Copy this lightweight iframe snippet and paste it into WordPress, Webflow, Squarespace, or any custom website.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-slate-200 space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
              <span className="font-mono text-teal-400">HTML Iframe Embed Code</span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Snippet"}</span>
              </button>
            </div>
            <pre className="font-mono text-xs overflow-x-auto text-blue-300">
              {embedSnippet}
            </pre>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Widget Features:</h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-5">
              <li>Auto-adapts to container width (fully responsive on mobile & desktop).</li>
              <li>Includes full 4-step booking flow, doctor picker, and Razorpay integration.</li>
              <li>Syncs directly into your clinic admin dashboard in real-time.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
`;

fs.writeFileSync("src/app/widget-embed/page.tsx", widgetCode, "utf8");
console.log("Created static pages (about, contact, widget-embed)!");
