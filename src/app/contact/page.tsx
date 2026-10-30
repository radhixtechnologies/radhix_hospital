import React from "react";
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
              <p className="text-xs text-slate-500">3rd Floor, Vipul plaza, 321, Sector 81, Faridabad, Haryana 121002</p>
              <div className="pt-2 space-y-2 text-xs">
                <p><strong>Appointments Helpline:</strong> +91 70427 93777</p>
                <p><strong>Emergency Ambulance:</strong> +91 98765 00999</p>
                <p><strong>Email:</strong> sales@radhix.com</p>
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
