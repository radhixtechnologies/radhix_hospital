const fs = require("fs");

const confirmationPageCode = `"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { clinicStore } from "@/lib/store";
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Download, 
  ArrowRight,
  QrCode
} from "lucide-react";
import QRCode from "qrcode";
import confetti from "canvas-confetti";

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id") || "";
  const [qrDataUrl, setQrDataUrl] = useState("");

  const appointment = useMemo(() => {
    if (!bookingId) return undefined;
    return clinicStore.getAppointmentByBookingId(bookingId);
  }, [bookingId]);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    if (bookingId) {
      QRCode.toDataURL(
        "https://radhixclinic.com/check-in?id=" + bookingId,
        { width: 200, margin: 1 }
      ).then(setQrDataUrl).catch(() => {});
    }
  }, [bookingId]);

  if (!appointment) {
    return (
      <>
        <Navbar />
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold">Booking Not Found</h2>
          <p className="text-xs text-slate-500 mt-1">Please verify the booking ID or phone number.</p>
          <Link href="/book" className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs">
            Book an Appointment
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const googleCalendarUrl = useMemo(() => {
    const title = encodeURIComponent("Clinic Appointment with " + appointment.doctor_name);
    const details = encodeURIComponent("Booking ID: " + appointment.booking_id + "\\nPatient: " + appointment.patient_name);
    const location = encodeURIComponent("Radhix Super-Speciality Clinic, Indiranagar, Bengaluru");
    return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + title + "&details=" + details + "&location=" + location;
  }, [appointment]);

  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Appointment Confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Your consultation has been secured in the clinic calendar. Confirmation sent to WhatsApp:{" "}
              <strong className="text-slate-800 dark:text-slate-200">{appointment.patient_phone}</strong>.
            </p>
          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-700 to-teal-600 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-blue-100">Official Booking Pass</span>
                <p className="text-2xl font-black">{appointment.booking_id}</p>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold border border-white/30">
                Status: {appointment.status.toUpperCase()}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Consulting Specialist</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{appointment.doctor_name}</h3>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">{appointment.doctor_specialty}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Schedule & Slot</span>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{appointment.appointment_date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <span>{appointment.time_slot}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-8 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Patient:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{appointment.patient_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Contact:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{appointment.patient_phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment Mode:</span>
                    <span className="font-bold uppercase text-slate-900 dark:text-white">
                      {appointment.payment_method === "online" ? "Online (Paid via Razorpay)" : "Pay at Clinic (Pending)"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amount:</span>
                    <span className="font-extrabold text-blue-700 dark:text-teal-400 text-sm">₹{appointment.total_amount}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-[11px] text-slate-500">
                      📍 <strong>Address:</strong> Plot 42, Tech Park Blvd, Indiranagar, Bengaluru.
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                  {qrDataUrl ? (
                    <img src={qrDataUrl} alt="Booking QR" className="w-28 h-28" />
                  ) : (
                    <QrCode className="w-28 h-28 text-slate-400" />
                  )}
                  <span className="text-[10px] font-bold text-slate-500 mt-1">Scan at Reception</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-center text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Add to Google Calendar</span>
                </a>

                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-center text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4 text-teal-600" />
                  <span>Download / Print Receipt</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center space-y-2">
            <p className="text-xs text-slate-500">Need to make adjustments? You can reschedule or cancel anytime.</p>
            <Link
              href={"/my-appointments?query=" + appointment.booking_id}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-teal-400 hover:underline"
            >
              <span>Manage My Appointment in Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
`;

fs.writeFileSync("src/app/booking-confirmation/page.tsx", confirmationPageCode, "utf8");
console.log("Created src/app/booking-confirmation/page.tsx");
