"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { clinicStore, DEFAULT_DOCTORS, DEFAULT_SERVICES } from "@/lib/store";
import { PaymentMethod } from "@/lib/types";
import { 
  Check, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft,
  CreditCard,
  Building,
  CheckCircle2
} from "lucide-react";

function BookAppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDocId = searchParams.get("doctorId") || "";
  const initialSrvId = searchParams.get("serviceId") || "";

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDocId);
  const [selectedServiceId, setSelectedServiceId] = useState(initialSrvId);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientAge, setPatientAge] = useState<number | "">("");
  const [patientGender, setPatientGender] = useState("Male");
  const [patientNotes, setPatientNotes] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const doctors = DEFAULT_DOCTORS;
  const services = DEFAULT_SERVICES;

  const currentDoctor = useMemo(() => {
    return doctors.find((d) => d.id === selectedDoctorId) || doctors[0];
  }, [selectedDoctorId, doctors]);

  const currentService = useMemo(() => {
    return services.find((s) => s.id === selectedServiceId);
  }, [selectedServiceId, services]);

  const totalAmount = currentService ? currentService.fee : currentDoctor.consultation_fee;

  const availableSlots = useMemo(() => {
    if (!currentDoctor) return [];
    return clinicStore.getAvailableSlots(currentDoctor.id, selectedDate);
  }, [currentDoctor, selectedDate]);

  useEffect(() => {
    if (initialDocId) {
      setSelectedDoctorId(initialDocId);
      setCurrentStep(2);
    }
  }, [initialDocId]);

  const handleNext = () => {
    setBookingError("");
    if (currentStep === 1) {
      if (!selectedDoctorId) {
        setBookingError("Please select a doctor to proceed.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedSlot) {
        setBookingError("Please pick an available time slot.");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!patientName.trim()) {
        setBookingError("Please enter the patient's full name.");
        return;
      }
      if (!patientPhone.trim() || patientPhone.trim().length < 10) {
        setBookingError("Please provide a valid 10-digit mobile number.");
        return;
      }
      setCurrentStep(4);
    }
  };

  const handleConfirmBooking = () => {
    setBookingError("");
    setIsProcessing(true);

    setTimeout(() => {
      const res = clinicStore.bookAppointment({
        doctorId: currentDoctor.id,
        serviceId: currentService?.id,
        appointmentDate: selectedDate,
        timeSlot: selectedSlot,
        patientName,
        patientPhone,
        patientEmail,
        patientAge: Number(patientAge) || undefined,
        patientGender,
        paymentMethod,
        patientNotes,
      });

      if (!res.success || !res.appointment) {
        setBookingError(res.error || "Booking failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      router.push("/booking-confirmation?id=" + res.appointment.booking_id);
    }, 600);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 py-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Book Your Consultation
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Live schedule sync • Instant WhatsApp confirmation • Zero double bookings
            </p>
          </div>

          {/* Stepper Header */}
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[
                { num: 1, label: "Specialist" },
                { num: 2, label: "Slot & Date" },
                { num: 3, label: "Patient" },
                { num: 4, label: "Payment" },
              ].map((step, idx) => (
                <div key={idx} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
                        currentStep === step.num
                          ? "bg-blue-700 text-white shadow-lg shadow-blue-700/30 ring-4 ring-blue-600/20"
                          : currentStep > step.num
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                      }`}
                    >
                      {currentStep > step.num ? <Check className="w-5 h-5" /> : step.num}
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-1.5 hidden sm:block">
                      {step.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div
                      className={`flex-1 h-1 mx-3 rounded-full transition-all ${
                        currentStep > step.num ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {bookingError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-700 dark:text-rose-400 text-sm font-semibold">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{bookingError}</span>
            </div>
          )}

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl">
            
            {/* STEP 1: CHOOSE DOCTOR */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Step 1: Select Your Doctor</h3>
                  <p className="text-xs text-slate-500">Choose from verified specialists.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {doctors.map((doc) => {
                    const isSelected = selectedDoctorId === doc.id;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-600/30"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                        }`}
                      >
                        <img
                          src={doc.avatar_url}
                          alt={doc.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <span className="text-[10px] uppercase font-bold text-teal-600">{doc.specialty}</span>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{doc.name}</h4>
                          <p className="text-xs text-slate-500">{doc.experience_years} Yrs • ★ {doc.rating}</p>
                          <p className="text-sm font-extrabold text-blue-700 dark:text-blue-400 mt-1">₹{doc.consultation_fee}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: PICK DATE & TIME SLOT */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentDoctor.avatar_url}
                      alt={currentDoctor.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{currentDoctor.name}</h4>
                      <p className="text-xs text-slate-500">{currentDoctor.specialty} • ₹{currentDoctor.consultation_fee}</p>
                    </div>
                  </div>
                  <button onClick={() => setCurrentStep(1)} className="text-xs font-bold text-blue-600 hover:underline">
                    Change Doctor
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Select Appointment Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedSlot("");
                    }}
                    className="h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full sm:w-72"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      Available Time Slots
                    </span>
                    <span className="text-xs text-teal-600 font-semibold">● Real-Time Availability</span>
                  </div>

                  {availableSlots.length === 0 ? (
                    <div className="p-6 text-center rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                      No consultation hours on this day. Please select another date.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {availableSlots.map(({ slot, available }) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            disabled={!available}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                              !available
                                ? "bg-slate-100 dark:bg-slate-800/40 text-slate-400 line-through cursor-not-allowed"
                                : isSelected
                                ? "bg-blue-700 text-white shadow-md ring-2 ring-blue-600/40 scale-[1.02]"
                                : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-600"
                            }`}
                          >
                            {slot}
                            {!available && <span className="block text-[9px] font-normal">Booked</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: PATIENT DETAILS */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Step 3: Patient Information</h3>
                  <p className="text-xs text-slate-500">We will send booking confirmations to this WhatsApp number.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="10 digit number e.g. 9876543210"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="e.g. ramesh@gmail.com"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Age</label>
                      <input
                        type="number"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value ? Number(e.target.value) : "")}
                        placeholder="e.g. 35"
                        className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Gender</label>
                      <select
                        value={patientGender}
                        onChange={(e) => setPatientGender(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Reason for visit or symptoms (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    placeholder="Briefly describe your symptoms or reason for visit..."
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: PAYMENT SELECTION */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Step 4: Review & Payment Method</h3>
                  <p className="text-xs text-slate-500">Choose between online checkout or pay upon arrival.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Doctor:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{currentDoctor.name} ({currentDoctor.specialty})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date & Slot:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{selectedDate} at {selectedSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Patient:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{patientName} ({patientPhone})</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm">
                    <span className="font-bold text-slate-800 dark:text-slate-200">Total Consultation Fee:</span>
                    <span className="text-lg font-extrabold text-blue-700 dark:text-teal-400">₹{totalAmount}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setPaymentMethod("online")}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      paymentMethod === "online"
                        ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-600/30"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Instant Confirm
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Pay Online (Razorpay)</h4>
                    <p className="text-xs text-slate-500">UPI (GPay, PhonePe, Paytm), Cards, Netbanking.</p>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("pay_at_clinic")}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      paymentMethod === "pay_at_clinic"
                        ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-600/30"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                        <Building className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                        Pay on Arrival
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Pay at Clinic</h4>
                    <p className="text-xs text-slate-500">Pay cash or card directly at reception when you arrive.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-md shadow-blue-700/25 flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleConfirmBooking}
                  className="px-8 py-3.5 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 shadow-lg shadow-blue-700/25 flex items-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Securing Slot...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Book Appointment (₹{totalAmount})</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


export default function BookAppointmentPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-500">Loading booking flow...</div>}>
      <BookAppointmentContent />
    </React.Suspense>
  );
}
