"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { clinicStore } from "@/lib/store";
import { Appointment } from "@/lib/types";
import { getStatusBadgeClass, formatDate } from "@/lib/utils";
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RefreshCw,
  ArrowRight
} from "lucide-react";

import { Suspense } from "react";

function MyAppointmentsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Reschedule modal state
  const [rescheduleApt, setRescheduleApt] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [newSlot, setNewSlot] = useState("");
  const [rescheduleMessage, setRescheduleMessage] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    const results = clinicStore.getPatientAppointments(query);
    setAppointments(results);
    setHasSearched(true);
  };

  useEffect(() => {
    if (initialQuery) {
      const results = clinicStore.getPatientAppointments(initialQuery);
      setAppointments(results);
      setHasSearched(true);
    }
  }, [initialQuery]);

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      clinicStore.cancelAppointment(id, "Cancelled by patient via portal");
      handleSearch();
    }
  };

  const handleSaveReschedule = () => {
    if (!rescheduleApt || !newSlot) {
      setRescheduleMessage("Please pick an available time slot.");
      return;
    }

    const res = clinicStore.rescheduleAppointment(rescheduleApt.id, newDate, newSlot);
    if (!res.success) {
      setRescheduleMessage(res.error || "Failed to reschedule.");
      return;
    }

    setRescheduleApt(null);
    setRescheduleMessage("");
    handleSearch();
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              My Appointments
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Lookup your bookings by entering your 10-digit mobile number or Booking ID (e.g. RDX-2026-001)
            </p>
          </div>

          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            className="p-3 sm:p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md mb-8 flex gap-3 items-center"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Mobile Number (9876500001) or Booking ID (RDX-2026-001)"
                className="w-full h-12 pl-10 pr-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="h-12 px-6 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-700/25 transition-all flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Results Area */}
          {hasSearched && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Found {appointments.length} Appointment(s)
                </span>
                <span className="text-xs text-slate-500">Query: {query}</span>
              </div>

              {appointments.length === 0 ? (
                <div className="p-8 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <p className="font-bold text-slate-700 dark:text-slate-300">No appointments found matching that number or ID.</p>
                  <p className="text-xs text-slate-500">Please make sure you entered the 10-digit phone number used during booking.</p>
                  <Link href="/book" className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs">
                    Book a New Appointment
                  </Link>
                </div>
              ) : (
                appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Booking Reference</span>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">{apt.booking_id}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeClass(apt.status)}`}>
                          {apt.status.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeClass(apt.payment_status)}`}>
                          {apt.payment_status === "paid" ? "PAID" : "PAY AT CLINIC"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">Doctor</span>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{apt.doctor_name}</span>
                        <span className="text-teal-600 font-semibold block">{apt.doctor_specialty}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Date & Slot</span>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{apt.appointment_date}</span>
                        <span className="text-slate-500 font-semibold block">{apt.time_slot}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Patient</span>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{apt.patient_name}</span>
                        <span className="text-slate-500 block">{apt.patient_phone}</span>
                      </div>
                    </div>

                    {apt.status !== "cancelled" && apt.status !== "completed" && (
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setRescheduleApt(apt);
                            setNewDate(apt.appointment_date);
                            setNewSlot("");
                            setRescheduleMessage("");
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-blue-700 dark:text-teal-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 transition-colors"
                        >
                          Reschedule Slot
                        </button>
                        <button
                          onClick={() => handleCancel(apt.id)}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 transition-colors"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Reschedule Modal */}
          {rescheduleApt && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Reschedule Appointment</h3>
                  <button onClick={() => setRescheduleApt(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>

                <div className="text-xs space-y-1">
                  <p><strong>Booking:</strong> {rescheduleApt.booking_id} with {rescheduleApt.doctor_name}</p>
                </div>

                {rescheduleMessage && (
                  <p className="text-xs font-bold text-rose-600">{rescheduleMessage}</p>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Pick New Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={newDate}
                    onChange={(e) => {
                      setNewDate(e.target.value);
                      setNewSlot("");
                    }}
                    className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2">Available Slots on {newDate}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {clinicStore.getAvailableSlots(rescheduleApt.doctor_id, newDate).map(({ slot, available }) => (
                      <button
                        key={slot}
                        disabled={!available}
                        onClick={() => setNewSlot(slot)}
                        className={`py-2 text-xs font-bold rounded-lg ${
                          !available
                            ? "bg-slate-100 text-slate-400 line-through"
                            : newSlot === slot
                            ? "bg-blue-700 text-white"
                            : "bg-slate-50 dark:bg-slate-800 border hover:border-blue-600"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t flex justify-end gap-2">
                  <button
                    onClick={() => setRescheduleApt(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveReschedule}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800"
                  >
                    Save New Slot
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}


export default function MyAppointmentsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-500">Loading your appointments...</div>}>
      <MyAppointmentsContent />
    </Suspense>
  );
}
