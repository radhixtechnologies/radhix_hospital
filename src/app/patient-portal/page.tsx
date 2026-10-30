"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { clinicStore, DEFAULT_DOCTORS } from "@/lib/store";
import { Doctor, HospitalBed, PaymentMethod, Appointment } from "@/lib/types";
import confetti from "canvas-confetti";
import QRCode from "qrcode";
import { 
  Activity, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CreditCard, 
  Building, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Bed, 
  Search, 
  Check, 
  AlertCircle, 
  Printer, 
  ArrowRight, 
  Zap, 
  Stethoscope, 
  HeartPulse, 
  Share2, 
  CalendarDays,
  FileText,
  BadgeCheck,
  RefreshCw
} from "lucide-react";

export default function PatientPortalPage() {
  const [activeMode, setActiveMode] = useState<"doctor" | "bed" | "track">("doctor");

  // Step state for Doctor Booking
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);

  // Doctors and departments
  const doctors = useMemo(() => clinicStore.getDoctors(), []);
  const specialties = useMemo(() => {
    const list = Array.from(new Set(doctors.map((d) => d.specialty)));
    return ["All Specialties", ...list];
  }, [doctors]);

  // Selected Booking Form State
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  // Patient inputs
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState<number | "">(32);
  const [patientGender, setPatientGender] = useState("Male");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");

  // Booking states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [bookingError, setBookingError] = useState("");

  // Bed Request Form State
  const [bedsList, setBedsList] = useState<HospitalBed[]>(() => clinicStore.getBeds());
  const [selectedWardForBed, setSelectedWardForBed] = useState<string>("ICU");
  const [bedPatientName, setBedPatientName] = useState("");
  const [bedPatientAge, setBedPatientAge] = useState<number | "">(45);
  const [bedPatientGender, setBedPatientGender] = useState("Male");
  const [bedPatientPhone, setBedPatientPhone] = useState("");
  const [bedDiagnosis, setBedDiagnosis] = useState("");
  const [bedDoctorAssigned, setBedDoctorAssigned] = useState("Dr. Rajesh Sharma");
  const [bedSuccessMessage, setBedSuccessMessage] = useState("");

  // Tracking State
  const [trackQuery, setTrackQuery] = useState("");
  const [trackedAppointment, setTrackedAppointment] = useState<Appointment | null>(null);
  const [trackSearched, setTrackSearched] = useState(false);

  // Synchronize with storage updates
  useEffect(() => {
    const handleSync = () => {
      setBedsList(clinicStore.getBeds());
      if (trackedAppointment) {
        const updated = clinicStore.getAppointmentByBookingId(trackedAppointment.booking_id);
        if (updated) setTrackedAppointment(updated);
      }
    };
    window.addEventListener("storage", handleSync);
    window.addEventListener("hospital_store_updated", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("hospital_store_updated", handleSync);
    };
  }, [trackedAppointment]);

  // Selected doctor object
  const currentDoctor = useMemo(() => {
    return doctors.find((d) => d.id === selectedDoctorId) || doctors[0];
  }, [selectedDoctorId, doctors]);

  // Available slots for selected date & doctor
  const availableSlots = useMemo(() => {
    if (!currentDoctor) return [];
    return clinicStore.getAvailableSlots(currentDoctor.id, selectedDate);
  }, [currentDoctor, selectedDate]);

  // Filtered doctors
  const filteredDoctors = useMemo(() => {
    if (selectedSpecialty === "All Specialties") return doctors;
    return doctors.filter((d) => d.specialty === selectedSpecialty);
  }, [doctors, selectedSpecialty]);

  // Available beds count for bed reservation
  const availableBeds = useMemo(() => {
    return bedsList.filter((b) => b.status === "Available");
  }, [bedsList]);

  // Date strip generator (next 7 days)
  const nextDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split("T")[0];
      const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short" });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString("en-IN", { month: "short" });
      dates.push({ iso, dayName, dayNum, monthName });
    }
    return dates;
  }, []);

  // Set default slot if available
  useEffect(() => {
    if (availableSlots.length > 0) {
      const firstAvailable = availableSlots.find((s) => s.available);
      if (firstAvailable) {
        setSelectedSlot(firstAvailable.slot);
      }
    }
  }, [availableSlots]);

  // Handle Confetti on Success
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#1E40AF", "#14B8A6", "#10B981", "#3B82F6", "#F59E0B"],
      });
    } catch (e) {}
  };

  // Submit doctor appointment booking
  const handleConfirmDoctorBooking = () => {
    setBookingError("");
    if (!patientName.trim()) {
      setBookingError("Please enter patient full name.");
      setBookingStep(3);
      return;
    }
    if (!patientPhone.trim() || patientPhone.trim().length < 10) {
      setBookingError("Please enter a valid 10-digit mobile number.");
      setBookingStep(3);
      return;
    }
    if (!selectedSlot) {
      setBookingError("Please select a time slot.");
      setBookingStep(2);
      return;
    }

    setIsSubmitting(true);

    setTimeout(async () => {
      const res = clinicStore.bookAppointment({
        doctorId: currentDoctor.id,
        appointmentDate: selectedDate,
        timeSlot: selectedSlot,
        patientName,
        patientPhone,
        patientEmail,
        patientAge: Number(patientAge) || undefined,
        patientGender,
        paymentMethod,
        patientNotes: symptoms,
      });

      if (!res.success || !res.appointment) {
        setBookingError(res.error || "Failed to book slot. It might be already taken.");
        setIsSubmitting(false);
        return;
      }

      setConfirmedBooking(res.appointment);

      // Generate QR Code
      try {
        const qrUrl = await QRCode.toDataURL(
          `RADHIX-HOSPITAL|ID:${res.appointment.booking_id}|PATIENT:${res.appointment.patient_name}|DOCTOR:${res.appointment.doctor_name}|DATE:${res.appointment.appointment_date}|SLOT:${res.appointment.time_slot}`,
          { width: 220, margin: 1 }
        );
        setQrCodeDataUrl(qrUrl);
      } catch (e) {}

      setIsSubmitting(false);
      setBookingStep(4);
      triggerConfetti();
    }, 700);
  };

  // Submit bed reservation
  const handleReserveBed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bedPatientName.trim() || !bedPatientPhone.trim()) {
      alert("Please fill in patient name and phone number");
      return;
    }

    // Find first available bed in selected ward or any available bed
    const candidateBed =
      availableBeds.find((b) => b.ward === selectedWardForBed) || availableBeds[0];

    if (!candidateBed) {
      alert("No vacant beds are currently available. Please call our 24x7 Emergency line.");
      return;
    }

    clinicStore.admitPatientToBed(candidateBed.id, {
      patientName: bedPatientName,
      patientAge: Number(bedPatientAge) || 40,
      patientGender: bedPatientGender,
      patientPhone: bedPatientPhone,
      diagnosis: bedDiagnosis || "Emergency Admission Request",
      doctorAssigned: bedDoctorAssigned,
    });

    setBedsList(clinicStore.getBeds());
    setBedSuccessMessage(
      `✓ Bed ${candidateBed.bedNumber} (${candidateBed.ward}) has been reserved for ${bedPatientName}! The nursing station has been notified.`
    );
    triggerConfetti();

    // Reset form
    setBedPatientName("");
    setBedPatientPhone("");
    setBedDiagnosis("");
  };

  // Handle tracking query
  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackSearched(true);
    if (!trackQuery.trim()) {
      setTrackedAppointment(null);
      return;
    }

    const apt = clinicStore.getAppointmentByBookingId(trackQuery.trim());
    if (apt) {
      setTrackedAppointment(apt);
    } else {
      const matches = clinicStore.getPatientAppointments(trackQuery.trim());
      if (matches.length > 0) {
        setTrackedAppointment(matches[0]);
      } else {
        setTrackedAppointment(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-teal-500 selection:text-white">
      
      {/* ===================================================================== */}
      {/* 1. TOP LIVE SYNC NOTIFICATION BANNER */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-600 text-white text-xs font-semibold py-2.5 px-4 shadow-sm flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>
              <strong>Radhix Hospital Patient Portal</strong>: All appointments booked here sync live to the Hospital Admin console.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              target="_blank"
              className="underline hover:text-teal-200 transition-colors flex items-center gap-1 font-bold"
            >
              <span>View in Admin Dashboard ↗</span>
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/admin/appointments"
              target="_blank"
              className="underline hover:text-teal-200 transition-colors flex items-center gap-1 font-bold"
            >
              <span>Admin Queue ↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. MAIN NAVBAR */}
      {/* ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Hospital Logo */}
          <Link href="/patient-portal" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-blue-700/25">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white block">
                Radhix<span className="text-teal-600">Hospital</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block -mt-1">
                Patient Appointment & Admission OS
              </span>
            </div>
          </Link>

          {/* Mode Navigation Buttons */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveMode("doctor")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeMode === "doctor"
                  ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Book Doctor OPD</span>
            </button>

            <button
              onClick={() => setActiveMode("bed")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeMode === "bed"
                  ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Bed className="w-4 h-4" />
              <span>Emergency Bed Admission</span>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-black">
                {availableBeds.length} Khali
              </span>
            </button>

            <button
              onClick={() => setActiveMode("track")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeMode === "track"
                  ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Track Token / Status</span>
            </button>
          </div>

          {/* 24x7 Helpline */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Emergency 24x7 SOS</span>
              <a href="tel:+917042793777" className="text-xs font-black text-rose-600 dark:text-rose-400 hover:underline">
                +91 70427 93777
              </a>
            </div>

            <Link
              href="/admin/login"
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
            >
              Hospital Staff ↗
            </Link>
          </div>

        </div>
      </header>

      {/* ===================================================================== */}
      {/* 3. HERO SECTION */}
      {/* ===================================================================== */}
      <section className="relative overflow-hidden pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Official Patient Online OPD & Inpatient Reservation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Book Verified Doctors & Beds in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-500">60 Seconds</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Real-time doctor calendar slot locking, instant digital QR pass for direct OPD entry, transparent fees, and emergency bed requests.
          </p>

          {/* Mobile mode tabs */}
          <div className="flex md:hidden items-center justify-center gap-1.5 pt-2">
            <button
              onClick={() => setActiveMode("doctor")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                activeMode === "doctor" ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              Doctor OPD
            </button>
            <button
              onClick={() => setActiveMode("bed")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                activeMode === "bed" ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              Bed Admission
            </button>
            <button
              onClick={() => setActiveMode("track")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                activeMode === "track" ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              Track Token
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. MAIN CONTENT AREA */}
      {/* ===================================================================== */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* ===================================================================== */}
        {/* MODE 1: DOCTOR OPD APPOINTMENT BOOKING (ANIMATED 4-STEP FLOW) */}
        {/* ===================================================================== */}
        {activeMode === "doctor" && (
          <div className="space-y-6">
            
            {/* Stepper Progress Bar */}
            {bookingStep < 4 && (
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className={`p-2.5 rounded-2xl border transition-all ${
                    bookingStep >= 1 ? "bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 text-slate-400"
                  }`}>
                    <span className="block text-[10px] font-black uppercase">Step 1</span>
                    <span>Doctor & Specialty</span>
                  </div>

                  <div className={`p-2.5 rounded-2xl border transition-all ${
                    bookingStep >= 2 ? "bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 text-slate-400"
                  }`}>
                    <span className="block text-[10px] font-black uppercase">Step 2</span>
                    <span>Date & Time Slot</span>
                  </div>

                  <div className={`p-2.5 rounded-2xl border transition-all ${
                    bookingStep >= 3 ? "bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 font-bold" : "border-slate-200 text-slate-400"
                  }`}>
                    <span className="block text-[10px] font-black uppercase">Step 3</span>
                    <span>Patient Details & Pay</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {bookingError && (
              <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{bookingError}</span>
              </div>
            )}

            {/* STEP 1: SELECT SPECIALTY & DOCTOR */}
            {bookingStep === 1 && (
              <div className="space-y-6">
                
                {/* Specialty filter pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
                  {specialties.map((spec) => (
                    <button
                      key={spec}
                      onClick={() => setSelectedSpecialty(spec)}
                      className={`px-4 py-2 rounded-2xl font-bold whitespace-nowrap transition-all ${
                        selectedSpecialty === spec
                          ? "bg-blue-700 text-white shadow-md shadow-blue-700/25"
                          : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDoctors.map((doc) => {
                    const isSelected = selectedDoctorId === doc.id;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                          isSelected
                            ? "bg-white dark:bg-slate-900 border-blue-600 dark:border-blue-500 ring-2 ring-blue-600/20 shadow-xl"
                            : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <img
                              src={doc.avatar_url}
                              alt={doc.name}
                              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                                  {doc.name}
                                </h3>
                                <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                              </div>
                              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 block">
                                {doc.specialty}
                              </span>
                              <span className="text-[10px] text-slate-400 block">
                                {doc.qualification}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-500 line-clamp-2">
                            {doc.bio}
                          </p>

                          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                            <div>
                              <span className="text-slate-400 text-[10px] block">Experience</span>
                              <span className="font-bold text-slate-700 dark:text-slate-300">
                                {doc.experience_years}+ Years
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-slate-400 text-[10px] block">Consultation Fee</span>
                              <span className="font-black text-sm text-blue-700 dark:text-blue-300">
                                ₹{doc.consultation_fee}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDoctorId(doc.id);
                            setBookingStep(2);
                          }}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                            isSelected
                              ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                              : "bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-200"
                          }`}
                        >
                          <span>Select Doctor & Slots</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setBookingStep(2)}
                    className="px-6 py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-black text-xs shadow-lg shadow-blue-700/25 flex items-center gap-2"
                  >
                    <span>Proceed to Slot Selection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SELECT DATE & TIME SLOT */}
            {bookingStep === 2 && (
              <div className="max-w-3xl mx-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
                
                {/* Doctor Summary Pill */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentDoctor.avatar_url}
                      alt={currentDoctor.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{currentDoctor.name}</span>
                      <span className="text-[11px] text-blue-700 dark:text-blue-300 font-semibold">{currentDoctor.specialty} • Fee: ₹{currentDoctor.consultation_fee}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setBookingStep(1)}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Change Doctor
                  </button>
                </div>

                {/* Date Selector Strip */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Choose Appointment Date:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                    {nextDates.map((item) => {
                      const isSelected = selectedDate === item.iso;
                      return (
                        <button
                          key={item.iso}
                          onClick={() => setSelectedDate(item.iso)}
                          className={`p-3 rounded-2xl border text-center transition-all ${
                            isSelected
                              ? "bg-blue-700 text-white border-blue-700 shadow-md shadow-blue-700/25"
                              : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          <span className="text-[10px] font-bold block uppercase">{item.dayName}</span>
                          <span className="text-lg font-black block">{item.dayNum}</span>
                          <span className="text-[10px] block opacity-80">{item.monthName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots Matrix */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Available Consultation Slots ({selectedDate}):
                    </label>
                    <span className="text-[11px] text-teal-600 font-bold">
                      {availableSlots.filter((s) => s.available).length} slots available
                    </span>
                  </div>

                  {availableSlots.length === 0 ? (
                    <div className="p-6 text-center rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs text-amber-800 dark:text-amber-300">
                      Doctor is not holding OPD on this day. Please pick another date.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                      {availableSlots.map((item) => {
                        const isSelected = selectedSlot === item.slot;
                        return (
                          <button
                            key={item.slot}
                            disabled={!item.available}
                            onClick={() => setSelectedSlot(item.slot)}
                            className={`p-3 rounded-xl font-bold border transition-all flex items-center justify-between ${
                              !item.available
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 border-transparent cursor-not-allowed line-through"
                                : isSelected
                                ? "bg-blue-700 text-white border-blue-700 shadow-md shadow-blue-700/20"
                                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-500"
                            }`}
                          >
                            <span>{item.slot}</span>
                            {item.available && (
                              <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-white" : "bg-emerald-500"}`} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Back / Next controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setBookingStep(1)}
                    className="px-4 py-2.5 rounded-xl border text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Back to Doctors
                  </button>
                  <button
                    disabled={!selectedSlot}
                    onClick={() => setBookingStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-blue-700/25 flex items-center gap-1.5"
                  >
                    <span>Proceed to Patient Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: PATIENT INFORMATION & PAYMENT METHOD */}
            {bookingStep === 3 && (
              <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
                
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h2 className="text-base font-black text-slate-900 dark:text-white">
                      Patient Details & Medical Reason
                    </h2>
                    <p className="text-xs text-slate-400">Information for hospital electronic medical record (EMR)</p>
                  </div>
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-xl">
                    Fee: ₹{currentDoctor.consultation_fee}
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra / Priya Sharma"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Age (Years) *
                      </label>
                      <input
                        type="number"
                        value={patientAge}
                        onChange={(e) => setPatientAge(Number(e.target.value))}
                        className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Gender *
                      </label>
                      <select
                        value={patientGender}
                        onChange={(e) => setPatientGender(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none font-medium"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Mobile Phone (WhatsApp Confirmation) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98XXX XXXXX"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="patient@gmail.com"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Reason for Consultation / Current Symptoms
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Chest pain for 2 days, high blood pressure, routine cardiac checkup"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none resize-none"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-2">
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      Select Payment Mode:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setPaymentMethod("online")}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          paymentMethod === "online"
                            ? "bg-blue-50 dark:bg-blue-950/40 border-blue-600 ring-2 ring-blue-600/20"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span className="font-black text-slate-900 dark:text-white">Pay Online (UPI / Card)</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Instant VIP confirmed pass. No payment queue at the counter.
                        </p>
                      </div>

                      <div
                        onClick={() => setPaymentMethod("pay_at_clinic")}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          paymentMethod === "pay_at_clinic"
                            ? "bg-blue-50 dark:bg-blue-950/40 border-blue-600 ring-2 ring-blue-600/20"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Building className="w-4 h-4 text-teal-600" />
                          <span className="font-black text-slate-900 dark:text-white">Pay at Hospital Desk</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Pay cash or UPI upon arrival at the OPD reception.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Final Confirmation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setBookingStep(2)}
                    className="px-4 py-2.5 rounded-xl border text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Back to Slots
                  </button>
                  <button
                    disabled={isSubmitting}
                    onClick={handleConfirmDoctorBooking}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Locking Slot & Syncing Admin...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Confirm Appointment & Generate Pass</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}

            {/* STEP 4: INSTANT DIGITAL HOSPITAL APPOINTMENT PASS */}
            {bookingStep === 4 && confirmedBooking && (
              <div className="max-w-2xl mx-auto space-y-6">
                
                {/* Success Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl text-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-white text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">Appointment Confirmed!</h2>
                  <p className="text-xs text-emerald-100 max-w-md mx-auto">
                    Your appointment has been registered and synced directly into the Hospital Operations Admin queue.
                  </p>
                </div>

                {/* Printable Digital OPD Pass */}
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-xl space-y-5 text-slate-900 dark:text-slate-100">
                  
                  {/* Pass Header */}
                  <div className="flex items-start justify-between border-b pb-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 uppercase block">
                        DIGITAL OPD CHECK-IN PASS
                      </span>
                      <h3 className="text-lg font-black tracking-tight">
                        RADHIX SUPER-SPECIALITY HOSPITAL
                      </h3>
                      <span className="text-xs text-slate-500">
                        OPD Token Number: <strong className="text-blue-700 dark:text-blue-400">#TOKEN-18</strong>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Booking Reference</span>
                      <span className="font-mono font-black text-base text-blue-700 dark:text-blue-400">
                        {confirmedBooking.booking_id}
                      </span>
                    </div>
                  </div>

                  {/* QR & Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    
                    {/* QR Code */}
                    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border text-center space-y-1">
                      {qrCodeDataUrl ? (
                        <img src={qrCodeDataUrl} alt="Booking QR" className="w-36 h-36 rounded-lg" />
                      ) : (
                        <div className="w-36 h-36 bg-slate-200 rounded-lg animate-pulse" />
                      )}
                      <span className="text-[10px] text-slate-400">Scan at Reception Desk</span>
                    </div>

                    {/* Patient & Doctor Details */}
                    <div className="sm:col-span-2 space-y-2 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Consulting Doctor</span>
                        <span className="font-extrabold text-sm block">{confirmedBooking.doctor_name}</span>
                        <span className="text-teal-600 dark:text-teal-400 font-bold block">{confirmedBooking.doctor_specialty}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                          <span className="text-[10px] text-slate-400 block">Date</span>
                          <span className="font-bold">{confirmedBooking.appointment_date}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                          <span className="text-[10px] text-slate-400 block">Time Slot</span>
                          <span className="font-bold text-blue-700 dark:text-blue-300">{confirmedBooking.time_slot}</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400 block">Patient Name</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {confirmedBooking.patient_name} ({confirmedBooking.patient_phone})
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <button
                      onClick={() => window.print()}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Pass / PDF</span>
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Link
                        href="/admin/appointments"
                        target="_blank"
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
                      >
                        <span>Check In Admin Queue ↗</span>
                      </Link>

                      <button
                        onClick={() => {
                          setConfirmedBooking(null);
                          setBookingStep(1);
                        }}
                        className="px-4 py-2.5 rounded-xl border font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        Book Another
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* ===================================================================== */}
        {/* MODE 2: EMERGENCY BED ADMISSION REQUEST */}
        {/* ===================================================================== */}
        {activeMode === "bed" && (
          <div className="max-w-2xl mx-auto space-y-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                    <Bed className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900 dark:text-white">
                      Hospital Inpatient Bed Reservation
                    </h2>
                    <span className="text-xs text-slate-400">Direct admission hold for ICU, Emergency & General Ward</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  {availableBeds.length} Beds Khali
                </span>
              </div>

              {bedSuccessMessage && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
                  <span>{bedSuccessMessage}</span>
                  <Link
                    href="/admin/inventory"
                    target="_blank"
                    className="font-bold underline ml-2 shrink-0"
                  >
                    View in Bed Matrix ↗
                  </Link>
                </div>
              )}

              <form onSubmit={handleReserveBed} className="space-y-3.5 text-xs">
                
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Select Ward Department *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {["ICU", "Emergency", "General Ward", "Semi-Private", "Maternity"].map((ward) => {
                      const countInWard = availableBeds.filter((b) => b.ward === ward).length;
                      const isSelected = selectedWardForBed === ward;
                      return (
                        <button
                          type="button"
                          key={ward}
                          onClick={() => setSelectedWardForBed(ward)}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "bg-rose-50 dark:bg-rose-950/40 border-rose-600 text-rose-800 dark:text-rose-200 font-bold ring-2 ring-rose-600/20"
                              : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          <span className="font-bold block">{ward}</span>
                          <span className="text-[10px] text-emerald-600 font-semibold block">{countInWard} Khali Beds</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suman Devi"
                    value={bedPatientName}
                    onChange={(e) => setBedPatientName(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Age *</label>
                    <input
                      type="number"
                      required
                      value={bedPatientAge}
                      onChange={(e) => setBedPatientAge(Number(e.target.value))}
                      className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Gender *</label>
                    <select
                      value={bedPatientGender}
                      onChange={(e) => setBedPatientGender(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Attendant / Emergency Contact Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={bedPatientPhone}
                    onChange={(e) => setBedPatientPhone(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Clinical Reason / Emergency Diagnosis *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Severe breathing difficulty / Post-fall observation"
                    value={bedDiagnosis}
                    onChange={(e) => setBedDiagnosis(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Preferred Attending Specialist
                  </label>
                  <select
                    value={bedDoctorAssigned}
                    onChange={(e) => setBedDoctorAssigned(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border outline-none font-bold"
                  >
                    <option value="Dr. Rajesh Sharma">Dr. Rajesh Sharma (Cardiology & ICU)</option>
                    <option value="Dr. Amit Verma">Dr. Amit Verma (Orthopedics & Trauma)</option>
                    <option value="Dr. Vikram Sen">Dr. Vikram Sen (Neurology & Stroke)</option>
                    <option value="Dr. Priya Patel">Dr. Priya Patel (General Consultant)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Bed className="w-4 h-4" />
                  <span>Submit Bed Admission Request (Hold Bed)</span>
                </button>

              </form>
            </div>

          </div>
        )}

        {/* ===================================================================== */}
        {/* MODE 3: TRACK BOOKING & LIVE TOKEN STATUS */}
        {/* ===================================================================== */}
        {activeMode === "track" && (
          <div className="max-w-xl mx-auto space-y-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div>
                <h2 className="text-base font-black text-slate-900 dark:text-white">
                  Track Your Appointment & OPD Queue
                </h2>
                <p className="text-xs text-slate-400">
                  Enter your Booking Reference (e.g., RDX-2026-001) or 10-digit mobile number
                </p>
              </div>

              <form onSubmit={handleTrackSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Booking ID or Phone Number..."
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  className="flex-1 h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs outline-none font-bold"
                />
                <button
                  type="submit"
                  className="px-5 h-11 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shrink-0 transition-colors cursor-pointer"
                >
                  Track Now
                </button>
              </form>
            </div>

            {/* Track Results */}
            {trackedAppointment && (
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Booking Reference</span>
                    <span className="font-mono font-black text-blue-700 dark:text-blue-400 text-sm">
                      {trackedAppointment.booking_id}
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[10px] ${
                    trackedAppointment.status === "confirmed"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : trackedAppointment.status === "pending"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-slate-100 text-slate-800"
                  }`}>
                    Status: {trackedAppointment.status}
                  </span>
                </div>

                {/* Progress Steps */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">Slot Registered</span>
                      <span className="text-[11px] text-slate-400">Appointment scheduled on {trackedAppointment.appointment_date} at {trackedAppointment.time_slot}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      trackedAppointment.status === "confirmed" ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"
                    }`}>
                      {trackedAppointment.status === "confirmed" ? "✓" : "●"}
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">Doctor Verified & Assigned</span>
                      <span className="text-[11px] text-slate-400">{trackedAppointment.doctor_name} ({trackedAppointment.doctor_specialty})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">Hospital Check-in & Consultation</span>
                      <span className="text-[11px] text-slate-400">Please report 10 minutes before your slot time at OPD Desk</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-1 mt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Patient:</span>
                    <span className="font-bold">{trackedAppointment.patient_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment Status:</span>
                    <span className="font-bold uppercase text-emerald-600">{trackedAppointment.payment_status}</span>
                  </div>
                </div>

              </div>
            )}

            {trackSearched && !trackedAppointment && (
              <div className="p-6 text-center rounded-3xl bg-white dark:bg-slate-900 border text-xs text-slate-500">
                No active booking found matching "{trackQuery}". Please double check your booking reference or phone number.
              </div>
            )}

          </div>
        )}

      </main>

      {/* ===================================================================== */}
      {/* 5. FOOTER */}
      {/* ===================================================================== */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Radhix Super-Speciality Hospital & Research Center. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="hover:text-blue-600 font-bold">
              Admin Portal
            </Link>
            <Link href="/" className="hover:text-blue-600 font-bold">
              Public Homepage
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

