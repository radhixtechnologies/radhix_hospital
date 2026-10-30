const fs = require("fs");

const appointmentsCode = `"use client";

import React, { useState, useMemo } from "react";
import { clinicStore, DEFAULT_DOCTORS } from "@/lib/store";
import { Appointment } from "@/lib/types";
import { getStatusBadgeClass } from "@/lib/utils";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Eye,
  FileSpreadsheet,
  CalendarDays
} from "lucide-react";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => clinicStore.getAppointments());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");

  // Walk-in modal state
  const [walkInOpen, setWalkInOpen] = useState(false);
  const [walkInDocId, setWalkInDocId] = useState(DEFAULT_DOCTORS[0].id);
  const [walkInPatientName, setWalkInPatientName] = useState("");
  const [walkInPatientPhone, setWalkInPatientPhone] = useState("");
  const [walkInSlot, setWalkInSlot] = useState("11:30 AM");
  const [walkInError, setWalkInError] = useState("");

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchSearch = searchQuery
        ? apt.booking_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          apt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          apt.patient_phone.includes(searchQuery)
        : true;
      const matchStatus = statusFilter === "all" ? true : apt.status === statusFilter;
      const matchDoctor = doctorFilter === "all" ? true : apt.doctor_id === doctorFilter;
      return matchSearch && matchStatus && matchDoctor;
    });
  }, [appointments, searchQuery, statusFilter, doctorFilter]);

  const handleUpdate = (id: string, status: any, paymentStatus?: any) => {
    clinicStore.updateAppointmentStatus(id, status, paymentStatus);
    setAppointments(clinicStore.getAppointments());
  };

  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInPatientName.trim() || !walkInPatientPhone.trim()) {
      setWalkInError("Please enter patient name and contact number.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const res = clinicStore.bookAppointment({
      doctorId: walkInDocId,
      appointmentDate: today,
      timeSlot: walkInSlot,
      patientName: walkInPatientName,
      patientPhone: walkInPatientPhone,
      paymentMethod: "pay_at_clinic",
      patientNotes: "Walk-in registration at clinic counter",
    });

    if (!res.success) {
      setWalkInError(res.error || "Slot already booked.");
      return;
    }

    setWalkInOpen(false);
    setWalkInPatientName("");
    setWalkInPatientPhone("");
    setWalkInError("");
    setAppointments(clinicStore.getAppointments());
  };

  const exportCSV = () => {
    const headers = "BookingID,Patient,Phone,Doctor,Specialty,Date,Slot,Status,Payment,Amount\\n";
    const rows = filteredAppointments.map((a) =>
      \`"\${a.booking_id}","\${a.patient_name}","\${a.patient_phone}","\${a.doctor_name}","\${a.doctor_specialty}","\${a.appointment_date}","\${a.time_slot}","\${a.status}","\${a.payment_status}",\${a.total_amount}\`
    ).join("\\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = \`radhix_clinic_appointments_\${new Date().toISOString().split("T")[0]}.csv\`;
    link.click();
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Appointments Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Filter, reschedule, update status, and log walk-in consultations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setWalkInOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md shadow-blue-700/25 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Walk-In Patient</span>
          </button>
        </div>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Booking ID, patient name or phone..."
              className="w-full h-10 pl-10 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <select
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Doctors</option>
              {DEFAULT_DOCTORS.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-400 font-bold">Showing {filteredAppointments.length} bookings</span>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("table")}
              className={\`px-3 py-1 rounded-lg font-bold transition-colors \${
                viewMode === "table" ? "bg-white dark:bg-slate-900 text-blue-700 shadow-sm" : "text-slate-500"
              }\`}
            >
              Data Table
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={\`px-3 py-1 rounded-lg font-bold transition-colors \${
                viewMode === "calendar" ? "bg-white dark:bg-slate-900 text-blue-700 shadow-sm" : "text-slate-500"
              }\`}
            >
              Calendar Schedule
            </button>
          </div>
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === "table" ? (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Booking ID</th>
                <th className="pb-3">Patient</th>
                <th className="pb-3">Doctor</th>
                <th className="pb-3">Date & Slot</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-bold text-blue-700 dark:text-teal-400">{apt.booking_id}</td>
                  <td className="py-3">
                    <span className="font-bold text-slate-900 dark:text-white block">{apt.patient_name}</span>
                    <span className="text-[11px] text-slate-400">{apt.patient_phone}</span>
                  </td>
                  <td className="py-3">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">{apt.doctor_name}</span>
                    <span className="text-[11px] text-teal-600 font-medium">{apt.doctor_specialty}</span>
                  </td>
                  <td className="py-3">
                    <span className="font-bold text-slate-900 dark:text-white block">{apt.appointment_date}</span>
                    <span className="text-[11px] text-slate-500">{apt.time_slot}</span>
                  </td>
                  <td className="py-3">
                    <span className={\`px-2.5 py-1 rounded-full text-[10px] font-bold border \${getStatusBadgeClass(apt.payment_status)}\`}>
                      {apt.payment_status.toUpperCase()} (₹{apt.total_amount})
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={\`px-2.5 py-1 rounded-full text-[10px] font-bold border \${getStatusBadgeClass(apt.status)}\`}>
                      {apt.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-right space-x-1">
                    {apt.status !== "confirmed" && apt.status !== "completed" && (
                      <button
                        onClick={() => handleUpdate(apt.id, "confirmed")}
                        className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-[10px]"
                      >
                        Confirm
                      </button>
                    )}
                    {apt.status !== "completed" && (
                      <button
                        onClick={() => handleUpdate(apt.id, "completed", "paid")}
                        className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[10px]"
                      >
                        Done
                      </button>
                    )}
                    {apt.status !== "cancelled" && (
                      <button
                        onClick={() => handleUpdate(apt.id, "cancelled")}
                        className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold text-[10px]"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* CALENDAR VIEW */
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-blue-600" />
              <span>OPD Time Slots Matrix</span>
            </h3>
            <span className="text-xs text-slate-400">Today & Upcoming</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {filteredAppointments.slice(0, 9).map((apt) => (
              <div key={apt.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-700 dark:text-teal-400">{apt.time_slot}</span>
                  <span className={\`px-2 py-0.5 rounded-full text-[10px] font-bold border \${getStatusBadgeClass(apt.status)}\`}>
                    {apt.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{apt.patient_name}</h4>
                <p className="text-xs text-slate-500">{apt.doctor_name} ({apt.doctor_specialty})</p>
                <div className="pt-2 flex justify-between items-center text-[11px] text-slate-400 border-t border-slate-200 dark:border-slate-700">
                  <span>{apt.appointment_date}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">₹{apt.total_amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WALK-IN MODAL */}
      {walkInOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Register Walk-In Patient</h3>
              <button onClick={() => setWalkInOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {walkInError && (
              <p className="text-xs font-bold text-rose-600">{walkInError}</p>
            )}

            <form onSubmit={handleWalkInSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Select Doctor</label>
                <select
                  value={walkInDocId}
                  onChange={(e) => setWalkInDocId(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border font-medium"
                >
                  {DEFAULT_DOCTORS.map((d) => (
                    <option key={d.id} value={d.id}>{d.name} ({d.specialty} - ₹{d.consultation_fee})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Time Slot (Today)</label>
                <select
                  value={walkInSlot}
                  onChange={(e) => setWalkInSlot(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border font-medium"
                >
                  {["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "02:30 PM", "03:30 PM", "04:30 PM"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  value={walkInPatientName}
                  onChange={(e) => setWalkInPatientName(e.target.value)}
                  placeholder="e.g. Suresh Kumar"
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 mb-1">Patient Mobile Phone *</label>
                <input
                  type="tel"
                  value={walkInPatientPhone}
                  onChange={(e) => setWalkInPatientPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border font-medium"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setWalkInOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-700 text-white font-bold hover:bg-blue-800"
                >
                  Confirm Walk-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync("src/app/admin/appointments/page.tsx", appointmentsCode, "utf8");
console.log("Created src/app/admin/appointments/page.tsx successfully!");
